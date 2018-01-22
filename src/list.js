const express = require('express');
const csrfM = require('./csrf');
const r = require('./db');

const router = express.Router();

const GetRating = (positiveVotes, negativeVotes) => {
	const totalVotes = positiveVotes + negativeVotes;

	if (totalVotes === 0) return 0;

	const average = positiveVotes / totalVotes;
	const score = average - ((average - 0.5) * (2 ** -Math.log2(totalVotes + 1)));

	return score * 100;
};

const list = async (req, res) => {
	// Obtain the list of bots
	let bots = await r.table('bots')
		.without('token')
		.merge(bot => ({
			ownerinfo: bot('owners')
				.default([])
				.append(bot('owner'))
				.map(id => r.table('users').get(id))
				.default({ username: 'Unknown', discriminator: '0000' }),
			owners: bot('owners').default([]),
			votes: r.db('terminal').table('votes')
				.filter({
					botid: bot('id')
				})
				.map(vote => vote('vote'))
				.coerceTo('array')
		}))
		.merge(bot => ({
			// Count upvotes and downvotes
			upvotes: bot('votes').filter(number => number.eq(1)).count(),
			downvotes: bot('votes').filter(number => number.eq(-1)).count()
		}));
	// If we're looking at approved/queued bots, filter it out
	if (typeof res.locals.approve === 'boolean') {
		bots = bots.filter(bot => bot.approved === res.locals.approve);
	}

	// Add an "editable" flag to show level of ownership
	// This is used on the page to display buttons like `edit` or `token`
	bots = bots.map((bot) => {
		bot.rating = GetRating(bot.upvotes, bot.downvotes);
		if (req.user && req.user.admin) {
			bot.editable = 3;
		} else if (req.user && req.user.id === bot.owner) {
			bot.editable = 2;
		} else if (req.user && bot.owners.includes(req.user.id)) {
			bot.editable = 1;
		} else {
			bot.editable = 0;
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
		bots = bots.filter(bot => (req.user && req.user.id === bot.owner) || bot.owners.includes(res.locals.owner));
	}

	console.dir(bots);

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
