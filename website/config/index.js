const development = require('./development.json');
const production = require('./production.json');

if (process.env.NODE_ENV === 'development') {
  module.exports = Object.assign(development, production);
} else {
	module.exports = Object.assign(production, development);
}
