const i18n = require('i18n');
const path = require('path');
const config = require('../config');

// Configure internationalisation
i18n.configure({
  directory: path.join(__dirname, '..', '..', 'locales'),
  cookie: 'lang',
  fallbacks: {
    fr: 'en-GB',
    de: 'en-GB'
  },
  defaultLocale: config.default.language,
  autoReload: true,
  updateFiles: false,
  objectNotation: true
});

module.exports = i18n;
