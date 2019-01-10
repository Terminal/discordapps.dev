const express = require('express');
const i18n = require('../../global/i18n');
const config = require('../config');
const languages = require('../data/languages');
const { flatten } = require('flat');

const router = express.Router();

router.get('/', (req, res) => {
  const languageData = i18n.getLocales()
    .map(language => ({
      name: language,
      flag: languages[language].flag.split(',')
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
          const languagePrefix = req.params.lang === config.default.language ? '' : `/${req.params.lang}`;
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
  })
  .get('/dev', (req, res) => {
    const languageData = i18n.getCatalog();
    let displayedLanguages = [];
    const returnedData = {};
    const keys = {};

    if (Array.isArray(req.query.lang)) {
      displayedLanguages = req.query.lang.filter(language => Object.keys(languageData).includes(language));
    } else {
      displayedLanguages = Object.keys(languageData);
    }

    displayedLanguages.forEach((language) => {
      returnedData[language] = flatten(languageData[language]);
      Object.keys(returnedData[language]).forEach((key) => {
        keys[key] = true;
      });
    });

    res.render('langdev', {
      data: returnedData,
      keys: Object.keys(keys)
    });
  });

module.exports = router;
