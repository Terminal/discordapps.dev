const express = require('express');
const r = require('../modules/rethinkdb');

const router = express.Router();

router
  .get('/', (req, res) => {
    r.table('bots')
      .without('token')
      .run()
      .then(bots => res.json({
        ok: true,
        bots,
      }));
  })
  .get('/approved', (req, res) => {
    r.table('bots')
      .without('token')
      .filter({
        approved: true,
      })
      .run()
      .then(bots => res.json({
        ok: true,
        bots,
      }));
  })
  .get('/queued', (req, res) => {
    r.table('bots')
      .without('token')
      .filter({
        approved: false,
      })
      .run()
      .then(bots => res.json({
        ok: true,
        bots,
      }));
  })
  .get('/id/:id', (req, res) => {
    r.table('bots')
      .get(req.params.id)
      .without('token')
      .default(null)
      .run()
      .then((bot) => {
        if (!bot) {
          res.status(404).json({
            ok: false,
            bot: {},
            message: 'This bot does not exist',
          });
        } else {
          res.json({
            ok: true,
            bot,
          });
        }
      });
  })
  .get('/owner/:id', (req, res) => {
    r.table('bots')
      .without('token')
      .filter(bot => bot('owners').contains(owner => owner.nth(0).eq(req.params.id)))
      .run()
      .then(bots => res.json({
        ok: true,
        bots,
      }));
  });

module.exports = router;
