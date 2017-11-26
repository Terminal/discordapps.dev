/**

MIT License

Copyright (c) 2018 Moustacheminer Server Services

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.

*/

const express = require('express');
const authMiddleware = require('./auth');
const r = require('./../db');
const request = require('request');
const pug = require('pug');
const { spawn } = require('child_process');
const path = require('path');

const router = express.Router();

router.get('/bots', async (req, res) => {
	const result = await r.table('bots')
		.without('token')
		.run();
	res.send(result);
})
	.get('/bots/:id', async (req, res) => {
		const result = await r.table('bots')
			.get(req.params.id)
			.without('token');

		if (!result) {
			res.status(404).json({});
		} else {
			res.json(result);
		}
	})
	.post('/bots/:id', authMiddleware, async (req, res) => {
		const count = parseInt(req.body.count || req.body.server_count, 10);
		if (typeof count !== 'string' && typeof count !== 'number') {
			res.status(400).json({ error: 'You provided an invalid guild count' });
		} else if (count < 0) {
			res.status(400).json({ error: 'Your bot count was too low (0)' });
		} else if (count > 1000000) {
			res.status(400).json({ error: 'Your bot count was too high (1000000)' });
		} else {
			await r.table('bots')
				.get(req.params.id)
				.update({ count })
				.run();
			res.json({ message: 'OK' });
		}
	})
	.get('/bots/:id/embed*', async (req, res) => {
		if (req.query && req.query.locale) res.locals.setLocale(req.query.locale);
		const bot = await r.table('bots')
			.get(req.params.id)
			.without('token')
			.merge(info => ({
				ownerinfo: r.table('users').get(info('owner'))
			}));

		if (!bot) {
			res.status(404).json({});
		} else {
			request({ uri: bot.avatar, encoding: 'binary' }, (err, response, body) => {
				let avatar = '';
				const scale = parseInt(req.query && req.query.scale, 10) || 200;
				if (response.statusCode === 200) {
					const type = response.headers['content-type'];
					const base64 = new Buffer(body, 'binary').toString('base64');
					avatar = `data:${type};base64,${base64}`;
				}
				const svg = pug.renderFile(path.join(__dirname, 'v1', 'embed.pug'), { bot, avatar, query: req.query, __: res.locals.__ });
				if (req.query.type === 'png') {
					const magick = spawn('convert', ['-density', scale, 'svg:-', 'png:-']);
					magick.stdin.write(svg);
					magick.stdin.end();
					res.set('Content-Type', 'image/png');

					magick.stdout.on('data', (data) => {
						res.write(data);
					});

					magick.stdout.on('close', () => {
						res.end();
					});
				} else {
					res.set('Content-Type', 'image/svg+xml');
					res.send(svg);
				}
			});
		}
	})
	.use('/test/:id', authMiddleware, (req, res) => {
		res.json({ message: 'OK' });
	})
	.use('*', (req, res) => {
		res.json({ error: 'This API method has not been defined.' });
	});

module.exports = router;
