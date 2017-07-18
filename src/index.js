const config = require('config');
const cons = require('consolidate');
const express = require('express');
const path = require('path');
const apiRouter = require('./api');

const app = express();

app.set('views', path.join(__dirname, 'html'))
	.engine('html', cons.mustache)
	.set('view engine', 'html')
	.use('/api', apiRouter)
	.use(express.static(path.join(__dirname, 'html')))
	.use('*', (req, res) => {
		res.status(404).render('error.html', { code: 404, message: 'Not found' });
	})
	.listen(config.get('webserver').port);
