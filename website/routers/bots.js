const express = require('express');
const { isOwnerOfBot, isLoggedIn, isLoggedInButJSON } = require('../static/middleware');
const botSchema = require('../schemas/bots');

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

    joi.validate(body.bot, botSchema, {
      abortEarly: true
    }, (err, value) => {
      if (err) {
        res.json({
          ok: false,
          message: res.__(err.message),
          language: err.message
        });
      } else {
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
              r.table('bots')
                .insert(value, {
                  conflict: 'replace'
                })
                .then(() => {
                  discordWebhooks(`${req.user.username}#${req.user.discriminator} (${req.user.id}) ${type} <@${value.id}> - ${config.webserver.react}${res.locals.languagePrefix}/bots/${value.id}`);
                  fixRoles()
                    .catch(botserverError);
                  res.json({
                    ok: true,
                    message: res.__(message),
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

        r.table('bots')
          .get(value.id)
          .then((existingBot) => {
            if (existingBot) {
              const useExistingData = () => {
                value.state = existingBot.state;
                value.legacy = existingBot.legacy;
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
                  message: 'errors.permissions.banned',
                  language: 'errors.permissions.banned'
                });
              } else if (existingBot.authors.includes(req.user.id)) {
                // Copy over some stuff while overwriting
                useExistingData();
                insert('edited', 'errors.bots.edit_success');
              } else {
                res.json({
                  ok: false,
                  message: 'errors.bots.exists',
                  language: 'errors.bots.exists'
                });
              }
            } else {
              value.state = 'queue';
              value.legacy = false;
              value.random = Math.random();
              value.token = crypto.randomBytes(20).toString('hex');
              value.created = (new Date()).getTime();
              value.edited = (new Date()).getTime();
              value.hide = false;
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
            }
          })
          .catch((err1) => {
            next(err1);
          });
      }
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
    r.table('bots')
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
    r.table('bots')
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
    r.table('bots')
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
