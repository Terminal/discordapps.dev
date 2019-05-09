const xmlify = require('js2xmlparser');
const fetch = require('node-fetch');
const r = require('../rethinkdb');
const config = require('../config');
const languages = require('../data/displayedLanguages.json');

module.exports = (req, res) => {
  const sitemap = {
    '@': {
      xmlns: 'http://www.sitemaps.org/schemas/sitemap/0.9',
      'xmlns:xhtml': 'http://www.w3.org/1999/xhtml'
    },
    url: []
  };

  const indexURL = {
    loc: `${config.webserver.react}/en-GB`,
    priority: 1,
    'xhtml:link': [],
  };

  languages.forEach((lang) => {
    indexURL['xhtml:link'].push({
      '@': {
        rel: 'alternate',
        hreflang: lang,
        href: `${config.webserver.react}/${lang}`
      }
    });
  });

  sitemap.url.push(indexURL);

  Promise.all([
    r.table('apps').filter({ state: 'approved' }),
    fetch('https://docs.discordapps.dev/all.json').then(result => result.json())
  ])
    .then(([apps, docs]) => {
      apps.forEach((app) => {
        const thisURL = {
          loc: `${config.webserver.react}/en-GB/${app.type}/${app.id}`,
          lastmod: (new Date(app.edited)).toISOString().split('T')[0],
          'xhtml:link': []
        };

        languages
          .forEach((lang) => {
            thisURL['xhtml:link'].push({
              '@': {
                rel: 'alternate',
                hreflang: lang,
                href: `${config.webserver.react}/${lang}/${app.type}/${app.id}`
              }
            });
          });

        sitemap.url.push(thisURL);
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
