const r = require('./db');
const crypto = require('crypto');

const make = async (req, res, next) => {
	if (req.user && req.user.id) {
		const csrf = crypto.randomBytes(64).toString('hex');
		await r.table('csrf')
			.insert({
				id: req.user.id,
				expiry: Date.now() + 900,
				csrf
			}, {
				conflict: 'replace'
			})
			.run(r.conn);
		req.csrf = csrf;
	}
	next();
};

const check = async (req, res, next) => {
	const result = await r.table('csrf')
		.get(req.user.id)
		.run(r.conn);
	if (!result || result.csrf !== req.body.csrf || result.expiry > Date.now()) {
		res.status(401).render('error.pug', { status: 401, message: 'A CSRF error occured. Did your form expire?' });
	} else {
		await r.table('csrf')
			.get(req.user.id)
			.delete()
			.run(r.conn);
		next();
	}
};

module.exports.make = make;
module.exports.check = check;
