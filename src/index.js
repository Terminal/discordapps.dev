const bodyParser = require('body-parser');
const config = require('config');
const cons = require('consolidate');
const express = require('express');
const session = require('express-session');
const path = require('path');
const r = require('./db');
const apiRouter = require('./api');
const authRouter = require('./auth');
const csrfRouter = require('./csrf');
const docsRouter = require('./docs');
const discordRouter = require('./discord');
const auth = require('./auth/auth');

const app = express();

app.set('views', path.join(__dirname, 'dynamic'))
	.engine('html', cons.mustache)
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
	.get('/', (req, res, next) => {
		res.locals.approve = true;
		next();
	}, discordRouter.list)
	.get('/all', auth.checkIfLoggedIn, csrfRouter.make, discordRouter.isadmin(true), discordRouter.list)
	.get('/queue', auth.checkIfLoggedIn, csrfRouter.make, discordRouter.isadmin(true), (req, res, next) => {
		res.locals.approve = false;
		next();
	}, discordRouter.list)
	.post('/queue', auth.checkIfLoggedIn, discordRouter.check, discordRouter.isadmin(false), csrfRouter.check, (req, res) => {
		const previous = req.header('Referer') || '/';
		if (typeof req.body.id.length > 70
			|| (req.body.approve !== 'true' && req.body.approve !== 'false')) {
			res.status(400).render('error.html', { status: 400, message: 'Invalid input' });
		} else if (req.body.approve === 'true') {
			r.table('bots')
				.get(req.body.id)
				.update({
					approved: true
				})
				.run(r.conn, (err) => {
					if (err) {
						res.status(500).render('error.html', { status: 500, message: 'An error occured while updating bot info into Rethonk DB' });
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
						res.status(500).render('error.html', { status: 500, message: 'An error occured while deleting bot info into Rethonk DB' });
					} else {
						res.redirect(previous);
					}
				});
		} else {
			res.status(500).render('error.html', { status: 500, message: 'An invalid approval type was encountered that was not caught earlier' });
		}
	})
	.get('/add', auth.checkIfLoggedIn, discordRouter.check, csrfRouter.make, (req, res) => {
		res.render('add.html', { user: req.user, csrf: req.csrf });
	})
	.post('/add', auth.checkIfLoggedIn, discordRouter.check, csrfRouter.check, discordRouter.validate, (req, res) => {
		r.table('bots')
			.insert({
				id: req.body.id,
				name: req.body.name,
				avatar: req.body.avatar,
				shortDesc: req.body.shortDesc,
				type: req.body.type,
				longDesc: req.body.longDesc,
				owner: req.user.id,
				approved: false
			})
			.run(r.conn, (err, response) => {
				if (err) {
					res.status(500).render('error.html', { status: 500, message: 'An error occured while inserting bot info into Rethonk DB' });
				} else if (response.errors) {
					res.status(409).render('error.html', { status: 409, message: 'A bot with this ID already exists in the database.' });
				} else {
					res.render('error.html', { status: 200, message: 'Thanks. That went well.' });
				}
			});
	})
	.get('/edit/:id', auth.checkIfLoggedIn, discordRouter.check, csrfRouter.make, discordRouter.isadmin(false), discordRouter.owns, (req, res) => {
		res.render('edit.html', { user: req.user, csrf: req.csrf, bot: res.locals.bot });
	})
	.post('/edit/:id', auth.checkIfLoggedIn, discordRouter.check, csrfRouter.check, discordRouter.isadmin(false), discordRouter.owns, discordRouter.validate, (req, res) => {
		r.table('bots')
			.get(req.body.id)
			.update({
				name: req.body.name,
				avatar: req.body.avatar,
				shortDesc: req.body.shortDesc,
				type: req.body.type,
				longDesc: req.body.longDesc
			})
			.run(r.conn, (err, response) => {
				if (err) {
					res.status(500).render('error.html', { status: 500, message: 'An error occured while inserting bot info into Rethonk DB' });
				} else if (response.unchanged) {
					res.render('error.html', { status: 200, message: 'Your bot was left unchanged.' });
				} else {
					res.render('error.html', { status: 200, message: 'Thanks. That went well.' });
				}
			});
	})
	.get('/delete/:id', auth.checkIfLoggedIn, discordRouter.check, csrfRouter.make, discordRouter.isadmin(false), discordRouter.owns, (req, res) => {
		res.render('delete.html', { user: req.user, csrf: req.csrf });
	})
	.post('/delete/:id', auth.checkIfLoggedIn, discordRouter.check, csrfRouter.check, discordRouter.isadmin(false), discordRouter.owns, (req, res) => {
		r.table('bots')
			.get(req.params.id)
			.delete()
			.run(r.conn, (err) => {
				if (err) {
					res.status(500).render('error.html', { status: 500, message: 'An error occured while inserting bot info into Rethonk DB' });
				} else {
					res.render('error.html', { status: 200, message: 'Your bot was successfully deleted.' });
				}
			});
	})
	.use('/api', apiRouter)
	.use('/auth', authRouter)
	.use('/docs', docsRouter)
	.use(express.static(path.join(__dirname, 'static')))
	.use('*', (req, res) => {
		res.status(404).render('error.html', { status: 404, message: 'Not found' });
	})
	.listen(config.get('webserver').port);
