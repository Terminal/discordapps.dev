const r = require('../rethinkdb');
const config = require('../config');
const ImageCache = require('../class/ImageCache');

const selectableLanguages = Object.keys(config.languages);

const localise = (item, req) => {
  if (item.contents[req.getLocale()]) {
    item.contents = item.contents[req.getLocale()];
    return item;
  }
  const availableLanguages = Object.keys(config.languages).sort((a, b) => {
    if (a.priority < b.priority) {
      return -1;
    } else if (a.priority > b.priority) {
      return 1;
    }
    return 0;
  });

  for (let i = 0; i < availableLanguages.length; i += 1) {
    // Try all languages in priority order.
    if (item.contents[availableLanguages[i]]) {
      item.contents = item.contents[availableLanguages[i]];
      item.pageDisplayedLanguage = availableLanguages[i];
      return item;
    }
  }

  throw new Error('Cannot find any languages for this bot!');
};

const operators = /[|\\{}()[\]^$+*?.]/g;
const sanitise = string => `(?i)${string.trim().toLowerCase().replace(operators, '\\$&')}`;

const listMiddleware = options => (req, res, next) => {
  let filter = options.filter || {};
  const query = req.query.q;
  let title = null;
  let avatar = null;

  const checkDatabase = () => {
    const limit = parseInt(req.query.limit, 10) > 0 ? parseInt(req.query.limit, 10) : 12;
    const page = parseInt(req.query.page, 10) >= 0 ? parseInt(req.query.page, 10) : 0;

    const pageString = res.__('pagination.currentPage', {
      number: page + 1
    });

    if (title) {
      title += ` - ${pageString}`;
    } else {
      title = pageString;
    }

    r.table('bots')
      .merge(bot => r.branch(bot('contents').hasFields(res.getLocale()), {
        random: bot('random').add(10)
      }, {}))
      .orderBy(r.desc('random'))
      .filter(filter || {})
      .skip(limit * page)
      .limit(limit + 1) // 1 more for checking next page
      .then((list) => {
        res.render('list', {
          list: list.map(item => localise(item, req)),
          page,
          limit,
          previous: page - 1,
          next: page + 1,
          title,
          avatar,
          query
        });
      })
      .catch((err) => {
        next(err);
      });
  };

  if (options.filter === 'owner') {
    r.table('users')
      .get(req.params.id)
      .then((user) => {
        if (user) {
          filter = bot => bot('authors').contains(req.params.id);
          title = res.__('pages.bots.ownerFilter', {
            name: `${user.username}#${user.discriminator}`
          });
          const cache = new ImageCache(`https://cdn.discordapp.com/avatars/${user.id}/${user.avatar}.png`);
          // Don't cache the image. Image should already be cached on login
          cache.getRecord()
            .then((record) => {
              if (record) {
                avatar = cache.permalink;
              }
              checkDatabase();
            })
            .catch((err) => {
              next(err);
            });
        } else {
          next();
        }
      });
  } else if (options.filter === 'category') {
    if (config.categories.includes(req.params.category)) {
      filter = {
        category: req.params.category
      };
      title = res.__(`categories.${req.params.category}`);
      checkDatabase();
    } else {
      next();
    }
  } else if (options.filter === 'search') {
    if (query) {
      filter = (bot) => {
        let chain = r.expr(sanitise(query)).match(bot('category'))
          .or(bot('nsfw').and(r.expr(sanitise(query)).match('nsfw')));

        for (let i = 0; i < selectableLanguages.length; i += 1) {
          chain = chain.or(bot('contents')(selectableLanguages[i])('page').default('').match(sanitise(query)))
            .or(bot('contents')(selectableLanguages[i])('name').default('').match(sanitise(query)))
            .or(bot('contents')(selectableLanguages[i])('description').default('').match(sanitise(query)));
        }

        return chain;
      };

      checkDatabase();
    } else {
      res.redirect('/');
    }
  } else {
    checkDatabase();
  }
};

module.exports = {
  listMiddleware,
  localise
};
