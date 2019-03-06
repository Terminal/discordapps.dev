const express = require('express');
const passport = require('../static/passport');
const config = require('../config');

const allowedCors = require('../data/cors.json');

const router = express.Router();

router
  .use('/callback', passport.authenticate('discord'), (req, res) => {
    if (req.session.return) {
      res.redirect(req.session.return);
    } else {
      res.redirect('/');
    }
  })
  .get('/site', (req, res, next) => {
    if (req.query.to) {
      try {
        const parsed = new URL(req.query.to);
        if (allowedCors.indexOf(parsed.origin) !== -1) {
          req.session.return = req.query.to || '/';
        } else {
          req.session.return = '/';
        }
      } catch (e) {
        req.session.return = '/';
      }
    } else {
      req.session.return = '/';
    }
    console.log(req.session);
    next();
  }, passport.authenticate('discord'))
  .get('/', (req, res, next) => {
    if (req.query.to) {
      try {
        const lang = res.getLocale();
        const languagePrefix = lang === config.default.language ? '' : `/${lang}`;
        const url = new URL(config.webserver.location + languagePrefix + req.session.return);
        if (url.origin === config.webserver.location) {
          req.session.return = url.pathame;
        } else {
          req.session.return = '/';
        }
      } catch (e) {
        req.session.return = '/';
      }
    } else {
      req.session.return = '/';
    }
    next();
  }, passport.authenticate('discord'))
  .get('/info', (req, res) => {
    if (req.user && req.user.id) {
      res.json(req.user);
    } else {
      res.status(404).json(null);
    }
  })
  .use('/logout', (req, res, next) => {
    req.session.destroy((err) => {
      if (err) {
        next(err);
      } else {
        res.redirect('/');
      }
    });
  });

module.exports = router;
