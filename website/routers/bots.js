const express = require('express');
const { isLoggedIn } = require('../static/middleware');
const { joi, schema } = require('../schemas/bots');
const { unflatten } = require('flat');
const multer = require('multer');
const r = require('../rethinkdb');
const config = require('../config');
const marked = require('marked');
const xss = require('../static/xss');
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
  if (item.contents[req.getLocale()]) {
    item.contents = item.contents[req.getLocale()];
    return item;
  }
  const availableLanguages = Object.keys(config.languages).sort((a, b) => {
    if (a.priority < b.priority) {
      return -1;
    } else if (a.priority > b.priority) {
      return 1;
    }
    return 0;
  });

  for (let i = 0; i < availableLanguages.length; i += 1) {
    // Try all languages in priority order.
    if (item.contents[availableLanguages[i]]) {
      item.contents = item.contents[availableLanguages[i]];
      item.pageDisplayedLanguage = availableLanguages[i];
      return item;
    }
  }

  throw new Error('Cannot find any languages for this bot!');
};

const listRouter = (filter = {}) => (req, res, next) => {
  if (filter === 'owner') {
    filter = bot => bot('authors').contains(req.params.id);
  }

  r.table('bots')
    .filter(filter)
    .then((list) => {
      res.render('list', {
        list: list.map(item => localise(item, req))
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

          const contents = xss(marked(bot.contents.page));
          res.render('bot', {
            item: bot,
            contents,
            canEdit: req.user ? item.authors.includes(req.user.id) || req.user.admin : false,
            cover: item.cachedImages ? item.cachedImages.cover : null
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
          const imagePromises = [];
          value.cachedImages = {
            avatar: null,
            cover: null,
            preview: [],
          };

          if (value.images && typeof value.images.avatar === 'string') {
            const cache = new ImageCache(value.images.avatar, 512, 512, value.nsfw);
            imagePromises.push(cache.cache());
            value.cachedImages.avatar = cache.permalink;
          }

          if (value.images && typeof value.images.cover === 'string') {
            const cache = new ImageCache(value.images.cover, 1280, 720, value.nsfw);
            imagePromises.push(cache.cache());
            value.cachedImages.cover = cache.permalink;
          }

          if (value.images && Array.isArray(value.images.preview)) {
            for (let i = 0; i < value.images.preview.length; i += 1) {
              if (typeof value.images.preview[i] === 'string') {
                const cache = new ImageCache(value.images.preview[i], 1280, 720, value.nsfw);
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
                  res.json({
                    ok: true,
                    message: res.__(message),
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
              if (existingBot.authors.includes(req.user.id) || req.user.admin) {
                value.verified = existingBot.verified;
                value.legacy = existingBot.legacy;
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
              value.random = Math.random();
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
