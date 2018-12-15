const { Client } = require('discord.js');
const express = require('express');
const i18n = require('../global/i18n');

const config = require('./config');


const app = express();
const client = new Client();

const prefixes = [
  '!'
]

const commands = {
  cute(msg, payload) {
    msg.reply(`**${msg.mentions.users.first() && msg.mentions.users.first().username || payload.input || msg.author.username}** is very cute`);
  },
  help(msg) {
    msg.reply('```\n' + Object.keys(commands).join(', ') + '\n```')
  }
}

const botOnline = (req, res, next) => {
  if (client.status === 0) {
    next();
  } else {
    res.json({
      ok: false,
      message: res.__('errors.botserver.offline')
    })
  }
}

client.on('ready', () => {
  console.log(`Logged in as ${client.user.tag}!`);
});

client.on('message', (msg) => {
  const payload = {};
  payload.content = msg.content.trim();
  payload.prefix = prefixes.find(prefix => payload.content.toLowerCase().startsWith(prefix)) || '';
  payload.command = '';
  payload.input = '';
  
  if (payload.prefix) {
    payload.withoutPrefix = payload.content.substring(payload.prefix.length).trim();
    payload.command = Object.keys(commands).find(command => payload.withoutPrefix.startsWith(command)) || '';
    
    if (payload.command) {
      payload.input = payload.withoutPrefix.substring(payload.command.length).trim();
    }
  }
  
  if (payload.command) {
    commands[payload.command](msg, payload);
  }
});

app
  .set('json spaces', 4)
  .use(i18n.init)
  .use('/users/online', botOnline, (req, res) => {
    res.json({
      ok: true,
      data: client.users.filter(user => user.presence.equals('online')).array().map(user => user.id)
    });
  })

client.login(config.token);
app.listen(8001);
