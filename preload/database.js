const config = require('./../config/');

const r = require('rethinkdbdash')({
	pool: false
});

module.exports = async () => {
	// Create a connection
	const connection = await r.connect(config.rethinkdb.servers[0]);

	// Check if the 'terminal' database exists
	const shouldConfigure = !(await r.dbList().contains('terminal').run(connection));

	// If not, create the database and add relevant tables
	if (shouldConfigure) {
		// Create the database
		await r.dbCreate(config.rethinkdb.db);

		// Asynchronously create individual tables
		const promises = config.rethinkdb.tables.map(table =>
			r.db(config.rethinkdb.db).tableCreate(table).run(connection)
		);

		// Wait until all promises return
		await Promise.all(promises);
	}

	// Close the connection
	await connection.close();
};
