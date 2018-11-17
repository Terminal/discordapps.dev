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

const listMiddleware = (filter = {}) => (req, res, next) => {
  if (filter === 'owner') {
    filter = bot => bot('authors').contains(req.params.id);
  }

  r.table('bots')
    .orderBy(r.desc('random'))
    .filter(filter)
    .then((list) => {
      res.render('list', {
        list: list.map(item => localise(item, req))
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
