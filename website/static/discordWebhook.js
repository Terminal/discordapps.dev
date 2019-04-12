const fetch = require('node-fetch');
const config = require('../config');

module.exports = (data) => {
  let payload = {};
  if (typeof data === 'string') {
    payload.content = data;
  } else if (typeof data === 'object') {
    payload = data;
  }

  fetch(config.discord.webhook, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(payload)
  })
    .catch((err) => {
      console.log(err);
    });
};
