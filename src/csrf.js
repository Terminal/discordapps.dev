const r = require('./db');
const crypto = require('crypto');

const make = (req, res, next) => {
	if (req.user && req.user.id) {
		const csrf = crypto.randomBytes(64).toString('hex');
		r.table('csrf')
			.insert({
				id: req.user.id,
				expiry: Date.now() + 900,
				csrf
			}, {
				conflict: 'replace'
			})
			.run(r.conn, (err) => {
				if (err) {
					res.status(500).render('error.pug', { status: 500, message: 'An error occured with the Rethonk DB server.' });
				} else {
					req.csrf = csrf;
					next();
				}
			});
	} else {
		next();
	}
};

const check = (req, res, next) => {
	r.table('csrf')
		.get(req.user.id)
		.run(r.conn, (err1, result) => {
			if (err1) {
				res.status(500).render('error.pug', { status: 500, message: 'An error occured with the Rethonk DB server.' });
			} else if (!result || result.csrf !== req.body.csrf || result.expiry > Date.now()) {
				res.status(401).render('error.pug', { status: 401, message: 'A CSRF error occured. Did your form expire?' });
			} else {
				r.table('csrf')
					.get(req.user.id)
					.delete()
					.run(r.conn, (err2) => {
						if (err2) {
							res.status(500).render('error.pug', { status: 500, message: 'An error occured with the Rethonk DB server.' });
						} else {
							next();
						}
					});
			}
		});
};

module.exports.make = make;
module.exports.check = check;
