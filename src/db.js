/**
  This file is licenced under CC0 1.0
  https://creativecommons.org/publicdomain/zero/1.0/
  https://github.com/Terminal/discordapps.dev/tree/archive-pugjs
*/

const config = require('config');

// Create the RethinkDB Dash object
const r = require('rethinkdbdash')(config.get('rethinkdb'));

module.exports = r;
