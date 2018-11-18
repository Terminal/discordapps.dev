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
  if (options.filter === 'owner') {
    options.filter = bot => bot('authors').contains(req.params.id);
  }

  const limit = parseInt(req.query.limit, 10) > 0 ? parseInt(req.query.limit, 10) : 12;
  const page = parseInt(req.query.page, 10) >= 0 ? parseInt(req.query.page, 10) : 0;

  r.table('bots')
    .orderBy(r.desc('random'))
    .filter(options.filter || {})
    .skip(limit * page)
    .limit(limit + 1) // 1 more for checking next page
    .then((list) => {
      res.render('list', {
        list: list.map(item => localise(item, req)),
        page,
        limit,
        previous: page - 1,
        next: page + 1,
      });
    })
    .catch((err) => {
      next(err);
    });
};

module.exports = {
  listMiddleware,
  localise
};
