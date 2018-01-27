const r = require('./../../db');

/**
 * Check if a token is valid
 * @param {*} req Express Request Information
 * @param {*} res Express Result Methods
 * @param {*} next Callback to run next middleware
 */
module.exports = async (req, res, next) => {
	// Compare the token of the bot to the one sent by the client
	const auth = req.get('Authorization');

	const bot = await r.table('bots')
		.get(req.params.id)
		.run();

	if (!bot) {
		res.status(404).json({ error: 'This bot doesn\'t exist' });
	} else if (auth === bot.token) {
		next();
	} else {
		res.status(401).json({ error: 'Incorrect Authorisation header.' });
	}
};
