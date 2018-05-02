const Eris = require('eris');
const config = require('./../../config');

const bot = new Eris(config.discord.token);

bot.on('ready', () => {
  console.log('Discord Bot is now ready');
});

module.exports = bot;
