const express = require('express');
const { isLoggedIn } = require('../static/middleware');
const { joi, schema } = require('../schemas/bots');
const { unflatten } = require('flat');
const multer = require('multer');
const r = require('../rethinkdb');
const config = require('../config');
const marked = require('marked');
const xss = require('xss');
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

router
  .get('/', (req, res, next) => {
    r.table('bots')
      .then((list) => {
        res.render('list', {
          list: list.map(item => localise(item, req))
        });
      })
      .catch((err) => {
        next(err);
      });
  })
  .get('/:id', (req, res, next) => {
    r.table('bots')
      .get(req.params.id)
      .then((item) => {
        if (!item) {
          next();
        } else {
          const bot = localise(item, req);
          const promises = [];

          marked.setOptions({
            sanitize: !bot.legacy
          });

          const contents = xss(marked(bot.contents.page), {
            whiteList: {
              iframe: ['src', 'class'],
              style: [],
              link: ['href', 'rel', 'type'],
              ...xss.whiteList
            },
            onTagAttr(tag, name, value) {
              if (tag === 'img' && name === 'src') {
                const cache = new ImageCache(value);
                // Marked is synchronous. This hack makes it do Marked, download, and then render.
                promises.push(cache.cache());
                return `src="/appdata/${cache.hash}.png"`;
              }
              return undefined;
            }
          });

          Promise.all(promises)
            .then(() => {
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
          message: res.__(`pages.edit.errors.${err.message}`)
        });
      } else {
        value.verified = false;
        value.legacy = false;
        const insert = () => {
          r.table('bots')
            .insert(value, {
              conflict: 'replace'
            })
            .then(() => {
              res.json({
                ok: true,
                message: 'Added bot to the bot list queue.',
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
                insert();
              } else {
                res.json({
                  ok: false,
                  message: 'Bot already exists in the database'
                });
              }
            } else {
              insert();
            }
          })
          .catch((err1) => {
            next(err1);
          });
      }
    });
  });

module.exports = router;
