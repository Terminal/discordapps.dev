const config = require('config');

const check = (req, res, next) => {
	if (req.user.guilds.find(guild => guild.id === config.get('discord').guild)) {
		next();
	} else {
		res.status(403).render('error.html', { user: req.user, status: 403, message: 'You are not inside >terminal_. Register to join on our homepage.' });
	}
};

module.exports.check = check;
