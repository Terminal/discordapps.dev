/**
  This file is licenced under CC0 1.0
  https://creativecommons.org/publicdomain/zero/1.0/
  https://github.com/Terminal/discordapps.dev/tree/archive-pugjs
*/

const config = require('config');
const { exec } = require('child_process');
const r = require('rethinkdbdash')({
  servers: config.get('rethinkdb.servers')
});

const { tables } = require('./src/data/rethinkdb.json');

// Print out version
exec('git rev-parse --short HEAD', (error, stdout, stderr) => {
  const version = stderr || error ? 'Unknown' : stdout;
  console.log(`Version ${version}`);
});

const verifyDb = async () => {
  // Check if the 'terminal' database exists
  const shouldConfigure = !(await r.dbList().contains('terminal'));

  // If not, create the database and add relevant tables
  if (shouldConfigure) {
    // Create the database
    await r.dbCreate(config.get('rethinkdb.db'));

    // Asynchronously create individual tables
    const promises = tables.map(table => r.db(config.get('rethinkdb.db')).tableCreate(table).run());

    // Wait until all promises return
    await Promise.all(promises);
  }

  // Drain and release
  r.getPoolMaster().drain();
};

verifyDb();

console.log(require('./banner.js'));

require('./src/index');
