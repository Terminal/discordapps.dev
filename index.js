const config = require('config');

const defaultConfig = config.get('rethinkdb');
const rConfig = { servers: defaultConfig.servers };
const r = require('rethinkdbdash')(rConfig);

const verifyDb = async () => {
	const shouldConfigure = !(await r.dbList().contains('terminal').run());
	if (shouldConfigure) {
		await r.dbCreate(defaultConfig.db);
		['bots', 'csrf', 'users', 'session', 'i18n'].map(async (table) => {
			await r.db(defaultConfig.db).tableCreate(table).run();
		});
	}

	r.getPoolMaster().drain();
};

verifyDb();
require('./src/index');
