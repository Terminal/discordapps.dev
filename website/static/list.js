const r = require('../rethinkdb');
const config = require('../config');

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

const listMiddleware = options => (req, res, next) => {
  let filter = {};
  let title = null;

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
          title
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
          checkDatabase();
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
  } else {
    checkDatabase();
  }
};

module.exports = {
  listMiddleware,
  localise
};
