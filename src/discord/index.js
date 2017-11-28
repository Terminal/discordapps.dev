const Discord = require('eris');
const config = require('config');
const { commands } = require('./cogs');
const handler = require('./handler');
const r = require('./../db');

const client = new Discord.Client(config.get('discord').token);

client.on('ready', () => {
	console.log('Discord Bot is online');

	client.editStatus('online', {
		name: config.get('discord').game,
		type: 0
	});

	module.exports.guild = client.guilds.get(config.get('discord').guild);
	module.exports.channel = module.exports.guild.channels.get(config.get('discord').channel);
	module.exports.ready = true;
});

client.on('messageCreate', (message) => {
	if (!module.exports.ready) return;
	handler(message, () => {
		if (message.mss.command && message.mss.admin >= commands[message.mss.command].admin) {
			commands[message.mss.command].command(message);
		}
    });
});

client.on('userUpdate', (user, old) => {
	if (!module.exports.ready) return;
	if (user && old && (user.avatar !== old.avatar)) {
		r.table('bots')
			.get(user.id)
			.update({
				avatar: user.avatar
			});
	}
});

client.connect();

module.exports.client = client;
