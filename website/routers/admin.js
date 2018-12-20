const express = require('express');
const { isAdmin } = require('../static/middleware');
const r = require('../rethinkdb');
const crypto = require('crypto');

const router = express.Router();

router
  .use(isAdmin)
  .get('/', (req, res) => {
    res.render('admin');
  })
  .post('/tokens', (req, res, next) => {
    r.table('bots')
      .then(bots => bots.map((bot) => {
        const returned = {};
        returned.id = bot.id;
        returned.token = crypto.randomBytes(20).toString('hex');
        return returned;
      }))
      .then(bots =>
        r.table('bots')
          .insert(bots, {
            conflict: 'update'
          })
      )
      .then(() => res.redirect('/admin'))
      .catch((err) => {
        next(err);
      });
  });

module.exports = router;
