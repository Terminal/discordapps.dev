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
const discordRouter = require('./discord');
const auth = require('./auth/auth');

const app = express();

app.set('views', path.join(__dirname, 'template'))
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
		res.locals.approved = true;
		next();
	}, discordRouter.list)
	.get('/queue', auth.checkIfLoggedIn, discordRouter.check, discordRouter.isadmin, csrfRouter.make, (req, res, next) => {
		res.locals.approved = false;
		next();
	}, discordRouter.list)
	.post('/queue', auth.checkIfLoggedIn, discordRouter.check, discordRouter.isadmin, csrfRouter.check, (req, res) => {
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
						res.redirect('/queue');
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
						res.redirect('/queue');
					}
				});
		} else {
			res.status(500).render('error.html', { status: 500, message: 'An invalid approval type was encountered that was not caught earlier' });
		}
	})
	.get('/add', auth.checkIfLoggedIn, discordRouter.check, csrfRouter.make, (req, res) => {
		res.status(200).render('add.html', { user: req.user, csrf: req.csrf });
	})
	.post('/add', auth.checkIfLoggedIn, discordRouter.check, csrfRouter.check, (req, res) => {
		if (typeof req.body.id !== 'string'
			|| typeof req.body.name !== 'string'
			|| typeof req.body.avatar !== 'string'
			|| typeof req.body.shortDesc !== 'string'
			|| typeof req.body.type !== 'string'
			|| typeof req.body.longDesc !== 'string'
			|| (req.body.type !== 'iframe' && req.body.type !== 'markdown') // If it's an invalid description type
			|| req.body.id.length > 70 // If the ID is too long
			|| req.body.name.length > 32 // If the ID is too long
			|| req.body.avatar.length > 200 // If the ID is too long
			|| req.body.shortDesc.length > 200 // If the short description is too long
			|| !/^https:\/\//.test(req.body.avatar)
			|| (req.body.type === 'iframe' && req.body.longDesc.length > 200)
			|| (req.body.type === 'markdown' && req.body.longDesc.length > 20000)
			|| (req.body.type === 'iframe' && !/^https:\/\//.test(req.body.longDesc))
			|| /\D/.test(req.body.id)) {
			res.status(400).render('error.html', { status: 400, message: 'Invalid input' });
		} else {
			r.table('bots')
				.insert({
					id: req.body.id,
					name: req.body.name,
					avatar: req.body.avatar,
					shortDesc: req.body.shortDesc,
					type: req.body.type,
					longDesc: req.body.longDesc,
					approved: false
				})
				.run(r.conn, (err, response) => {
					if (err) {
						res.status(500).render('error.html', { status: 500, message: 'An error occured while inserting bot info into Rethonk DB' });
					} else if (response.errors) {
						res.status(409).render('error.html', { status: 409, message: 'A bot with this ID already exists in the database.' });
					} else {
						res.status(200).render('error.html', { status: 200, message: 'Thanks. That went well.' });
					}
				});
		}
	})
	.use('/api', apiRouter)
	.use('/auth', authRouter)
	.use(express.static(path.join(__dirname, 'static')))
	.use('*', (req, res) => {
		res.status(404).render('error.html', { status: 404, message: 'Not found' });
	})
	.listen(config.get('webserver').port);
