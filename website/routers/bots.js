const express = require('express');
const { isLoggedIn } = require('../static/middleware');
const { joi, schema } = require('../schemas/bots');
const { unflatten } = require('flat');
const multer = require('multer');
const r = require('../rethinkdb');

const router = express.Router();
const reader = multer();

router
  .get('/add', isLoggedIn, (req, res) => {
    res.render('add', {
      layout: 'docs',
    });
  })
  .post('/add', isLoggedIn, reader.none(), (req, res, next) => {
    // Turn the checkbox into a boolean
    req.body['bot.trigger.customisable'] = req.body['bot.trigger.customisable'] === 'on';
    // Empty fields are "null"
    Object.keys(req.body);

    const body = unflatten(req.body);
    console.log(body);
    joi.validate(body.bot, schema, {
      abortEarly: true
    }, (err, value) => {
      if (err) {
        res.json({
          ok: false,
          message: res.__(`pages.edit.errors.${err.message}`)
        });
      } else {
        r.table('bots')
          .getAll(value.id)
          .count()
          .then((length) => {
            if (length === 1) {
              res.json({
                ok: false,
                message: 'Bot already exists in the database'
              });
            } else {
              r.table('bots')
                .insert(value)
                .then(() => {
                  res.json({
                    ok: true,
                    message: 'Added bot to the bot list queue.'
                  });
                })
                .catch((err1) => {
                  next(err1);
                });
            }
          })
          .catch((err1) => {
            next(err1);
          });
      }
    });
  });

module.exports = router;
