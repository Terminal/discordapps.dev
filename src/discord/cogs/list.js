/**
	ls.terminal.ink Discord Bot List Server
	Copyright (C) 2018 Moustacheminer Server Services
	Copyright (C) 2018 Terminal.ink

    This program is free software: you can redistribute it and/or modify
    it under the terms of the GNU General Public License as published by
    the Free Software Foundation, either version 3 of the License, or
    (at your option) any later version.

    This program is distributed in the hope that it will be useful,
    but WITHOUT ANY WARRANTY; without even the implied warranty of
    MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
    GNU General Public License for more details.

    You should have received a copy of the GNU General Public License
	along with this program.  If not, see <http://www.gnu.org/licenses/>.
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
