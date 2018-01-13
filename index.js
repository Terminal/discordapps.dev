const config = require('config');
const { exec } = require('child_process');

const defaultConfig = config.get('rethinkdb');
const rConfig = { servers: defaultConfig.servers };
const r = require('rethinkdbdash')(rConfig);

// Print out version
exec('git rev-parse --short HEAD', (error, stdout, stderr) => {
	const version = stderr || error ? 'Unknown' : stdout;
	console.log(`Version ${version}`);
});

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

console.log(require('./banner.js'));

require('./src/index');
