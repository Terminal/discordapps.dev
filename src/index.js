// Parser for POST and cookies
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');

// Configuration
const config = require('config');

// Consolidation of pug files to HTML
const cons = require('consolidate');

// Webserver
const express = require('express');

// Sessions for express
const session = require('express-session');

// Eris Discord Bot
// bot.guild - The Terminal guild
// bot.channel - The selected channel
const bot = require('./bot');

// Joining paths
const path = require('path');

// RethinkDB
const r = require('./db');

// API Middleware
const apiM = require('./api');

// Authentication Middleware
const auth = require('./auth/auth');
const authM = require('./auth');
const userM = require('./user');
const csrfM = require('./csrf');

// Documentation Middleware
const docsM = require('./docs');

// Bot List Middleware
const discM = require('./discord');

// Crypto for generating API tokens when a bot is created
const crypto = require('crypto');

// Internationalisation
const i18n = require('i18n');
const langM = require('./lang');

// Configure i18n to NEVER touch the files, and default to
// English UK
i18n.configure({
	directory: path.join(__dirname, '..', 'locales'),
	cookie: 'lang',
	defaultLocale: 'en-gb',
	autoReload: true,
	updateFiles: false
});

// Create an express app
const app = express();

app.set('views', path.join(__dirname, 'dynamic')) // Allocate views to be used
	.engine('html', cons.pug) // Use PUG
	.set('view engine', 'html')
	.use(cookieParser(config.get('webserver').secret)) // Set cookie secret
	.use(session({
		secret: config.get('webserver').secret,
		resave: true,
		saveUninitialized: true,
		proxy: true
	}))
	.use(i18n.init) // Use i18n
	.use(auth.initialize()) // Initiate the authentication mechanisms
	.use(auth.session())
	.use(bodyParser.json())
	.use(bodyParser.urlencoded({
		extended: true
	}))
	.use(userM.userSetup) // Append details such as if they are an admin, and if they are in the guild
	.get('/', csrfM.make, (req, res, next) => {
		res.locals.approve = true;
		next();
	}, discM.list) // Display approved bots
	.get('/all', csrfM.make, discM.list) // Display all bots
	.get('/queue', csrfM.make, (req, res, next) => {
		// Display not-yet approved bots
		res.locals.approve = false;
		next();
	}, discM.list)
	.post('/queue', userM.auth, csrfM.check, userM.admin, (req, res) => {
		// Delete or flag bot as approved
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
					} else if (res.skipped) {
						res.status(404).render('error.pug', { status: 404, message: 'Bot Not found' });
					} else if (!result.changes) {
						res.redirect(previous);
					} else {
						res.redirect(previous);
						bot.channel.createMessage(`<@${req.user.id}> approved \`${result.changes[0].old_val.name}\` <@${result.changes[0].old_val.id}> by <@${result.changes[0].old_val.owner}>`);
						const owner = bot.guild.members.get(result.changes[0].old_val.owner);
						if (owner) {
							owner.addRole(config.get('discord').dev);
						}
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
					} else if (res.skipped) {
						res.status(404).render('error.pug', { status: 404, message: 'Bot Not found' });
					} else if (!result.changes) {
						res.redirect(previous);
					} else {
						res.redirect(previous);
						bot.channel.createMessage(`<@${req.user.id}> rejected \`${result.changes[0].old_val.name}\` <@${result.changes[0].old_val.id}> by <@${result.changes[0].old_val.owner}>`);
					}
				});
		} else {
			res.status(500).render('error.pug', { status: 500, message: 'An invalid approval type was encountered that was not caught earlier' });
		}
	})
	.get('/add', userM.auth, csrfM.make, (req, res) => {
		// Display the add screen
		res.render('add.pug', {
			csrf: req.csrf,
			title: 'Add Bot'
		});
	})
	.post('/add', userM.auth, csrfM.check, discM.validate, (req, res) => {
		// Insert specific elements into the database.
		// Input validated by Discord Middleware
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
					// Send message to Discord Channel
					bot.channel.createMessage(`<@${req.user.id}> added \`${req.body.name}\` <@${req.body.id}>`);
				}
			});
	})
	.get('/edit/:id', userM.auth, csrfM.make, discM.owns, (req, res) => {
		// Display the edit screen with the bot's items
		res.render('edit.pug', {
			csrf: req.csrf,
			bot: res.locals.bot,
			title: 'Edit Bot'
		});
	})
	.post('/edit/:id', userM.auth, csrfM.check, discM.owns, discM.validate, (req, res) => {
		// Edit only the bits that need to be edited
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
					bot.channel.createMessage(`<@${req.user.id}> edited \`${res.locals.bot.name}\` <@${res.locals.bot.id}> by <@${res.locals.bot.owner}>`);
				}
			});
	})
	.get('/delete/:id', userM.auth, csrfM.make, discM.owns, (req, res) => {
		// View a page before deleting the bot
		res.render('delete.pug', {
			csrf: req.csrf,
			title: 'Delete Bot'
		});
	})
	.post('/delete/:id', userM.auth, csrfM.check, discM.owns, (req, res) => {
		// Delete the bot
		r.table('bots')
			.get(req.params.id)
			.delete()
			.run(r.conn, (err) => {
				if (err) {
					res.status(500).render('error.pug', { status: 500, message: 'An error occured while inserting bot info into Rethonk DB' });
				} else {
					res.render('error.pug', { status: 200, message: 'Your bot was successfully deleted.' });
					bot.channel.createMessage(`<@${req.user.id}> deleted \`${res.locals.bot.name}\` <@${res.locals.bot.id}> by <@${res.locals.bot.owner}>`);
				}
			});
	})
	.get('/token/:id', userM.auth, csrfM.make, discM.owns, (req, res) => {
		// Display the token for this bot
		res.render('token.pug', {
			csrf: req.csrf,
			bot: res.locals.bot,
			title: 'Token'
		});
	})
	.post('/token/:id', userM.auth, csrfM.check, discM.owns, (req, res) => {
		// Replace the token for this bot.
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
					// Go back to the token screen
					res.redirect(`/token/${req.params.id}`);
				}
			});
	})
	.use('/api', apiM) // API
	.use('/auth', authM) // Authentication
	.use('/docs', docsM) // Documentation
	.use('/lang', langM) // Language settings
	.use(express.static(path.join(__dirname, 'static'))) // Pull static files from /src/static
	.use('*', (req, res) => {
		// Give off a 404 if the chain ends here
		res.status(404).render('error.pug', { status: 404, message: 'Not found' });
	})
	.listen(config.get('webserver').port);
