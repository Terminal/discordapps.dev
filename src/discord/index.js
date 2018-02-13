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
});

client.on('messageCreate', (message) => {
	if (!module.exports.ready) return;
	handler(message, () => {
		if (message.mss.command && message.mss.admin >= commands[message.mss.command].admin) {
			commands[message.mss.command].command(message);
		}
	});
});

client.on('userUpdate', async (user) => {
	if (user && user.bot && user.avatar) {
		const bot = await r.table('bots').get(user.id);

		if (bot && user.avatar !== bot.avatar) {
			r.table('bots')
				.get(user.id)
				.update({
					avatar: user.dynamicAvatarURL('png', 128)
				})
				.run();
		}
	}
});

client.connect();

module.exports = client;
