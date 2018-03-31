const config = require('./../config');
const assert = require('assert');
const rethinkdb = require('../app/modules/rethinkdb');

describe('Test Initialisation', () => {
  it('should be the development configuration', () => {
    assert.strictEqual(config.config, 'development');
  });
  it('should clean the bots table', (done) => {
    rethinkdb.table('bots').delete().then(() => done());
  });
});
