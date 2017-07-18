const express = require('express');
const r = require('./../db');

const router = express.Router();

router.get('/', (req, res) => {
	res.status(200).render('api.html');
})
	.get('/bots', (req, res) => {
		r.table('bots')
			.run(r.conn, (err1, cursor) => {
				if (err1) {
					res.status(500).send(JSON.stringify({ error: err1.message }));
				} else {
					cursor.toArray((err2, result) => {
						if (err2) {
							res.status(500).send(JSON.stringify({ error: err2.message }));
						} else {
							res.status(200).send(result);
						}
					});
				}
			});
	})
	.get('/bots/:id', (req, res) => {
		r.table('bots')
			.filter(
				r.row('userid').eq(req.params.id)
			)
			.run(r.conn, (err1, cursor) => {
				if (err1) {
					res.status(500).send(JSON.stringify({ error: err1.message }));
				} else {
					cursor.toArray((err2, result) => {
						if (err2) {
							res.status(500).send(JSON.stringify({ error: err2.message }));
						} else if (result.length === 0) {
							res.status(404).send(result);
						} else {
							res.status(200).send(result);
						}
					});
				}
			});
	});

module.exports = router;
