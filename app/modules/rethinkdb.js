const config = require('config');

const r = require('rethinkdbdash')(config.get('rethinkdb'));

module.exports = r;