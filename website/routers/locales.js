const express = require('express');
const i18n = require('../static/i18n');

const router = express.Router();

router.get('/', (req, res) => {
  // Send the list of selectable locales
  res.render('lang', {
    languages: i18n.getLocales()
  });
})
  .get('/:lang', (req, res) => {
    if (i18n.getLocales()[req.params.lang]) {
      res.cookie('lang', req.params.lang);
    }
    res.redirect('/');
  });

module.exports = router;
