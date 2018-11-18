const i18n = require('i18n');
const path = require('path');
const config = require('../config');

// Configure internationalisation
i18n.configure({
  directory: path.join(__dirname, '..', '..', 'locales'),
  cookie: 'lang',
  defaultLocale: config.defaultLanguage,
  autoReload: true,
  updateFiles: false,
  objectNotation: true,
});

module.exports = i18n;
