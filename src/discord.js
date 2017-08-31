const config = require('config');
const r = require('./db');
const mustache = require('mustache');
const marked = require('marked');

marked.setOptions({
	sanitize: true
});

const check = (req, res, next) => {
	if (req.user.guilds.find(guild => guild.id === config.get('discord').guild)) {
		next();
	} else {
		res.status(403).render('error.html', { user: req.user, status: 403, message: 'You are not inside >terminal_. Register to join on our homepage.' });
	}
};

const isadmin = skip =>
	(req, res, next) => {
		if (config.get('discord').admins.includes(req.user.id)) {
			res.locals.admin = true;
			next();
		} else if (skip) {
			res.locals.admin = false;
			next();
		} else {
			res.status(403).render('error.html', { user: req.user, status: 403, message: `${req.user.username} is not in the sudoers file. This incident will be reported.` });
		}
	};

const list = (req, res) => {
	r.table('bots')
		.run(r.conn, (err1, cursor) => {
			if (err1) {
				res.status(500).render('error.html', { user: req.user, code: 500, message: err1.message });
			} else {
				cursor.toArray((err2, result) => {
					if (err2) {
						res.status(500).render('error.html', { user: req.user, code: 500, message: err2.message });
					} else {
						const bots = result.filter((bot) => {
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

							if ((req.user && req.user.id) === bot.owner || res.locals.admin) {
								render.editable = true;
							}
							return render;
						});

						const json = JSON.stringify(bots);

						res.status(200).render('index.html', {
							user: req.user,
							bots,
							json,
							csrf: req.csrf,
							admin: res.locals.admin
						});
					}
				});
			}
		});
};

const validate = (req, res, next) => {
	if (typeof req.body.id !== 'string'
		|| typeof req.body.name !== 'string'
		|| typeof req.body.avatar !== 'string'
		|| typeof req.body.invite !== 'string'
		|| typeof req.body.shortDesc !== 'string'
		|| typeof req.body.type !== 'string'
		|| typeof req.body.longDesc !== 'string'
		|| (req.body.type !== 'iframe' && req.body.type !== 'markdown') // If it's an invalid description type
		|| req.body.id.length > 70
		|| req.body.name.length > 32
		|| req.body.avatar.length > 200
		|| req.body.invite.length > 2000
		|| req.body.shortDesc.length > 200
		|| !/^https:\/\//.test(req.body.avatar)
		|| !/^https?:\/\//.test(req.body.invite)
		|| (req.body.type === 'iframe' && req.body.longDesc.length > 200)
		|| (req.body.type === 'markdown' && req.body.longDesc.length > 20000)
		|| (req.body.type === 'iframe' && !/^https:\/\//.test(req.body.longDesc))
		|| /\D/.test(req.body.id)) {
		res.status(400).render('error.html', { status: 400, message: 'Invalid input' });
	} else {
		next();
	}
};

const owns = (req, res, next) => {
	r.table('bots')
		.get(req.params.id)
		.run(r.conn, (err, result) => {
			if (err) {
				res.status(500).render('error.html', { user: req.user, code: 500, message: err.message });
			} else if (!result) {
				res.status(404).render('error.html', { user: req.user, status: 404, message: 'Bot not found' });
			} else if (req.user.id === result.owner || res.locals.admin) {
				res.locals.bot = result;
				res.locals.bot.types = {};
				res.locals.bot.types[result.type || 'invalid'] = true;
				next();
			} else {
				res.status(400).render('error.html', { user: req.user, status: 400, message: 'You are not allowed to edit other\'s bots' });
			}
		});
};

module.exports.check = check;
module.exports.isadmin = isadmin;
module.exports.list = list;
module.exports.validate = validate;
module.exports.owns = owns;
