const folder = require('./option.json');
const yaml = require('js-yaml');
const path = require('path');
const fs = require('fs');

const config = {};

if (fs.existsSync(path.join(__dirname, folder))) {
	// Get files within a folder
	const items = fs.readdirSync(path.join(__dirname, folder));

	// For each item...
	items.forEach((item) => {
		// Remove the .json extension
		const name = item.replace(/\.yaml/, '');

		// Read the JSON file, and append to module.exports
		const data = fs.readFileSync(path.join(__dirname, folder, item), 'UTF-8');

		// Append to the config
		try {
			config[name] = yaml.load(data);
		} catch (e) {
			throw new Error(e);
		}
	});

	// Export the configuration file
	module.exports = config;
} else {
	throw new Error(`"${folder}" was not found inside the configuration folder.`);
}
