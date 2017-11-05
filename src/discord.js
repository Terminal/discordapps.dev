//	const config = require('config');
const r = require('./db');
const marked = require('marked');

marked.setOptions({
	sanitize: true
});

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

const owns = async (req, res, next) => {
	const result = await r.table('bots')
		.get(req.params.id || req.body.id)
		.run();

	if (!result) {
		res.status(404).render('error', { status: 404, message: 'Bot not found' });
	} else if (req.user.id === result.owner || req.user.admin) {
		res.locals.bot = result;
		next();
	} else {
		res.status(400).render('error', { status: 400, message: 'You are not allowed to edit other\'s bots' });
	}
};

module.exports.list = list;
module.exports.owns = owns;
