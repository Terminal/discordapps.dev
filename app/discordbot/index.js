const Eris = require('eris');
const config = require('./../../config');
const r = require('./../modules/rethinkdb');

const bot = new Eris(config.discord.token);

bot.on('ready', () => {
  console.log('Discord Bot is now ready');
});

bot.on('guildMemberAdd', (guild, member) => {
  // Check if the event is in the relevent channel
  if (guild.id === config.bot.guild) {
    // If the user was not a bot, add the "users" role
    if (!member.bot) {
      guild.addMemberRole(member.id, config.bot.roles.users);
      // If the user is a developer, add the "developers" role
      r.table('bots')('owners')
        .concatMap(owners => owners.map(owner => owner(0)))
        .count(member.id)
        .gt(0)
        .then((developer) => {
          if (developer) guild.addMemberRole(member.id, config.bot.roles.developer);
        });
    } else {
      // Add the bots role
      guild.addMemberRole(member.id, config.bot.roles.bots);
      // If the bot is unverified, add the "unverified" role
      r.table('bots')
        .get(member.id)
        .default({
          approved: null, // If the bot doesn't exist, null is the default
        })('approved')
        .then((approved) => {
          if (approved === null) {
            // TODO: Have something to do when the bot doesn't exist in the database
          } else if (!approved) {
            guild.addMemberRole(member.id, config.bot.roles.unverified);
          }
        });
    }
  }
});

module.exports = bot;
