const express = require('express');
const { isLoggedIn } = require('../static/middleware');
const botSchema = require('../schemas/bots');
const joi = require('joi');
const { unflatten } = require('flat');

const router = express.Router();

router
  .get('/add', isLoggedIn, (req, res) => {
    res.render('add', {
      layout: 'docs',
    });
  })
  .post('/add', isLoggedIn, (req, res, next) => {
    // Turn the checkbox into a boolean
    req.body['bot.trigger.customisable'] = req.body['bot.trigger.customisable'] === 'on';
    const body = unflatten(req.body);
    console.log(body);
    joi.validate(body.bot, botSchema, (err, value) => {
      if (err) {
        next(err);
      } else {
        res.json({
          value,
        });
      }
    });
  });

module.exports = router;
