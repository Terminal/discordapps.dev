const config = require('config');
const bot = require('./../discord');

const userSetup = (req, res, next) => {
	if (req.user && bot.startTime) {
		const user = bot.guilds.get(config.get('discord').guild).members.get(req.user.id);

		if (user) {
			req.user.admin = user.roles.some(role => config.get('discord').roles.includes(role));
		} else {
			req.user.admin = false;
		}
	}

	res.locals.user = req.user;

	next();
};

const auth = (req, res, next) => {
	if (req.user) {
		next();
	} else {
		res.status(401).render('error', { status: 401, message: 'You have not logged in yet.' });
	}
};

const apiAuth = (req, res, next) => {
	if (req.user) {
		next();
	} else {
		res.status(401).json({});
	}
};

const admin = (req, res, next) => {
	if (req.user && req.user.admin) {
		next();
	} else {
		res.status(400).render('error', { status: 400, message: 'You are not authorised to run this command.' });
	}
};

const terminal = (req, res, next) => {
	if (req.user && req.user.terminal) {
		next();
	} else if (req.user) {
		res.status(400).render('error', { status: 400, message: 'You are not in the guild.' });
	} else {
		res.status(401).render('error', { status: 401, message: 'You have not logged in yet.' });
	}
};

module.exports = {
	userSetup, auth, admin, terminal, apiAuth
};
