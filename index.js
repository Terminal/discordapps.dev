/**
	This is free and unencumbered software released into the public domain.

	Anyone is free to copy, modify, publish, use, compile, sell, or
	distribute this software, either in source code form or as a compiled
	binary, for any purpose, commercial or non-commercial, and by any
	means.

	In jurisdictions that recognize copyright laws, the author or authors
	of this software dedicate any and all copyright interest in the
	software to the public domain. We make this dedication for the benefit
	of the public at large and to the detriment of our heirs and
	successors. We intend this dedication to be an overt act of
	relinquishment in perpetuity of all present and future rights to this
	software under copyright law.

	THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND,
	EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
	MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT.
	IN NO EVENT SHALL THE AUTHORS BE LIABLE FOR ANY CLAIM, DAMAGES OR
	OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE,
	ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR
	OTHER DEALINGS IN THE SOFTWARE.

	For more information, please refer to <http://unlicense.org>
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
