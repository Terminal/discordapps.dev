const { Client } = require('discord.js');
const express = require('express');

const i18n = require('../global/i18n');
const config = require('./config');

const app = express();
const client = new Client();

const botOnline = (req, res, next) => {
  if (client.status === 0) {
    next();
  } else {
    res.json({
      ok: false,
      message: res.__('errors.botserver.offline')
    });
  }
};

client.on('ready', () => {
  console.log(`Logged in as ${client.user.tag}!`);
});

app
  .set('json spaces', 4)
  .use(i18n.init)
  .use(botOnline)
  .get('/status/:filter', (req, res) => {
    res.json({
      ok: true,
      data: client.users.filter(user => user.presence.status === req.params.filter).array().map(user => user.id)
    });
  })
  .get('/in/:id', (req, res) => {
    const guild = client.guilds.get(config.guild);
    if (guild.members.get(req.params.id)) {
      res.json({
        ok: true,
        data: true
      });
    } else {
      res.json({
        ok: true,
        data: false
      });
    }
  });

client.login(config.token);
app.listen(8001);
