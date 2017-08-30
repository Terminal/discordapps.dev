const express = require('express');
const r = require('./db');

const router = express.Router();

router.get('/', (req, res) => {
	res.redirect('/docs/api');
})
	.get('/bots', (req, res) => {
		r.table('bots')
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
			.run(r.conn, (err, result) => {
				if (err) {
					res.status(500).json({ error: err.message });
				} else if (!result) {
					res.status(404).json({});
				} else {
					res.status(200).json(result);
				}
			});
	});

module.exports = router;
