const config = require('config');
const cons = require('consolidate');
const mustache = require('mustache');
const marked = require('marked');
const express = require('express');
const path = require('path');
const r = require('./db');
const apiRouter = require('./api');

const app = express();

app.set('views', path.join(__dirname, 'html'))
	.engine('html', cons.mustache)
	.set('view engine', 'html')
	.get('/', (req, res) => {
		r.table('bots')
			.run(r.conn, (err1, cursor) => {
				if (err1) {
					res.status(500).render('error.html', { code: 500, message: err1.message });
				} else {
					cursor.toArray((err2, result) => {
						if (err2) {
							res.status(500).render('error.html', { code: 500, message: err2.message });
						} else {
							const bots = result.map((bot) => {
								const render = bot;
								if (render.long.type === 'iframe') {
									bot.html = mustache.render('<iframe class="botiframe" src="{{ iframe }}"></iframe>', { iframe: render.long.value });
								} else if (render.long.type === 'markdown') {
									bot.html = mustache.render('<div class="botdesc">{{{ content }}}</div>', { content: marked(render.long.value) });
								}
								return render;
							});
							res.status(200).render('index.html', { bots });
						}
					});
				}
			});
	})
	.use('/api', apiRouter)
	.use(express.static(path.join(__dirname, 'html')))
	.use('*', (req, res) => {
		res.status(404).render('error.html', { code: 404, message: 'Not found' });
	})
	.listen(config.get('webserver').port);
