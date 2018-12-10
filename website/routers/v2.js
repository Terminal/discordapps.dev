const express = require('express');
const r = require('../rethinkdb');
const config = require('../config');

const router = express.Router();

router
  .get('/bots', (req, res, next) => {
    r.table('bots')
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
  .get('/bots/:id', (req, res, next) => {
    r.table('bots')
      .get(req.params.id)
      .merge(bot => ({
        reviews: r.table('reviews')
          .filter({
            bot: bot('id')
          })
          .default([])
          .without('id')
          .coerceTo('array')
      }))
      .default({})
      .without('token')
      .then((bot) => {
        if (!bot.id) res.status(404);
        res.json({
          ok: !bot.id,
          data: bot
        });
      })
      .catch((err) => {
        next(err);
      });
  })
  // .get('/bots/:id/embed', (req, res, next) => {
  //   r.table('bots')
  //     .get(req.params.id)
  //     .default({})
  //     .without('token')
  //     .then((bot) => {
  //       if (!bot.id) {
  //         res.json({
  //           ok: false,
  //           message: res.__('errors.api.no_bot')
  //         });
  //       } else {
  //         res.json({
  //           ok: true
  //         });
  //       }
  //     })
  //     .catch((err) => {
  //       next(err);
  //     });
  // })
  .get('/oops', (req, res, next) => {
    next(new Error(res.__('errors.api.test')));
  })
  .use('/', (req, res) => {
    res.redirect(config.links.docs);
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
