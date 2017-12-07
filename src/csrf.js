const r = require('./db');
const crypto = require('crypto');

/**
 * Make a CSRF token and put it in `req.csrf`
 * @param {*} req Express Request Information
 * @param {*} res Express Result Methods
 * @param {*} next Callback to run next middleware
 */
const make = async (req, res, next) => {
	if (req.user && req.user.id) {
		const csrf = crypto.randomBytes(64).toString('hex');
		await r.table('csrf')
			.insert({
				id: req.user.id,
				expiry: Date.now() + 1800000,
				csrf
			}, {
				conflict: 'replace'
			});
		req.csrf = csrf;
	}
	next();
};

/**
 * Check the CSRF token within `req.body.csrf`
 * @param {*} req Express Request Information
 * @param {*} res Express Result Methods
 * @param {*} next Callback to run next middleware
 */
const check = async (req, res, next) => {
	const result = await r.table('csrf')
		.get(req.user.id);
	if (!result || result.csrf !== req.body.csrf || result.expiry < Date.now()) {
		res.status(401).render('error', { status: 401, message: 'A CSRF error occured. Did your form expire?' });
	} else {
		await r.table('csrf')
			.get(req.user.id)
			.delete();
		next();
	}
};

module.exports.make = make;
module.exports.check = check;
