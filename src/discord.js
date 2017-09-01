//	const config = require('config');
const r = require('./db');
const mustache = require('mustache');
const marked = require('marked');

marked.setOptions({
	sanitize: true
});

const list = (req, res) => {
	r.table('bots')
		.without('token')
		.run(r.conn, (err1, cursor) => {
			if (err1) {
				res.status(500).render('error.pug', { status: 500, message: err1.message });
			} else {
				cursor.toArray((err2, result) => {
					if (err2) {
						res.status(500).render('error.pug', { status: 500, message: err2.message });
					} else {
						let bots = result.filter((bot) => {
							if (typeof res.locals.approve === 'boolean') {
								return bot.approved === res.locals.approve;
							}
							return true;
						}).map((bot) => {
							const render = bot;
							if (render.type === 'iframe') {
								render.html = mustache.render('<iframe class="botiframe" src="{{ iframe }}"></iframe>', { iframe: render.longDesc });
							} else if (render.type === 'markdown') {
								render.html = mustache.render('<div class="botdesc">{{{ content }}}</div>', { content: marked(render.longDesc) });
							} else {
								render.html = '<div class="botdesc"><h1>Invalid Bot render type</h1></div>';
							}

							if ((req.user && req.user.id) === bot.owner || (req.user && req.user.admin)) {
								render.editable = true;
							}

							render.random = Math.random();

							return render;
						});

						// Sort by time if looking at queue, otherwise randomise the shit out of it
						if (res.locals.approve === false) {
							bots = bots.sort((a, b) => a.timestamp - b.timestamp);
						} else {
							bots = bots.sort((a, b) => a.random - b.random);
						}

						const json = JSON.stringify(bots)
							.replace(/&/g, '\\&')
							.replace(/</g, '\\<')
							.replace(/>/g, '\\>');

						res.status(200).render('index.pug', {
							user: req.user,
							bots,
							json,
							csrf: req.csrf,
							admin: res.locals.admin,
							title: 'Bot Listing'
						});
					}
				});
			}
		});
};

const validate = (req, res, next) => {
	if (typeof req.body.id !== 'string') {
		res.status(400).render('error.pug', { status: 400, message: 'You provided an invalid ID' });
	} else if (typeof req.body.shortDesc !== 'string') {
		res.status(400).render('error.pug', { status: 400, message: 'You provided an invalid short description' });
	} else if (typeof req.body.name !== 'string') {
		res.status(400).render('error.pug', { status: 400, message: 'You provided an invalid name' });
	} else if (typeof req.body.avatar !== 'string') {
		res.status(400).render('error.pug', { status: 400, message: 'You provided an invalid avatar' });
	} else if (typeof req.body.invite !== 'string') {
		res.status(400).render('error.pug', { status: 400, message: 'You provided an invalid invite' });
	} else if (typeof req.body.type !== 'string') {
		res.status(400).render('error.pug', { status: 400, message: 'You provided an invalid type' });
	} else if (req.body.type !== 'iframe' && req.body.type !== 'markdown') {
		res.status(400).render('error.pug', { status: 400, message: 'You provided an incorrect type' });
	} else if (typeof req.body.longDesc !== 'string') {
		res.status(400).render('error.pug', { status: 400, message: 'You provided an invalid long description' });
	} else if (typeof req.body.count !== 'string') {
		res.status(400).render('error.pug', { status: 400, message: 'You provided an invalid guild count' });
	} else if (req.body.id.length > 70) {
		res.status(400).render('error.pug', { status: 400, message: 'You provided a bot id that was too long (70)' });
	} else if (req.body.shortDesc.length > 200) {
		res.status(400).render('error.pug', { status: 400, message: 'You provided a short description that was too long (200)' });
	} else if (req.body.name.length > 32) {
		res.status(400).render('error.pug', { status: 400, message: 'You provided a name that was too long (32)' });
	} else if (req.body.avatar.length > 2000) {
		res.status(400).render('error.pug', { status: 400, message: 'You provided an avatar that was too long (2000)' });
	} else if (req.body.invite.length > 2000) {
		res.status(400).render('error.pug', { status: 400, message: 'You provided an invite that was too long (2000)' });
	} else if (parseInt(req.body.count, 10) < 0) {
		res.status(400).render('error.pug', { status: 400, message: 'Your bot count was too low (0)' });
	} else if (parseInt(req.body.count, 10) > 1000000) {
		res.status(400).render('error.pug', { status: 400, message: 'Your bot count was too high (1000000)' });
	} else if (!/^https:\/\//.test(req.body.avatar)) {
		res.status(400).render('error.pug', { status: 400, message: 'Your avatar must use HTTPS' });
	} else if (!/^https?:\/\//.test(req.body.invite)) {
		res.status(400).render('error.pug', { status: 400, message: 'Your invite must use HTTP or HTTPS' });
	} else if (req.body.type === 'iframe' && !/^https:\/\//.test(req.body.longDesc)) {
		res.status(400).render('error.pug', { status: 400, message: 'Your iframe based long description must use HTTPS' });
	} else if (req.body.type === 'iframe' && req.body.longDesc > 2000) {
		res.status(400).render('error.pug', { status: 400, message: 'You provided an iframe based long description that was too long (2000)' });
	} else if (req.body.type === 'markdown' && req.body.longDesc > 20000) {
		res.status(400).render('error.pug', { status: 400, message: 'You provided a markdown based long description that was too long (20000)' });
	} else if (/\D/.test(req.body.id)) {
		res.status(400).render('error.pug', { status: 400, message: 'Your bot ID had values other than digits' });
	} else {
		next();
	}
};

const owns = (req, res, next) => {
	r.table('bots')
		.get(req.params.id || req.body.id)
		.run(r.conn, (err, result) => {
			if (err) {
				res.status(500).render('error.pug', { status: 500, message: err.message });
			} else if (!result) {
				res.status(404).render('error.pug', { status: 404, message: 'Bot not found' });
			} else if (req.user.id === result.owner || req.user.admin) {
				res.locals.bot = result;
				next();
			} else {
				res.status(400).render('error.pug', { status: 400, message: 'You are not allowed to edit other\'s bots' });
			}
		});
};

module.exports.list = list;
module.exports.validate = validate;
module.exports.owns = owns;
