const config = require('config');
const r = require('./../db');
const mustache = require('mustache');
const marked = require('marked');

const check = (req, res, next) => {
	if (req.user.guilds.find(guild => guild.id === config.get('discord').guild)) {
		next();
	} else {
		res.status(403).render('error.html', { user: req.user, status: 403, message: 'You are not inside >terminal_. Register to join on our homepage.' });
	}
};

const isadmin = (req, res, next) => {
	if (config.get('discord').admins.includes(req.user.id)) {
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
						const bots = result.filter(bot => bot.approved === res.locals.approved).map((bot) => {
							const render = bot;
							if (render.type === 'iframe') {
								bot.html = mustache.render('<iframe class="botiframe" src="{{ iframe }}"></iframe>', { iframe: render.longDesc });
							} else if (render.type === 'markdown') {
								bot.html = mustache.render('<div class="botdesc">{{{ content }}}</div>', { content: marked(render.longDesc) });
							} else {
								bot.html = '<div class="botdesc"><h1>Invalid Bot render type</h1></div>';
							}
							return render;
						});
						const json = JSON.stringify(bots);

						res.status(200).render('index.html', { user: req.user, bots, json, approved: res.locals.approved, csrf: req.csrf });
					}
				});
			}
		});
};

module.exports.check = check;
module.exports.isadmin = isadmin;
module.exports.list = list;
