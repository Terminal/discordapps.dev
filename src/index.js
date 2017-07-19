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
		r.table('bots')
			.run(r.conn, (err1, cursor) => {
				if (err1) {
					res.status(500).render('error.html', { user: req.user, code: 500, message: err1.message });
				} else {
					cursor.toArray((err2, result) => {
						if (err2) {
							res.status(500).render('error.html', { user: req.user, code: 500, message: err2.message });
						} else {
							const bots = result.filter(bot => bot.approved).map((bot) => {
								const render = bot;
								if (render.long.type === 'iframe') {
									bot.html = mustache.render('<iframe class="botiframe" src="{{ iframe }}"></iframe>', { iframe: render.long.value });
								} else if (render.long.type === 'markdown') {
									bot.html = mustache.render('<div class="botdesc">{{{ content }}}</div>', { content: marked(render.long.value) });
								} else {
									bot.html = '<div class="botdesc"><h1>Invalid Bot render type</h1></div>';
								}
								return render;
							});
							res.status(200).render('index.html', { user: req.user, bots });
						}
					});
				}
			});
	})
	.get('/add', auth.checkIfLoggedIn, discordRouter.check, csrfRouter.make, (req, res) => {
		res.status(200).render('add.html', { user: req.user, csrf: req.csrf });
	})
	.use('/api', apiRouter)
	.use('/auth', authRouter)
	.use(express.static(path.join(__dirname, 'html')))
	.use('*', (req, res) => {
		res.status(404).render('error.html', { status: 404, message: 'Not found' });
	})
	.listen(config.get('webserver').port);
