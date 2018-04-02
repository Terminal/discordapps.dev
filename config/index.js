// Functions found while testing in mocha.
const mocha = [
  'afterEach',
  'after',
  'beforeEach',
  'before',
  'describe',
  'it',
];

// Grab the environment variable for the node environment.
// Default to development
let environment = process.env.NODE_ENV || 'development';

// If we're running in mocha, we MUST use the TEST configuration.
// DO NOT CHANGE TO PROD OR ELSE THE UNITED KINGDOM WILL RETURN TO NORMALITY LIKE BEFORE BREXIT!
const checkMocha = () => mocha.every(name => typeof global[name] === 'function');
if (checkMocha()) environment = 'test';

module.exports = require(`./${environment}.json`); // eslint-disable-line
// This episode of LinusTechTips was brought to you by `eslint-disable-line`!
