const bodyParser = require('body-parser');
const config = require('config');
const cons = require('consolidate');
const express = require('express');
const session = require('express-session');
const mustache = require('mustache');
const marked = require('marked');
const path = require('path');
const r = require('./db');
const apiRouter = require('./api');
const authRouter = require('./auth');
const csrfRouter = require('./csrf');
const discordRouter = require('./discord');
const auth = require('./auth/auth');

const app = express();

app.set('views', path.join(__dirname, 'html'))
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
	.get('/', (req, res) => {
		const approved = req.query.approved !== 'false';
		r.table('bots')
			.run(r.conn, (err1, cursor) => {
				if (err1) {
					res.status(500).render('error.html', { user: req.user, code: 500, message: err1.message });
				} else {
					cursor.toArray((err2, result) => {
						if (err2) {
							res.status(500).render('error.html', { user: req.user, code: 500, message: err2.message });
						} else {
							const bots = result.filter(bot => bot.approved === approved).map((bot) => {
								const render = bot;
								if (render.type === 'iframe') {
									bot.html = mustache.render('<iframe class="botiframe" src="{{ iframe }}"></iframe>', { iframe: render.longDesc });
								} else if (render.type === 'markdown') {
									bot.html = mustache.render('<div class="botdesc">{{{ content }}}</div>', { content: marked(render.longDesc) });
								} else {
									bot.html = '<div class="botdesc"><h1>Invalid Bot render type</h1></div>';
								}
								return render;
							});
							const json = JSON.stringify(bots);

							res.status(200).render('index.html', { user: req.user, bots, json });
						}
					});
				}
			});
	})
	.get('/add', auth.checkIfLoggedIn, discordRouter.check, csrfRouter.make, (req, res) => {
		res.status(200).render('add.html', { user: req.user, csrf: req.csrf });
	})
	.post('/add', auth.checkIfLoggedIn, discordRouter.check, csrfRouter.check, (req, res) => {
		if (typeof req.body.id !== 'string'
			|| typeof req.body.shortDesc !== 'string'
			|| typeof req.body.type !== 'string'
			|| typeof req.body.longDesc !== 'string'
			|| (req.body.type !== 'iframe' && req.body.type !== 'markdown') // If it's an invalid description type
			|| req.body.id.length > 70 // If the ID is too long
			|| req.body.shortDesc.length > 200 // If the short description is too long
			|| (req.body.type === 'iframe' && req.body.longDesc.length > 200)
			|| (req.body.type === 'markdown' && req.body.longDesc.length > 20000)
			|| (req.body.type === 'iframe' && !/^https?:\/\//.test(req.body.longDesc))
			|| /\D/.test(req.body.id)) {
			res.status(400).render('error.html', { status: 400, message: 'Invalid input' });
			console.dir(req.body);
		} else {
			r.table('bots')
				.insert({
					approved: false,
					id: req.body.id,
					shortDesc: req.body.shortDesc,
					type: req.body.type,
					longDesc: req.body.longDesc
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
	.use(express.static(path.join(__dirname, 'html')))
	.use('*', (req, res) => {
		res.status(404).render('error.html', { status: 404, message: 'Not found' });
	})
	.listen(config.get('webserver').port);
