const express = require('express');
const r = require('../rethinkdb');
const config = require('../config');

const router = express.Router();

router
  .get('/bots', (req, res, next) => {
    r.table('bots')
      .without('token')
      .then((bots) => {
        res.json(bots);
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
      .default(null)
      .without('token')
      .then((bot) => {
        if (!bot.id) res.status(404);
        res.json(bot);
      })
      .catch((err) => {
        next(err);
      });
  })
  .use('/', (req, res) => {
    res.redirect(config.links.docs);
  })
  .use((req, res) => {
    res.status(404).json({
      ok: false,
      err: 'Endpoint not found'
    });
  })
  .use((err, req, res, next) => { // eslint-disable-line
    if (err) {
      res.status(500).json({
        ok: false,
        err: err.message
      });
    } else {
      res.status(500).json({
        ok: false,
        err: 'Internal server error'
      });
    }
  });

module.exports = router;
