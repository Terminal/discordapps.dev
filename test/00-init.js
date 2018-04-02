/* eslint-env mocha */

const config = require('./../config');
const assert = require('assert');
const rethinkdb = require('../app/modules/rethinkdb');

describe('Test Initialisation', () => {
  it('should be the test configuration', () => {
    assert.strictEqual(config.config, 'test');
  });
  it('should clean the bots table', (done) => {
    rethinkdb.table('bots').delete().then(() => done());
  });
});
