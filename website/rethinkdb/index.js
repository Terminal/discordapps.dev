const rethinkdb = require('rethinkdbdash');
const config = require('../config');

const r = rethinkdb(config.rethinkdb);

module.exports = r;
