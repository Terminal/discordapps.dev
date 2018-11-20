const r = require('../rethinkdb');

module.exports = () => {
  r.table('bots')
    .then(bots => bots.map((bot) => {
      const returned = {};
      returned.id = bot.id;
      returned.random = Math.random();
      if (bot.cachedImages.cover) returned.random += 0.5;
      if (bot.github && bot.github.owner && bot.github.repo) returned.random += 1;
      return returned;
    }))
    .then(bots => r.table('bots')
      .insert(bots, {
        conflict: 'update'
      }))
    .catch((err) => {
      console.log(err);
    });
};
