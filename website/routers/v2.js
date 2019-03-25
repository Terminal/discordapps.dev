const express = require('express');
const r = require('../rethinkdb');
const config = require('../config');
const checkParamsLength = require('../middleware/checkParamsLength');
const categories = require('../data/categories.json');

const joi = require('../schemas/joi');
const botSchema = require('../schemas/bots');

const { unflatten } = require('flat');

const router = express.Router();

const checkToken = (req, res, next) => {
  r.table('bots')
    .get(req.params.id)
    .default({})
    .then((bot) => {
      if (!bot.id) {
        res.status(404)
          .json({
            ok: false
          });
      } else if (bot.token !== req.get('Authorization')) {
        res.status(400)
          .json({
            ok: false,
            message: 'errors.api.400'
          });
      } else {
        req.bot = bot;
        next();
      }
    });
};

router
  .get('/bots', (req, res, next) => {
    r.table('bots')
      .merge(bot => r.branch(bot('contents').contains(contents =>
        contents('locale').eq(res.locals.languagePrefix)
      ), {
        random: bot('random').add(10)
      }, {}))
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
  .get('/bots/:id', checkParamsLength, (req, res, next) => {
    r.table('bots')
      .get(req.params.id)
      .merge(bot => r.branch(bot('contents').contains(contents =>
        contents('locale').eq(res.locals.languagePrefix)
      ), {
        random: bot('random').add(10)
      }, {}))
      .merge(bot => ({
        reviews: r.table('reviews')
          .filter({
            bot: bot('id')
          })
          .default([])
          .without('id')
          .without('author')
          .without('bot')
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
  .post('/bots/:id', checkParamsLength, checkToken, (req, res, next) => {
    const body = unflatten(req.body);
    // Does not work for nested items
    const bot = Object.assign(req.bot, body.bot);
    delete bot.cachedImages;
    delete bot.created;
    delete bot.edited;
    delete bot.hide;
    delete bot.legacy;
    delete bot.random;
    delete bot.token;
    delete bot.state;
    joi.validate(bot, botSchema.options({
      presence: 'optional'
    }), {
      abortEarly: true
    }, (err, value) => {
      if (err) {
        res.json({
          ok: false,
          languages: err.message
        });
      } else if (value.id !== req.params.id) {
        res.json({
          ok: false,
          data: value,
          languages: 'errors.api.idchange'
        });
      } else {
        // Update the value in the database
        r.table('bots')
          .update(value)
          .then(() => {
            // Return the updated value
            res.json({
              ok: true,
              data: value
            });
          })
          .catch((err1) => {
            next(err1);
          });
      }
    });
  })
  .get('/categories', (req, res) => {
    res.json({
      ok: true,
      data: categories
    });
  })
  .get('/oops', (req, res, next) => {
    next(new Error('errors.api.test'));
  })
  .use('/', (req, res) => {
    res.redirect(config.links.docs);
  })
  .use((req, res) => {
    res.status(404).json({
      ok: false,
      message: 'errors.api.404'
    });
  })
  .use((err, req, res, next) => { // eslint-disable-line
    if (err) {
      res.status(500).json({
        ok: false,
        message: 'errors.api.500',
        data: err.stack
      });
    } else {
      res.status(500).json({
        ok: false,
        message: 'errors.api.500'
      });
    }
  });

module.exports = router;
