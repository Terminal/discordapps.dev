const r = require('../rethinkdb');
const config = require('../config/config.json');

module.exports = () => {
  if (config && !config.development) {
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
  }
};
