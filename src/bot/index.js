const Discord = require('eris');
const config = require('config');
const r = require('./../db');

const client = new Discord.Client(config.get('discord').token);

client.on('ready', () => {
	console.log('Discord Bot is online');

	client.editStatus('online', {
		name: 'ls.terminal.ink',
		type: 0
	});

	module.exports.guild = client.guilds.get(config.get('discord').guild);
	module.exports.channel = module.exports.guild.channels.get(config.get('discord').channel);
});

client.on('guildMemberAdd', (guild, member) => {
	if (module.exports.guild.id === guild.id) {
		if (member.bot) {
			// Check if the owner is in the server
			r.table('bots')
				.without('token')
				.get(member.id)
				.run(r.conn, (err, res) => {
					if (res) {
						const owner = module.exports.guild.members.get(res.owner);
						if (owner) {
							owner.addRole(config.get('discord').dev);
						}

						if (res.approved) {
							member.addRole(config.get('discord').bot);
						}
					}
				});
		} else {
			// Check if the member owns any approved bots
			r.table('bots')
				.without('token')
				.filter({
					owner: member.id
				})
				.run(r.conn, (err, cursor) => {
					cursor.toArray().then((res) => {
						if (res.some(bot => bot.approved)) {
							member.addRole(config.get('discord').dev);
						}
					});
				});
		}
	}
});

client.connect();

module.exports.client = client;
