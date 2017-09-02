const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const config = require('config');
const cons = require('consolidate');
const express = require('express');
const session = require('express-session');
// const bot = require('./bot');
const path = require('path');
const r = require('./db');
const apiR = require('./api');
const authR = require('./auth');
const csrfR = require('./csrf');
const docsR = require('./docs');
const userR = require('./user');
const discR = require('./discord');
const langM = require('./lang');
const auth = require('./auth/auth');
const crypto = require('crypto');
const i18n = require('i18n');

i18n.configure({
	directory: path.join(__dirname, '..', 'locales'),
	cookie: 'lang',
	defaultLocale: 'en-gb',
	autoReload: true,
	updateFiles: false
});

const app = express();

app.set('views', path.join(__dirname, 'dynamic'))
	.engine('html', cons.pug)
	.set('view engine', 'html')
	.use(cookieParser(config.get('webserver').secret))
	.use(session({
		secret: config.get('webserver').secret,
		resave: true,
		saveUninitialized: true,
		proxy: true
	}))
	.use(i18n.init)
	.use(auth.initialize())
	.use(auth.session())
	.use(bodyParser.json())
	.use(bodyParser.urlencoded({
		extended: true
	}))
	.use(userR.userSetup)
	.get('/', csrfR.make, (req, res, next) => {
		res.locals.approve = true;
		next();
	}, discR.list)
	.get('/all', csrfR.make, discR.list)
	.get('/queue', csrfR.make, (req, res, next) => {
		res.locals.approve = false;
		next();
	}, discR.list)
	.post('/queue', userR.auth, csrfR.check, userR.admin, (req, res) => {
		const previous = req.header('Referer') || '/';
		if (typeof req.body.id.length > 70
			|| (req.body.approve !== 'true' && req.body.approve !== 'false')) {
			res.status(400).render('error.pug', { status: 400, message: 'Invalid input' });
		} else if (req.body.approve === 'true') {
			r.table('bots')
				.get(req.body.id)
				.update({
					approved: true
				}, {
					returnChanges: true
				})
				.run(r.conn, (err, result) => {
					if (err) {
						res.status(500).render('error.pug', { status: 500, message: 'An error occured while updating bot info into Rethonk DB' });
					} else {
						res.redirect(previous);
						// bot.channel.createMessage(`<@${req.user.id}> approved \`${result.changes[0].old_val.name}\` <@${result.changes[0].old_val.id}> by <@${result.changes[0].old_val.owner}>`);
					}
				});
		} else if (req.body.approve === 'false') {
			r.table('bots')
				.get(req.body.id)
				.delete({
					returnChanges: true
				})
				.run(r.conn, (err, result) => {
					if (err) {
						res.status(500).render('error.pug', { status: 500, message: 'An error occured while deleting bot info into Rethonk DB' });
					} else {
						res.redirect(previous);
						// bot.channel.createMessage(`<@${req.user.id}> rejected \`${result.changes[0].old_val.name}\` <@${result.changes[0].old_val.id}> by <@${result.changes[0].old_val.owner}>`);
					}
				});
		} else {
			res.status(500).render('error.pug', { status: 500, message: 'An invalid approval type was encountered that was not caught earlier' });
		}
	})
	.get('/add', userR.auth, csrfR.make, (req, res) => {
		res.render('add.pug', {
			csrf: req.csrf,
			title: 'Add Bot'
		});
	})
	.post('/add', userR.auth, csrfR.check, discR.validate, (req, res) => {
		r.table('bots')
			.insert({
				id: req.body.id,
				name: req.body.name,
				avatar: req.body.avatar,
				invite: req.body.invite,
				count: parseInt(req.body.count, 10),
				shortDesc: req.body.shortDesc,
				type: req.body.type,
				longDesc: req.body.longDesc,
				owner: req.user.id,
				approved: false,
				token: crypto.randomBytes(64).toString('hex'),
				timestamp: Date.now()
			})
			.run(r.conn, (err, response) => {
				if (err) {
					res.status(500).render('error.pug', { status: 500, message: 'An error occured while inserting bot info into Rethonk DB' });
				} else if (response.errors) {
					res.status(409).render('error.pug', { status: 409, message: 'A bot with this ID already exists in the database.' });
				} else {
					res.render('error.pug', { status: 200, message: 'Thanks. That went well.' });
					// bot.channel.createMessage(`<@${req.user.id}> added \`${req.body.name}\` <@${req.body.id}>`);
				}
			});
	})
	.get('/edit/:id', userR.auth, csrfR.make, discR.owns, (req, res) => {
		res.render('edit.pug', {
			csrf: req.csrf,
			bot: res.locals.bot,
			title: 'Edit Bot'
		});
	})
	.post('/edit/:id', userR.auth, csrfR.check, discR.owns, discR.validate, (req, res) => {
		r.table('bots')
			.get(req.body.id)
			.update({
				name: req.body.name,
				avatar: req.body.avatar,
				invite: req.body.invite,
				count: parseInt(req.body.count, 10),
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
					// bot.channel.createMessage(`<@${req.user.id}> edited \`${res.locals.bot.name}\` <@${res.locals.bot.id}> by <@${res.locals.bot.owner}>`);
				}
			});
	})
	.get('/delete/:id', userR.auth, csrfR.make, discR.owns, (req, res) => {
		res.render('delete.pug', {
			csrf: req.csrf,
			title: 'Delete Bot'
		});
	})
	.post('/delete/:id', userR.auth, csrfR.check, discR.owns, (req, res) => {
		r.table('bots')
			.get(req.params.id)
			.delete()
			.run(r.conn, (err) => {
				if (err) {
					res.status(500).render('error.pug', { status: 500, message: 'An error occured while inserting bot info into Rethonk DB' });
				} else {
					res.render('error.pug', { status: 200, message: 'Your bot was successfully deleted.' });
					// bot.channel.createMessage(`<@${req.user.id}> deleted \`${res.locals.bot.name}\` <@${res.locals.bot.id}> by <@${res.locals.bot.owner}>`);
				}
			});
	})
	.get('/token/:id', userR.auth, csrfR.make, discR.owns, (req, res) => {
		res.render('token.pug', {
			csrf: req.csrf,
			bot: res.locals.bot
		});
	})
	.post('/token/:id', userR.auth, csrfR.check, discR.owns, (req, res) => {
		r.table('bots')
			.get(req.params.id)
			.update({
				token: crypto.randomBytes(64).toString('hex')
			}, {
				returnChanges: true
			})
			.run(r.conn, (err) => {
				if (err) {
					res.status(500).render('error.pug', { status: 500, message: 'An error occured while updating bot info into Rethonk DB' });
				} else {
					res.redirect(`/token/${req.params.id}`);
				}
			});
	})
	.use('/api', apiR)
	.use('/auth', authR)
	.use('/docs', docsR)
	.use('/lang', langM)
	.use(express.static(path.join(__dirname, 'static')))
	.use('*', (req, res) => {
		res.status(404).render('error.pug', { status: 404, message: 'Not found' });
	})
	.listen(config.get('webserver').port);
