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
