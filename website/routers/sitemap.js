const r = require('../rethinkdb');
const xmlify = require('js2xmlparser');
const config = require('../config');

module.exports = (req, res) => {
  const sitemap = {
    '@': {
      xmlns: 'http://www.sitemaps.org/schemas/sitemap/0.9'
    },
    url: [
      {
        loc: config.webserver.location,
        priority: 1
      },
      {
        loc: `${config.webserver.location}bots/`
      },
      {
        loc: `${config.webserver.location}locale/`
      }
    ]
  };

  for (let i = 0; i < config.categories.length; i += 1) {
    const category = config.categories[i];

    sitemap.url.push({
      loc: `${config.webserver.location}bots/category/${category}`
    });
  }

  r.table('bots')
    .then((bots) => {
      for (let i = 0; i < bots.length; i += 1) {
        const bot = bots[i];

        sitemap.url.push({
          loc: `${config.webserver.location}bots/${bot.id}`
        });
      }

      res.header('Content-Type', 'application/xml')
        .send(xmlify.parse('urlset', sitemap));
    });
};
