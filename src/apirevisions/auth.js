const r = require('./../db');

module.exports = async (req, res, next) => {
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
