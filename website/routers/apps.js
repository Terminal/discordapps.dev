const express = require('express');
const { isOwnerOfBot, isLoggedIn, isLoggedInButJSON } = require('../static/middleware');
const botSchema = require('../schemas/bots');
const rpcSchema = require('../schemas/rpc');

const reviewsRouter = require('./reviews');

const joi = require('../schemas/joi');
const { unflatten } = require('flat');
const multer = require('multer');
const r = require('../rethinkdb');
const config = require('../config');
const ImageCache = require('../class/ImageCache');
const crypto = require('crypto');
const discordWebhooks = require('../static/discordWebhook');
const checkParamsLength = require('../middleware/checkParamsLength');
const fetch = require('node-fetch');
const { fixRoles } = require('../static/bot');

const router = express.Router();
const reader = multer();

const botserverError = () => console.log('Failed to update roles! Is webserver down?');

router
  .post('/add', isLoggedInButJSON, reader.none(), (req, res, next) => {
    const body = unflatten(req.body);
    let schema = null;

    if (body.app) {
      if (body.app.type === 'bots') {
        schema = botSchema;
      } else if (body.app.type === 'rpc') {
        schema = rpcSchema;
      }
    }

    // Default to the bot schema
    if (!schema) {
      schema = botSchema;
    }

    joi.validate(body.app || body.bot, schema, {
      abortEarly: true
    }, (err, value) => {
      if (err) {
        res.json({
          ok: false,
          language: err.message
        });
        return;
      }

      const insert = (type, message) => {
        const imagePromises = [];
        value.cachedImages = {
          avatar: null,
          cover: null,
          preview: [],
        };

        if (value.images && typeof value.images.avatar === 'string') {
          const cache = new ImageCache({
            url: value.images.avatar,
            x: 512,
            y: 512,
            blur: value.nsfw
          });
          imagePromises.push(cache.cache());
          value.cachedImages.avatar = cache.permalink;
        } else {
          value.cachedImages.avatar = '/img/logo/logo.svg';
        }

        if (value.images && typeof value.images.cover === 'string') {
          const cache = new ImageCache({
            url: value.images.cover,
            x: 1280,
            y: 720,
            blur: value.nsfw
          });
          imagePromises.push(cache.cache());
          value.cachedImages.cover = cache.permalink;
        }

        if (value.images && Array.isArray(value.images.preview)) {
          for (let i = 0; i < value.images.preview.length; i += 1) {
            if (typeof value.images.preview[i] === 'string') {
              const cache = new ImageCache({
                url: value.images.preview[i],
                x: 1280,
                y: 720,
                blur: value.nsfw
              });
              imagePromises.push(cache.cache());
              value.cachedImages.preview[i] = cache.permalink;
            }
          }
        }

        Promise.all(imagePromises)
          .then(() => {
            r.table('apps')
              .insert(value, {
                conflict: 'replace'
              })
              .then(() => {
                discordWebhooks(`${req.user.username}#${req.user.discriminator} (${req.user.id}) ${type} <@${value.id}> - ${config.webserver.react}/${res.locals.languagePrefix}/bots/${value.id}`);
                fixRoles()
                  .catch(botserverError);
                res.json({
                  ok: true,
                  language: message,
                  redirect: `/bots/${value.id}`
                });
              })
              .catch((err1) => {
                next(err1);
              });
          })
          .catch((err1) => {
            res.json({
              ok: false,
              message: err1.message
            });
          });
      };

      r.table('apps')
        .get(value.id)
        .then((existingBot) => {
          if (existingBot) {
            const useExistingData = () => {
              value.state = existingBot.state;
              value.random = existingBot.random;
              value.token = existingBot.token;
              value.created = existingBot.created || (new Date()).getTime();
              value.edited = (new Date()).getTime();
              value.hide = existingBot.hide;
            };

            if (req.user.admin) {
              useExistingData();
              insert('edited', 'errors.bots.edit_success');
            } else if (existingBot.state === 'banned') {
              res.json({
                ok: false,
                message: 'This application has been disabled',
                language: 'errors.permissions.banned'
              });
            } else if (existingBot.authors.includes(req.user.id)) {
              // Copy over some stuff while overwriting
              useExistingData();
              insert('edited', 'errors.bots.edit_success');
            } else {
              res.json({
                ok: false,
                message: 'This application already exists in the database',
                language: 'errors.bots.exists'
              });
            }
          } else {
            value.state = 'queue';
            value.random = Math.random();
            value.token = crypto.randomBytes(20).toString('hex');
            value.created = (new Date()).getTime();
            value.edited = (new Date()).getTime();
            value.hide = false;

            // If the user is adding a bot, check for if it exists
            // Also set an avatar for fun
            if (body.type === 'bots') {
              fetch(`${config.discord.api}/users/${value.id}`, {
                headers: {
                  Authorization: `Bot ${config.discord.token}`
                }
              })
                .then(result => result.json())
                .then((result) => {
                  if (result.error) {
                    res.json({
                      ok: false,
                      message: result.message
                    });
                  } else if (result.code === 10013) {
                    res.json({
                      ok: false,
                      message: 'errors.bots.notfound',
                      language: 'errors.bots.notfound'
                    });
                  } else if (result.bot) {
                    if (!value.images.avatar && result.avatar) value.images.avatar = `${config.discord.cdn}/avatars/${value.id}/${result.avatar}.png`;
                    insert('added', 'errors.bots.add_success');
                  } else {
                    res.json({
                      ok: false,
                      message: 'errors.bots.notabot',
                      language: 'errors.bots.notabot'
                    });
                  }
                });
            } else {
              insert('added', 'errors.bots.add_success');
            }
          }
        })
        .catch((err1) => {
          next(err1);
        });
    });
  }, (err, req, res, next) => {
    if (err) {
      res.status(500).json({
        ok: false,
        message: err.stack
      });
    } else {
      next();
    }
  })
  .use('/:id/reviews', checkParamsLength, reviewsRouter)
  .post('/:id/delete', checkParamsLength, isLoggedIn, isOwnerOfBot, (req, res) => {
    r.table('apps')
      .get(req.params.id)
      .delete()
      .then(() => {
        res.json({
          ok: true
        });
        discordWebhooks(`<@${req.user.id}> deleted <@${req.params.id}>`);
        fixRoles()
          .catch(botserverError);
      })
      .catch((err) => {
        res.json({
          ok: false,
          message: err.message
        });
      });
  })
  .post('/:id/token', checkParamsLength, isLoggedIn, isOwnerOfBot, (req, res) => {
    r.table('apps')
      .update({
        id: req.params.id,
        token: crypto.randomBytes(20).toString('hex')
      })
      .then(() => {
        res.json({
          ok: true
        });
      })
      .catch((err) => {
        res.json({
          ok: false,
          message: err.message
        });
      });
  })
  .post('/:id/hide', checkParamsLength, isLoggedIn, isOwnerOfBot, (req, res) => {
    r.table('apps')
      .get(req.params.id)
      .update({
        hide: r.row('hide').not()
      })
      .then(() => {
        res.json({
          ok: true
        });
      })
      .catch((err) => {
        res.json({
          ok: false,
          message: err.message
        });
      });
  });

module.exports = router;
