const express = require('express');
const r = require('../rethinkdb');
const checkParamsLength = require('../middleware/checkParamsLength');
const categories = require('../data/categories.json');

const router = express.Router();

router
  .get('/bots', (req, res, next) => {
    r.table('bots')
      .merge(bot => ({
        authors: r.table('users').getAll(r.args(bot('authors'))).pluck('discriminator', 'username', 'cachedAvatar', 'id').coerceTo('array')
      }))
      .without('token')
      .then((bots) => {
        res.json({
          ok: true,
          data: bots
        });
      })
      .catch((err) => {
        next(err);
      });
  })
  .get('/bots/category/:category', checkParamsLength, (req, res, next) => {
    r.table('bots')
      .filter({
        category: req.params.category
      })
      .merge(bot => ({
        authors: r.table('users').getAll(r.args(bot('authors'))).pluck('discriminator', 'username', 'cachedAvatar', 'id').coerceTo('array')
      }))
      .default([])
      .without('token')
      .then((bots) => {
        res.json({
          ok: true,
          data: bots
        });
      })
      .catch((err) => {
        next(err);
      });
  })
  .get('/bots/id/:id', checkParamsLength, (req, res, next) => {
    r.table('bots')
      .get(req.params.id)
      .merge(bot => ({
        authors: r.table('users').getAll(r.args(bot('authors'))).pluck('discriminator', 'username', 'cachedAvatar', 'id').coerceTo('array')
      }))
      .merge(bot => ({
        reviews: r.table('reviews')
          .filter({
            bot: bot('id')
          })
          .merge(reviewer => r.table('users').get(reviewer('author')).pluck('discriminator', 'username', 'cachedAvatar'))
          .merge(reviewer => ({
            isCurrentUserOwner: req.user ? r.eq(reviewer('author'), req.user.id) : false
          }))
          .default([])
          .without('bot')
          .without('author')
          .coerceTo('array')
      }))
      .default({})
      .without('token')
      .then((bot) => {
        if (!bot.id) res.status(404);
        res.json({
          ok: !!bot.id,
          data: bot
        });
      })
      .catch((err) => {
        next(err);
      });
  })
  .get('/categories', (req, res) => {
    res.json({
      ok: true,
      data: categories
    });
  })
  .use((req, res) => {
    res.status(404).json({
      ok: false,
      message: res.__('errors.api.404')
    });
  })
  .use((err, req, res, next) => { // eslint-disable-line
    if (err) {
      res.status(500).json({
        ok: false,
        message: res.__('errors.api.500'),
        data: err.stack
      });
    } else {
      res.status(500).json({
        ok: false,
        message: res.__('errors.api.500')
      });
    }
  });

module.exports = router;
