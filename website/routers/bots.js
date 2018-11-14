const express = require('express');
const { isLoggedIn } = require('../static/middleware');
const { joi, schema } = require('../schemas/bots');
const { unflatten } = require('flat');
const multer = require('multer');
const r = require('../rethinkdb');
const config = require('../config');
const marked = require('marked');
const cacheAndXSS = require('../static/xss');
const ImageCache = require('../class/ImageCache');

const router = express.Router();
const reader = multer();

const selectableLanguages = Object.keys(config.languages).sort((a, b) => {
  if (config.languages[a].top) {
    return -1;
  } else if (config.languages[b].top) {
    return 1;
  } else if (a < b) {
    return -1;
  } else if (a > b) {
    return 1;
  }
  return 0;
});

const localise = (item, req) => {
  item.contents = item.contents[req.getLocale()] || item.contents[config.defaultLanguage];
  return item;
};

const listRouter = (filter = {}) => (req, res, next) => {
  if (filter === 'owner') {
    filter = bot => bot('authors').contains(req.params.id);
  }

  r.table('bots')
    .filter(filter)
    .then((list) => {
      const promises = [];
      list.forEach((item) => {
        if (item.avatar) {
          const cache = new ImageCache(item.avatar, 128, 128);
          promises.push(cache.cache());
          item.avatar = cache.permalink;
        } else {
          item.avatar = '/img/logo/logo.svg';
        }
      });
      Promise.all(promises)
        .catch(() => {})
        .finally(() => {
          res.render('list', {
            list: list.map(item => localise(item, req))
          });
        });
    })
    .catch((err) => {
      next(err);
    });
};

router
  .get('/', listRouter({
    verified: true
  }))
  .get('/unverified', listRouter({
    verified: false
  }))
  .get('/by/:id', listRouter('owner'))
  .get('/:id', (req, res, next) => {
    r.table('bots')
      .get(req.params.id)
      .then((item) => {
        if (!item) {
          next();
        } else {
          const bot = localise(item, req);
          const promises = [cacheAndXSS(marked(bot.contents.page))];
          if (bot.avatar) {
            const cache = new ImageCache(bot.avatar, 128, 128);
            promises.push(cache.cache());
            bot.avatar = cache.permalink;
          } else {
            bot.avatar = '/img/logo/logo.svg';
          }
          
          Promise.all(promises)
            .then(([contents]) => {
              res.render('bot', {
                item: bot,
                contents,
                canEdit: req.user ? item.authors.includes(req.user.id) || req.user.admin : false
              });
            })
            .catch((err) => {
              next(err);
            });
        }
      })
      .catch((err) => {
        next(err);
      });
  })
  .get('/:id/edit', isLoggedIn, (req, res, next) => {
    r.table('bots')
      .get(req.params.id)
      .then((item) => {
        if (item) {
          const remainingLanguages = selectableLanguages.filter(language => !Object.keys(item.contents).includes(language));
          res.render('add', {
            selectableLanguages: remainingLanguages,
            item,
            layout: 'docs',
          });
        } else {
          next();
        }
      })
      .catch((err) => {
        next(err);
      });
  })
  .get('/:id/delete', isLoggedIn, (req, res) => {
    res.render('sure');
  })
  .post('/:id/delete', (req, res, next) => {
    r.table('bots')
      .get(req.params.id)
      .then((existingBot) => {
        if (existingBot) {
          if (existingBot.authors.includes(req.user.id) || req.user.admin) {
            r.table('bots')
              .get(req.params.id)
              .delete()
              .then(() => {
                res.redirect('/');
              })
              .catch((err) => {
                next(err);
              });
          } else {
            res.json({
              ok: false,
              message: res.__('bot_exists_error')
            });
          }
        } else {
          next();
        }
      })
      .catch((err) => {
        next(err);
      });
  })
  .get('/add', isLoggedIn, (req, res) => {
    res.render('add', {
      selectableLanguages,
      layout: 'docs',
      item: {},
    });
  })
  .post('/add', isLoggedIn, reader.none(), (req, res, next) => {
    // Turn the checkbox into a boolean
    req.body['bot.trigger.customisable'] = req.body['bot.trigger.customisable'] === 'on';
    req.body['bot.trigger.mentionable'] = req.body['bot.trigger.mentionable'] === 'on';
    req.body['bot.nsfw'] = req.body['bot.nsfw'] === 'on';
    const body = unflatten(req.body);

    joi.validate(body.bot, schema, {
      abortEarly: true
    }, (err, value) => {
      if (err) {
        res.json({
          ok: false,
          message: res.__(err.message)
        });
      } else {
        const insert = (message) => {
          r.table('bots')
            .insert(value, {
              conflict: 'update'
            })
            .then(() => {
              res.json({
                ok: true,
                message: res.__(message),
                redirect: `/bots/${value.id}`
              });
            })
            .catch((err1) => {
              next(err1);
            });
        };

        r.table('bots')
          .get(value.id)
          .then((existingBot) => {
            if (existingBot) {
              if (existingBot.authors.includes(req.user.id) || req.user.admin) {
                insert('errors.bots.edit_success');
              } else {
                res.json({
                  ok: false,
                  message: res.__('errors.bots.exists')
                });
              }
            } else {
              value.verified = false;
              value.legacy = false;
              insert('errors.bots.add_success');
            }
          })
          .catch((err1) => {
            next(err1);
          });
      }
    });
  });

module.exports = router;
