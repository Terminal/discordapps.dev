const r = require('../rethinkdb');

module.exports = () => {
  r.table('apps')
    .then(apps => apps.map((bot) => {
      const returned = {};
      returned.id = bot.id;
      returned.random = Math.random();
      return returned;
    }))
    .then(apps => r.table('apps')
      .insert(apps, {
        conflict: 'update'
      }))
    .catch((err) => {
      console.log(err);
    });
};
