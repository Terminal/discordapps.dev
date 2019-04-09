const r = require('../rethinkdb');
const xmlify = require('js2xmlparser');
const config = require('../config');
const languages = require('../data/displayedLanguages.json');

module.exports = (req, res) => {
  const sitemap = {
    '@': {
      xmlns: 'http://www.sitemaps.org/schemas/sitemap/0.9'
    },
    url: [
    ]
  };

  languages.forEach((lang) => {
    sitemap.url.push(
      {
        loc: `${config.webserver.react}/${lang}`,
        priority: 1
      }
    );
  });

  r.table('apps')
    .filter({
      state: 'approved'
    })
    .then((bots) => {
      languages.forEach((lang) => {
        bots.forEach((bot) => {
          sitemap.url.push({
            loc: `${config.webserver.react}/${lang}/bots/${bot.id}`,
            lastmod: (new Date(bot.edited)).toISOString().split('T')[0]
          });
        });
      });

      res.header('Content-Type', 'application/xml')
        .send(xmlify.parse('urlset', sitemap));
    });
};
