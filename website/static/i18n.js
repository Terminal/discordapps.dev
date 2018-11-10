const i18n = require('i18n');
const path = require('path');

// Configure internationalisation
i18n.configure({
  directory: path.join(__dirname, '..', '..', 'locales'),
  cookie: 'lang',
  defaultLocale: 'en',
  autoReload: true,
  updateFiles: false,
  objectNotation: true,
});

module.exports = i18n;
