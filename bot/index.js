const { Client } = require('discord.js');

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

client.login('');
