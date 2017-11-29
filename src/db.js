const config = require('config');

// Create the RethinkDB Dash object
const r = require('rethinkdbdash')(config.get('rethinkdb'));

module.exports = r;
