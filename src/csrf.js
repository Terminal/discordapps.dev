const r = require('./db');
const crypto = require('crypto');

/**
 * Make a CSRF token and put it in `res.locals.csrf`
 * @param {*} req Express Request Information
 * @param {*} res Express Result Methods
 * @param {*} next Callback to run next middleware
 */
const make = async (req, res, next) => {
	if (req.user && req.user.id) {
		const csrf = crypto.randomBytes(64).toString('hex');
		await r.table('csrf')
			.insert({
				user: req.user.id,
				expiry: Date.now() + 1800000,
				csrf
			}, {
				conflict: 'replace'
			});
		res.locals.csrf = csrf;
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
	// Delete old CSRF records
	await r.table('csrf')
		.filter(r.row('expiry').lt(Date.now()))
		.delete();

	// Find the user's CSRF record
	const results = await r.table('csrf')
		.filter({
			user: req.user.id,
			csrf: req.body.csrf
		})
		.run();

	// Get the first result
	const result = results[0] || null;

	// If there is no result, send an error, as there is no valid CSRF record
	if (!result) {
		res.status(401).render('error', { status: 401, message: 'The server could not find your CSRF record. Has it expired?' });
	} else {
		// Delete the CSRF record.
		await r.table('csrf')
			.get(result.id)
			.delete();
		next();
	}
};

module.exports.make = make;
module.exports.check = check;
