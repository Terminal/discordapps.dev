const config = require('./../config');
const assert = require('assert');

describe('Config', () => {
  it('should be the development configuration', () => {
    assert.strictEqual(config.config, 'development');
  });
});
