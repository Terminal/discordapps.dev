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

const config = require('config');
const { exec } = require('child_process');
const r = require('rethinkdbdash')({
	servers: config.get('rethinkdb.servers')
});

const { tables } = require('./src/data/rethinkdb.json');

// Print out version
exec('git rev-parse --short HEAD', (error, stdout, stderr) => {
	const version = stderr || error ? 'Unknown' : stdout;
	console.log(`Version ${version}`);
});

const verifyDb = async () => {
	// Check if the 'terminal' database exists
	const shouldConfigure = !(await r.dbList().contains('terminal'));

	// If not, create the database and add relevant tables
	if (shouldConfigure) {
		// Create the database
		await r.dbCreate(config.get('rethinkdb.db'));

		// Asynchronously create individual tables
		const promises = tables.map(table =>
			r.db(config.get('rethinkdb.db')).tableCreate(table).run()
		);

		// Wait until all promises return
		await Promise.all(promises);
	}

	// Drain and release
	r.getPoolMaster().drain();
};

verifyDb();

console.log(require('./banner.js'));

require('./src/index');
