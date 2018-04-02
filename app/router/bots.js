const express = require('express');
const r = require('../modules/rethinkdb');

const router = express.Router();

router
  .get('/', (req, res) => {
    r.table('bots')
      .without('token')
      .run()
      .then(bots => res.json(bots));
  })
  .get('/approved', (req, res) => {
    r.table('bots')
      .without('token')
      .filter({
        approved: true,
      })
      .run()
      .then(bots => res.json(bots));
  })
  .get('/queued', (req, res) => {
    r.table('bots')
      .without('token')
      .filter({
        approved: false,
      })
      .run()
      .then(bots => res.json(bots));
  })
  .get('/id/:id', (req, res) => {
    r.table('bots')
      .get(req.params.id)
      .without('token')
      .run()
      .then((bot) => {
        if (!bot) res.status(404);
        res.json(bot);
      });
  })
  .get('/owner/:id', (req, res) => {
    r.table('bots')
      .without('token')
      .filter(bot => bot('owners').contains(owner => owner.nth(0).eq(req.params.id)))
      .run()
      .then(bots => res.json(bots));
  });

module.exports = router;
