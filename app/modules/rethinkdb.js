const config = require('./../../config');

const r = require('rethinkdbdash')(config.rethinkdb);

module.exports = r;
