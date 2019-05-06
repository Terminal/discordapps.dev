import rethinkdb from 'rethinkdbdash';
import databaseConfig from '../../../configuration/server/databaseConfig';
import autoInitTables from '../../data/autoinitTables';

let r = null;

if (databaseConfig.enabled) {
  r = rethinkdb(databaseConfig);
}

const checkDatabase = () => r.dbList()
  .then((dbList) => {
    // If the list of databases does not include the one Forklift uses
    if (!dbList.includes(databaseConfig.db)) {
      // Create the database and return a promise
      return r.dbCreate(databaseConfig.db);
    }

    // Accept if there is no database to create
    return Promise.resolve();
  })
  .then(() => r.tableList())
  .then((tableList) => {
    // Collect a list of promises which promise the table has been created
    const promises = [];

    // For each table that should exist
    for (let i = 0; i < autoInitTables.length; i += 1) {
      // If the list of tables does not include the one Forklift uses
      if (!tableList.includes(autoInitTables[i])) {
        // Create the table and add the promise
        promises.push(r.tableCreate(autoInitTables[i]));
      }
    }

    // Accepts if there are no tables to create.
    // Otherwise, waits for tables to create
    return Promise.all(promises);
  });

checkDatabase()
  .then(() => {
    console.log('Database tables created!');
  })

export default r;
