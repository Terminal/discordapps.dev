const config = require('../config');
const r = require('rethinkdbdash')(config.rethinkdb);

const checkTables = async () => {
  ['users', 'bots', 'images'].map(async (table) => {
    if (!await r.tableList().contains(table)) {
      await r.tableCreate(table);
    }
  });
};

checkTables();

module.exports = r;
