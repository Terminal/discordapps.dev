const express = require('express');
const csrfM = require('./csrf');
const r = require('./db');

const router = express.Router();

const list = async (req, res) => {
	let bots = await r.table('bots')
		.without('token')
		.merge(info => ({
			ownerinfo: r.table('users').get(info('owner'))
		}))
		.run();

	if (typeof res.locals.approve === 'boolean') {
		bots = bots.filter(bot => bot.approved === res.locals.approve);
	}
	bots = bots.map((bot) => {
		if ((req.user && req.user.id) === bot.owner || (req.user && req.user.admin)) {
			bot.editable = true;
		}

		bot.random = Math.random();
		return bot;
	});

	// Sort by time if looking at queue, otherwise randomise the shit out of it
	if (res.locals.approve === false) {
		bots = bots.sort((a, b) => a.timestamp - b.timestamp);
	} else {
		bots = bots.sort((a, b) => a.random - b.random);
	}

	if (res.locals.owner) {
		bots = bots.filter(bot => bot.owner === res.locals.owner);
	}

	res.status(200).render('list', {
		bots,
		csrf: req.csrf
	});
};

router.get('/', (req, res) => {
	res.redirect('/');
})
	.get('/all', csrfM.make, list) // Display all bots
	.get('/queue', csrfM.make, (req, res, next) => {
		// Display not-yet approved bots
		res.locals.approve = false;
		next();
	}, list)
	.get('/:id', csrfM.make, (req, res, next) => {
		res.locals.owner = req.params.id;
		next();
	}, list);


module.exports.router = router;
module.exports.list = list;
