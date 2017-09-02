const express = require('express');
const r = require('./db');

const router = express.Router();

const authMiddleware = (req, res, next) => {
	const auth = req.get('Authorization');
	if (!auth) {
		res.status(401).json({ error: 'You need to provide a token. View ls.terminal.ink/docs/api' });
	} else if (typeof auth !== 'string') {
		res.status(401).json({ error: 'Invalid Authorisation header.' });
	} else {
		r.table('bots')
			.get(req.params.id)
			.run(r.conn, (err, bot) => {
				if (err) {
					res.status(500).json({ error: err.message });
				} else if (!bot) {
					res.status(404).json({ error: 'This bot doesn\'t exist' });
				} else if (auth === bot.token) {
					next();
				} else {
					res.status(401).json({ error: 'Incorrect Authorisation header.' });
				}
			});
	}
};

router.get('/', (req, res) => {
	res.redirect('/docs/api');
})
	.get('/bots', (req, res) => {
		r.table('bots')
			.without('token')
			.run(r.conn, (err1, cursor) => {
				if (err1) {
					res.status(500).json({ error: err1.message });
				} else {
					cursor.toArray((err2, result) => {
						if (err2) {
							res.status(500).json({ error: err2.message });
						} else {
							res.status(200).send(result);
						}
					});
				}
			});
	})
	.get('/bots/:id', (req, res) => {
		r.table('bots')
			.get(req.params.id)
			.default({})
			.without('token')
			.run(r.conn, (err, result) => {
				if (err) {
					res.status(500).json({ error: err.message });
				} else if (!result) {
					res.status(404).json({});
				} else {
					res.status(200).json(result);
				}
			});
	})
	.post('/bots/:id', authMiddleware, (req, res) => {
		const count = req.body.count || req.body.server_count;
		if (typeof count !== 'string' && typeof count !== 'number') {
			res.status(400).json({ error: 'You provided an invalid guild count' });
		} else if (parseInt(count, 10) < 0) {
			res.status(400).json({ error: 'Your bot count was too low (0)' });
		} else if (parseInt(count, 10) > 1000000) {
			res.status(400).json({ error: 'Your bot count was too high (1000000)' });
		} else {
			r.table('bots')
				.get(req.params.id)
				.update({
					count: parseInt(count, 10),
				})
				.run(r.conn, (err) => {
					if (err) {
						res.status(500).json({ error: err.message });
					} else {
						res.status(200).json({ message: 'OK' });
					}
				});
		}
	})
	.use('/test/:id', authMiddleware, (req, res) => {
		res.status(200).json({ message: 'OK' });
	})
	.use('*', (req, res) => {
		res.status(404).json({ error: 'This API method has not been defined.' });
	});

module.exports = router;
