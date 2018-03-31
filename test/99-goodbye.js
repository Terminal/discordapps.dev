const rethinkdb = require('../app/modules/rethinkdb');

describe('Test Completion', () => {
  it('should shutdown RethinkDB', (done) => {
    const pool = rethinkdb.getPoolMaster();
    pool.on('draining', () => done());
    pool.drain();
  });
});
