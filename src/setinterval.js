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

const r = require('./db');

const everyDay = () => {
	// Set a new random seed for every bot
	// Also update avatars if cdn.discordapp.com link
	r.table('bots')
		.update({
			random: r.random()
		}, {
			nonAtomic: true
		})
		.run();
};

// Every 24 hours...
setInterval(everyDay, 24 * 60 * 60 * 1000);

// Do on launch
everyDay();
