const r = require('./rethinkdb');
const config = require('./config');
const app = require('./express');
const autoinitTables = require('./data/autoinitTables.json');

const checkDatabase = () => r.dbList()
  .then((dbList) => {
    // If the list of databases does not include the one Forklift uses
    if (!dbList.includes(config.rethinkdb.db)) {
      // Create the database and return a promise
      return r.dbCreate(config.rethinkdb.db);
    }

    // Accept if there is no database to create
    return Promise.resolve();
  })
  .then(() => r.tableList())
  .then((tableList) => {
    // Collect a list of promises which promise the table has been created
    const promises = [];

    // For each table that should exist
    for (let i = 0; i < autoinitTables.length; i += 1) {
      // If the list of tables does not include the one Forklift uses
      if (!tableList.includes(autoinitTables[i])) {
        // Create the table and add the promise
        promises.push(r.tableCreate(autoinitTables[i]));
      }
    }

    // Accepts if there are no tables to create.
    // Otherwise, waits for tables to create
    return Promise.all(promises);
  });

checkDatabase()
  .then(() => {
    app.listen(config.webserver.port);
  });
