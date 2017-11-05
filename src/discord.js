//	const config = require('config');
const r = require('./db');
const marked = require('marked');
const request = require('request');
const config = require('config');

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

const validate = (req, res, next) => {
	if (typeof req.body.id !== 'string') {
		res.status(400).render('error', { status: 400, message: 'You provided an invalid ID' });
	} else if (typeof req.body.shortDesc !== 'string') {
		res.status(400).render('error', { status: 400, message: 'You provided an invalid short description' });
	} else if (typeof req.body.type !== 'string') {
		res.status(400).render('error', { status: 400, message: 'You provided an invalid type' });
	} else if (!config.get('terminal').description.some(type => req.body.type === type)) {
		res.status(400).render('error', { status: 400, message: 'You provided an incorrect type' });
	} else if (typeof req.body.longDesc !== 'string') {
		res.status(400).render('error', { status: 400, message: 'You provided an invalid long description' });
	} else if (typeof req.body.count !== 'string') {
		res.status(400).render('error', { status: 400, message: 'You provided an invalid guild count' });
	} else if (req.body.id.length > 70) {
		res.status(400).render('error', { status: 400, message: 'You provided a bot id that was too long (70)' });
	} else if (req.body.shortDesc.length > 200) {
		res.status(400).render('error', { status: 400, message: 'You provided a short description that was too long (200)' });
	} else if (req.body.avatar.length > 2000) {
		res.status(400).render('error', { status: 400, message: 'You provided an avatar that was too long (2000)' });
	} else if (/\D/.test(req.body.count)) {
		res.status(400).render('error', { status: 400, message: 'Your bot count had values other than digits' });
	} else if (parseInt(req.body.count, 10) < 0) {
		res.status(400).render('error', { status: 400, message: 'Your bot count was too low (0)' });
	} else if (parseInt(req.body.count, 10) > 1000000) {
		res.status(400).render('error', { status: 400, message: 'Your bot count was too high (1000000)' });
	} else if (req.body.type === 'iframe' && !/^https:\/\//.test(req.body.longDesc)) {
		res.status(400).render('error', { status: 400, message: 'Your iframe based long description must use HTTPS' });
	} else if (req.body.type === 'iframe' && req.body.longDesc > 2000) {
		res.status(400).render('error', { status: 400, message: 'You provided an iframe based long description that was too long (2000)' });
	} else if (req.body.type === 'markdown' && req.body.longDesc > 20000) {
		res.status(400).render('error', { status: 400, message: 'You provided a markdown based long description that was too long (20000)' });
	} else if (req.body.type === 'asciidoctor' && req.body.longDesc > 20000) {
		res.status(400).render('error', { status: 400, message: 'You provided an AsciiDoctor based long description that was too long (20000)' });
	} else if (req.body.type === 'html' && req.body.longDesc > 200000) {
		res.status(400).render('error', { status: 400, message: 'You provided a HTML based long description that was too long (200000)' });
	} else if (/\D/.test(req.body.id)) {
		res.status(400).render('error', { status: 400, message: 'Your bot ID had values other than digits' });
	} else {
		if (!req.body.invite) { // If there is no invite, make one up using the ID.
			req.body.invite = `https://discordapp.com/oauth2/authorize?client_id=${req.body.id}&scope=bot&permissions=0`;
		}

		if (typeof req.body.invite !== 'string') {
			res.status(400).render('error', { status: 400, message: 'You provided an invalid invite' });
		} else if (req.body.invite.length > 2000) {
			res.status(400).render('error', { status: 400, message: 'You provided an invite that was too long (2000)' });
		} else if (!/^https?:\/\//.test(req.body.invite)) {
			res.status(400).render('error', { status: 400, message: 'Your invite must use HTTP or HTTPS' });
		} else {
			request({
				uri: `https://discordapp.com/api/v6/users/${req.body.id}`,
				method: 'GET',
				headers: {
					'User-Agent': config.get('useragent'),
					Authorization: `Bot ${config.get('discord').token}`
				},
				json: true
			}, (err, response, body) => {
				if (!req.body.avatar && body.avatar) {
					req.body.avatar = `https://cdn.discordapp.com/avatars/${body.id}/${body.avatar}`;
				}

				if (!req.body.name) {
					req.body.name = body.username;
				}

				if (response.statusCode === 404) {
					res.status(404).render('error', { status: 404, message: 'Discord could not find your bot.' });
				} else if (body.code) {
					res.status(500).render('error', { status: 500, message: `Discord returned error ${response.statusCode}: ${body.code} - ${body.message}` });
				} else if (!body.bot) {
					res.status(400).render('error', { status: 400, message: 'Userbots are not allowed' });
				} else if (typeof req.body.avatar !== 'string') {
					res.status(400).render('error', { status: 400, message: 'You provided an invalid avatar' });
				} else if (!/^https:\/\//.test(req.body.avatar) && req.body.avatar) {
					res.status(400).render('error', { status: 400, message: 'Your avatar must use HTTPS' });
				} else if (typeof req.body.name !== 'string') {
					res.status(400).render('error', { status: 400, message: 'You provided an invalid name' });
				} else if (req.body.name.length > 32) {
					res.status(400).render('error', { status: 400, message: 'You provided a name that was too long (32)' });
				} else {
					next();
				}
			});
		}
	}
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
module.exports.validate = validate;
module.exports.owns = owns;
