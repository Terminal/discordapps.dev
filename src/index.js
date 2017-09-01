const bodyParser = require('body-parser');
const config = require('config');
const cons = require('consolidate');
const express = require('express');
const session = require('express-session');
const path = require('path');
const r = require('./db');
const apiR = require('./api');
const authR = require('./auth');
const csrfR = require('./csrf');
const docsR = require('./docs');
const userR = require('./user');
const discR = require('./discord');
const auth = require('./auth/auth');

const app = express();

app.set('views', path.join(__dirname, 'dynamic'))
	.engine('html', cons.pug)
	.set('view engine', 'html')
	.use(session({
		secret: config.get('webserver').secret,
		resave: false,
		saveUninitialized: true,
		proxy: true
	}))
	.use(auth.initialize())
	.use(auth.session())
	.use(bodyParser.json())
	.use(bodyParser.urlencoded({
		extended: true
	}))
	.use(userR.userSetup)
	.get('/', (req, res, next) => {
		res.locals.approve = true;
		next();
	}, discR.list)
	.get('/all', userR.auth, csrfR.make, discR.list)
	.get('/queue', userR.auth, csrfR.make, (req, res, next) => {
		res.locals.approve = false;
		next();
	}, discR.list)
	.post('/queue', userR.terminal, csrfR.check, (req, res) => {
		const previous = req.header('Referer') || '/';
		if (typeof req.body.id.length > 70
			|| (req.body.approve !== 'true' && req.body.approve !== 'false')) {
			res.status(400).render('error.pug', { status: 400, message: 'Invalid input' });
		} else if (req.body.approve === 'true') {
			r.table('bots')
				.get(req.body.id)
				.update({
					approved: true
				})
				.run(r.conn, (err) => {
					if (err) {
						res.status(500).render('error.pug', { status: 500, message: 'An error occured while updating bot info into Rethonk DB' });
					} else {
						res.redirect(previous);
					}
				});
		} else if (req.body.approve === 'false') {
			r.table('bots')
				.get(req.body.id)
				.delete()
				.run(r.conn, (err) => {
					if (err) {
						res.status(500).render('error.pug', { status: 500, message: 'An error occured while deleting bot info into Rethonk DB' });
					} else {
						res.redirect(previous);
					}
				});
		} else {
			res.status(500).render('error.pug', { status: 500, message: 'An invalid approval type was encountered that was not caught earlier' });
		}
	})
	.get('/add', userR.terminal, csrfR.make, (req, res) => {
		res.render('add.html', { csrf: req.csrf });
	})
	.post('/add', userR.terminal, csrfR.check, discR.validate, (req, res) => {
		r.table('bots')
			.insert({
				id: req.body.id,
				name: req.body.name,
				avatar: req.body.avatar,
				invite: req.body.invite,
				shortDesc: req.body.shortDesc,
				type: req.body.type,
				longDesc: req.body.longDesc,
				owner: req.user.id,
				approved: false
			})
			.run(r.conn, (err, response) => {
				if (err) {
					res.status(500).render('error.pug', { status: 500, message: 'An error occured while inserting bot info into Rethonk DB' });
				} else if (response.errors) {
					res.status(409).render('error.pug', { status: 409, message: 'A bot with this ID already exists in the database.' });
				} else {
					res.render('error.pug', { status: 200, message: 'Thanks. That went well.' });
				}
			});
	})
	.get('/edit/:id', userR.terminal, csrfR.make, discR.owns, (req, res) => {
		res.render('edit.html', { csrf: req.csrf, bot: res.locals.bot });
	})
	.post('/edit/:id', userR.terminal, csrfR.check, discR.owns, discR.validate, (req, res) => {
		r.table('bots')
			.get(req.body.id)
			.update({
				name: req.body.name,
				avatar: req.body.avatar,
				invite: req.body.invite,
				shortDesc: req.body.shortDesc,
				type: req.body.type,
				longDesc: req.body.longDesc
			})
			.run(r.conn, (err, response) => {
				if (err) {
					res.status(500).render('error.pug', { status: 500, message: 'An error occured while inserting bot info into Rethonk DB' });
				} else if (response.unchanged) {
					res.render('error.pug', { status: 200, message: 'Your bot was left unchanged.' });
				} else {
					res.render('error.pug', { status: 200, message: 'Thanks. That went well.' });
				}
			});
	})
	.get('/delete/:id', userR.terminal, csrfR.make, discR.owns, (req, res) => {
		res.render('delete.html', { csrf: req.csrf });
	})
	.post('/delete/:id', userR.terminal, csrfR.check, discR.owns, (req, res) => {
		r.table('bots')
			.get(req.params.id)
			.delete()
			.run(r.conn, (err) => {
				if (err) {
					res.status(500).render('error.pug', { status: 500, message: 'An error occured while inserting bot info into Rethonk DB' });
				} else {
					res.render('error.pug', { status: 200, message: 'Your bot was successfully deleted.' });
				}
			});
	})
	.use('/api', apiR)
	.use('/auth', authR)
	.use('/docs', docsR)
	.use(express.static(path.join(__dirname, 'static')))
	.use('*', (req, res) => {
		res.status(404).render('error.pug', { status: 404, message: 'Not found' });
	})
	.listen(config.get('webserver').port);
