/**
	This file is licenced under CC0 1.0
	https://creativecommons.org/publicdomain/zero/1.0/
	https://github.com/Terminal/discordapps.dev/tree/archive-pugjs
*/


const r = require('./../../db');
const config = require('config');

const getID = string => string.replace(/\D/g, '');

module.exports = [
	{
		aliases: [
			'botinfo',
			'get'
		],
		name: 'botinfo_get',
		uses: 1,
		admin: 0,
		command: async (message) => {
			const id = getID(message.mss.input);
			const bot = await r.table('bots').get(id);
			console.log(bot);
			console.log(JSON.stringify(id));
			if (bot) {
				message.channel.createMessage({
					content: `<@${bot.id}>`,
					embed: {
						title: bot.name,
						description: bot.shortDesc,
						url: `${config.get('webserver').location}bot/${bot.id}`,
						thumbnail: {
							url: bot.avatar
						},
						fields: [
							{
								name: message.__('botinfo_get_invite'),
								value: bot.invite
							},
							{
								name: message.__('botinfo_get_count'),
								value: bot.count
							},
							{
								name: message.__('botinfo_get_owner'),
								value: `<@${bot.owner}>`
							}
						]
					}
				});
			} else {
				message.channel.createMessage(message.__('error_bot_not_found'));
			}
		}
	}
];
