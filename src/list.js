const express = require('express');
const csrfM = require('./csrf');
const r = require('./db');

const router = express.Router();

const list = async (req, res) => {
	// Obtain the list of bots
	let bots = await r.table('bots')
		.without('token')
		.merge(info => ({
			ownerinfo: r.table('users').get(info('owner'))
		}))
		.run();

	// If we're looking at approved/queued bots, filter it out
	if (typeof res.locals.approve === 'boolean') {
		bots = bots.filter(bot => bot.approved === res.locals.approve);
	}

	// Add an "editable" flag if the user can edit the bot.
	// This is used on the page to display buttons like `edit` or `token`
	bots = bots.map((bot) => {
		if (req.user && (req.user.id === bot.owner || req.user.admin)) {
			bot.editable = true;
		}
		return bot;
	});

	// Sort by time if looking at queue, otherwise randomise the shit out of it
	if (res.locals.approve === false) {
		bots = bots.sort((a, b) => a.timestamp - b.timestamp);
	} else {
		bots = bots.sort((a, b) => a.random - b.random);
	}

	// If we're looking for owner bots only, filter it
	if (res.locals.owner) {
		bots = bots.filter(bot => bot.owner === res.locals.owner);
	}

	// Send the list of bots to the client, as well as CSRF in case an action needs it.
	res.render('list', { bots });
};

router.get('/', (req, res) => {
	// Redirect users to /
	res.redirect('/');
})
	.get('/all', csrfM.make, list) // Display all bots
	.get('/queue', csrfM.make, (req, res, next) => {
		// Display not-yet approved bots
		res.locals.approve = false;
		next();
	}, list)
	.get('/:id', csrfM.make, (req, res, next) => {
		// Display bots by the specific owner
		res.locals.owner = req.params.id;
		next();
	}, list);


module.exports.router = router;
module.exports.list = list;
