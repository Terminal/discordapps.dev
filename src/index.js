const config = require('config');
const cons = require('consolidate');
const express = require('express');
const path = require('path');
const r = require('./db');

const app = express();

app.set('views', path.join(__dirname, 'html'))
	.engine('html', cons.mustache)
	.set('view engine', 'html')
	.get('/', (req, res) => {
		res.status(200).render('index.html');
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
	})
	.use(express.static(path.join(__dirname, 'html')))
	.use('*', (req, res) => {
		res.status(404).render('error.html', { code: 404, message: 'Not found' });
	})
	.listen(config.get('webserver').port);
