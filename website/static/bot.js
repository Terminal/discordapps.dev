const fetch = require('node-fetch');
const config = require('../config');

const run = location =>
  fetch(location, {
    headers: {
      Authorization: config.bot.authorization
    }
  })
    .then(data => data.json());

const addRole = id => run(`${config.bot.host}/addRole/${id}`);
const removeRole = id => run(`${config.bot.host}/removeRole/${id}`);
const fixRoles = () => run(`${config.bot.host}/fixRoles`);

module.exports = {
  addRole,
  removeRole,
  fixRoles
};
