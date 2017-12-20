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

console.log('\x1b[0m');

console.log('  Welcome to ls.terminal.ink!');
console.log('\x1b[0m');
console.log('  \x1b[0m  \x1b[1m\x1b[32m\x1b[46m\u2588\u2588\u2588\u2588\u2588\u2588\u2593\u2593\u2593\u2593\u2593\u2593\u2592\u2592\u2592\u2592\u2592\u2592\u2591\u2591\u2591\u2591\u2591\u2591      \x1b[0m');
console.log('  \x1b[0m\x1b[1m\x1b[32m\x1b[46m\u2588\u2588\x1b[0m                              \x1b[1m\x1b[36m\x1b[44m\u2588\u2588\x1b[0m');
console.log('  \x1b[0m\x1b[1m\x1b[32m\x1b[46m\u2588\u2588\x1b[0m   ▞                          \x1b[1m\x1b[36m\x1b[44m\u2588\u2588\x1b[0m');
console.log('  \x1b[0m\x1b[1m\x1b[32m\x1b[46m\u2588\u2588\x1b[0m  ▟▙▖                         \x1b[1m\x1b[36m\x1b[44m\u2588\u2588\x1b[0m');
console.log('  \x1b[0m\x1b[1m\x1b[32m\x1b[46m\u2593\u2593\x1b[0m   ▛                          \x1b[1m\x1b[36m\x1b[44m\u2593\u2593\x1b[0m');
console.log('  \x1b[0m\x1b[1m\x1b[32m\x1b[46m\u2593\u2593\x1b[0m  ▝   \x1b[5m▀▀▀\x1b[0m                     \x1b[1m\x1b[36m\x1b[44m\u2593\u2593\x1b[0m');
console.log('  \x1b[0m\x1b[1m\x1b[32m\x1b[46m\u2593\u2593\x1b[0m                              \x1b[1m\x1b[36m\x1b[44m\u2593\u2593\x1b[0m');
console.log('  \x1b[0m\x1b[1m\x1b[32m\x1b[46m\u2592\u2592\x1b[0m                              \x1b[1m\x1b[36m\x1b[44m\u2592\u2592\x1b[0m');
console.log('  \x1b[0m\x1b[1m\x1b[32m\x1b[46m\u2592\u2592\x1b[0m                              \x1b[1m\x1b[36m\x1b[44m\u2592\u2592\x1b[0m');
console.log('  \x1b[0m\x1b[1m\x1b[32m\x1b[46m\u2592\u2592\x1b[0m                              \x1b[1m\x1b[36m\x1b[44m\u2592\u2592\x1b[0m');
console.log('  \x1b[0m\x1b[1m\x1b[32m\x1b[46m\u2591\u2591\x1b[0m                              \x1b[1m\x1b[36m\x1b[44m\u2591\u2591\x1b[0m');
console.log('  \x1b[0m\x1b[1m\x1b[32m\x1b[46m\u2591\u2591\x1b[0m                              \x1b[1m\x1b[36m\x1b[44m\u2591\u2591\x1b[0m');
console.log('  \x1b[0m\x1b[1m\x1b[32m\x1b[46m\u2591\u2591\x1b[0m                              \x1b[1m\x1b[36m\x1b[44m\u2591\u2591\x1b[0m');
console.log('  \x1b[0m\x1b[1m\x1b[32m\x1b[46m  \x1b[0m                              \x1b[1m\x1b[36m\x1b[44m  \x1b[0m');
console.log('  \x1b[0m\x1b[1m\x1b[32m\x1b[46m  \x1b[0m                              \x1b[1m\x1b[36m\x1b[44m  \x1b[0m');
console.log('  \x1b[0m\x1b[1m\x1b[32m\x1b[46m  \x1b[0m                              \x1b[1m\x1b[36m\x1b[44m  \x1b[0m');
console.log('  \x1b[0m  \x1b[1m\x1b[36m\x1b[44m\u2588\u2588\u2588\u2588\u2588\u2588\u2593\u2593\u2593\u2593\u2593\u2593\u2592\u2592\u2592\u2592\u2592\u2592\u2591\u2591\u2591\u2591\u2591\u2591      \x1b[0m');
console.log('\x1b[0m');

require('./src/index');
