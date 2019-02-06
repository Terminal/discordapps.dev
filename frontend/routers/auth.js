const express = require('express');
const passport = require('../static/passport');
const config = require('../config');

const router = express.Router();

router
  .use('/callback', passport.authenticate('discord'), (req, res) => {
    if (req.session.to) {
      try {
        const url = new URL(config.webserver.location + req.session.to);
        if (url.origin === config.webserver.location) {
          res.redirect(url.pathname);
        } else {
          res.redirect('/en');
        }
      } catch (e) {
        res.redirect('/en');
      }
    } else {
      res.redirect('/en');
    }
  })
  .get('/', (req, res, next) => {
    req.session.to = req.query.to || '/';
    next();
  }, passport.authenticate('discord'))
  .get('/info', (req, res) => {
    if (req.user && req.user.id) {
      res.json(req.user);
    } else {
      res.json(null);
    }
  })
  .use('/logout', (req, res, next) => {
    req.session.destroy((err) => {
      if (err) {
        next(err);
      } else {
        res.redirect('/en');
      }
    });
  });

module.exports = router;
