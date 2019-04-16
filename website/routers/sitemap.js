const xmlify = require('js2xmlparser');
const fetch = require('node-fetch');
const r = require('../rethinkdb');
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

  Promise.all([
    r.table('apps').filter({ state: 'approved' }),
    fetch('https://docs.discordapps.dev/all.json').then(result => result.json())
  ])
    .then(([apps, docs]) => {
      languages.forEach((lang) => {
        apps.forEach((app) => {
          sitemap.url.push({
            loc: `${config.webserver.react}/${lang}/${app.type}/${app.id}`,
            lastmod: (new Date(app.edited)).toISOString().split('T')[0]
          });
        });
      });

      docs.forEach((doc) => {
        sitemap.url.push({
          loc: `${config.webserver.react}/en-GB${doc.permalink}`,
          lastmod: (new Date(doc.date)).toISOString().split('T')[0]
        });
      });

      res.header('Content-Type', 'application/xml')
        .send(xmlify.parse('urlset', sitemap));
    });
};
