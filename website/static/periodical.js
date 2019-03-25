const r = require('../rethinkdb');

module.exports = () => {
  // r.table('bots')
  //   .then(bots => bots.map((bot) => {
  //     const returned = {};
  //     returned.id = bot.id;
  //     returned.random = Math.random();
  //     return returned;
  //   }))
  //   .then(bots => r.table('bots')
  //     .insert(bots, {
  //       conflict: 'update'
  //     }))
  //   .catch((err) => {
  //     console.log(err);
  //   });
};
