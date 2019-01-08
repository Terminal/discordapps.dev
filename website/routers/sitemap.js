const r = require('../rethinkdb');
const xmlify = require('js2xmlparser');
const config = require('../config');
const categories = require('../data/categories.json');
const i18n = require('../../global/i18n');

module.exports = (req, res) => {
  const sitemap = {
    '@': {
      xmlns: 'http://www.sitemaps.org/schemas/sitemap/0.9'
    },
    url: [
    ]
  };

  i18n.getLocales().forEach((lang) => {
    const prefix = lang === config.default.language ? '' : `/${lang}`;
    sitemap.url.push(
      {
        loc: `${config.webserver.location}${prefix}`,
        priority: 1
      },
      {
        loc: `${config.webserver.location}${prefix}/bots/`
      },
      {
        loc: `${config.webserver.location}${prefix}/locale/`
      }
    );

    categories.forEach((category) => {
      sitemap.url.push({
        loc: `${config.webserver.location}${prefix}/bots/category/${category}`
      });
    });
  });

  r.table('bots')('id')
    .then((ids) => {
      i18n.getLocales().forEach((lang) => {
        const prefix = lang === config.default.language ? '' : `/${lang}`;
        ids.forEach((id) => {
          sitemap.url.push({
            loc: `${config.webserver.location}${prefix}/bots/${id}`
          });
        });
      });

      res.header('Content-Type', 'application/xml')
        .send(xmlify.parse('urlset', sitemap));
    });
};
