const path = require('path');
const fs = require('fs');

if (!fs.existsSync(path.join(__dirname, '..', 'js'))) {
	console.error('[Err]\tls.terminal.ink has not been converted to TypeScript yet.');
	process.exit(1);
}
