const express = require('express');
const i18n = require('../static/i18n');
const config = require('../config');
const languages = require('../data/languages');

const router = express.Router();

router.get('/', (req, res) => {
  const languageData = i18n.getLocales()
    .map(language => ({
      name: language,
      flag: languages[language].flag
    }));

  // Send the list of selectable locales
  res.render('lang', {
    to: req.query.to || '/',
    languageData
  });
})
  .get('/:lang', (req, res, next) => {
    if (i18n.getLocales().includes(req.params.lang)) {
      res.cookie('lang', req.params.lang);
      if (req.query.to) {
        try {
          const languagePrefix = req.params.lang === 'en-GB' ? '' : `/${req.params.lang}`;
          const url = new URL(config.webserver.location + languagePrefix + req.query.to);
          if (url.origin === config.webserver.location) {
            res.redirect(url.pathname);
          } else {
            res.redirect('/');
          }
        } catch (e) {
          res.redirect('/');
        }
      } else {
        res.redirect('/');
      }
    } else {
      next();
    }
  });

module.exports = router;
