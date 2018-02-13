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

const fs = require('fs');

const commands = {};
const categories = {};

// Register valid commands from "cogs"
fs.readdir('./src/discord/cogs/', (err, items) => {
	items.forEach((item) => {
		const file = item.replace(/\.js/g, '');
		const cog = require(`./cogs/${file}`); // eslint-disable-line global-require, import/no-dynamic-require
		categories[file] = cog;
		cog.forEach((com) => {
			com.aliases.forEach((alias) => {
				if (commands[alias]) {
					throw new Error(`Alias ${alias} from ${file} was already assigned to another command!`);
				} else {
					commands[alias] = com;
				}
			});
		});
	});
});

module.exports = { commands, categories };
