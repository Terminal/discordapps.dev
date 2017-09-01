const config = require('config');

const userSetup = (req, res, next) => {
	if (req.user) {
		if (config.get('discord').admins.includes(req.user.id)) {
			req.user.admin = true;
		} else {
			req.user.admin = false;
		}

		if (req.user.guilds.find(guild => guild.id === config.get('discord').guild)) {
			req.user.terminal = true;
		} else {
			req.user.terminal = false;
		}
	}

	res.locals.user = req.user;

	next();
};

const auth = (req, res, next) => {
	if (req.user) {
		next();
	} else {
		res.status(401).render('error.pug', { status: 401, message: 'You have not logged in yet.' });
	}
};

const admin = (req, res, next) => {
	if (req.user && req.user.admin) {
		next();
	} else {
		res.status(400).render('error.pug', { status: 400, message: 'You are not authorised to run this command.' });
	}
};

const terminal = (req, res, next) => {
	if (req.user && req.user.terminal) {
		next();
	} else if (req.user) {
		res.status(400).render('error.pug', { status: 400, message: 'You are not in the >terminal_ guild.' });
	} else {
		res.status(401).render('error.pug', { status: 401, message: 'You have not logged in yet.' });
	}
};

module.exports.userSetup = userSetup;
module.exports.auth = auth;
module.exports.admin = admin;
module.exports.terminal = terminal;
