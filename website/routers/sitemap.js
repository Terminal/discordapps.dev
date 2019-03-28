const r = require('../rethinkdb');
const xmlify = require('js2xmlparser');
const config = require('../config');
const languages = require('../data/languages.json');

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

  r.table('bots')
    .filter({
      state: 'approved'
    })('id')
    .then((ids) => {
      languages.forEach((lang) => {
        ids.forEach((id) => {
          sitemap.url.push({
            loc: `${config.webserver.react}/${lang}/bots/${id}`
          });
        });
      });

      res.header('Content-Type', 'application/xml')
        .send(xmlify.parse('urlset', sitemap));
    });
};
