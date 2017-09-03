const Discord = require('eris');
const config = require('config');

const client = new Discord.Client(config.get('discord').token);
let tguild = null;
let tchannel = null;

client.on('ready', () => {
	console.log('Discord Bot is online');

	client.editStatus('online', {
		name: 'ls.terminal.ink',
		type: 0
	});

	tguild = client.guilds.get(config.get('discord').guild);
	tchannel = tguild.channels.get(config.get('discord').channel);
});

client.on('guildMemberAdd', (guild, member) => {
	if (tguild.id === guild.id && member.bot) {
		member.addRole(config.get('discord').bot);
	}
});

client.connect();

module.exports.client = client;
module.exports.guild = tguild;
module.exports.channel = tchannel;
