const express = require('express');
const passport = require('../static/passport');

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
    next();
  }, passport.authenticate('discord'))
  .get('/info', (req, res) => {
    if (req.user && req.user.id) {
      res.json(req.user);
    } else {
      res.status(404).json(null);
    }
  })
  .get('/json', (req, res) => {
    if (req.user && req.user.id) {
      res.json({
        ok: true,
        data: req.user
      });
    } else {
      res.json({
        ok: true,
        data: {}
      });
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
