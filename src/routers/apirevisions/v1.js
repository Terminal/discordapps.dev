/**
 * MIT License
 *
 * Copyright (C) 2015 - 2018 Moustacheminer Server Services
 * Copyright (C) 2017 - 2018 ls.terminal.ink
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in all
 * copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
 * SOFTWARE.
 */

const express = require('express');
const authMiddleware = require('./auth');
const r = require('./../../db');
const request = require('request');
const pug = require('pug');
const { spawn } = require('child_process');
const path = require('path');
const marked = require('marked');
const fs = require('fs');

const router = express.Router();

/**
 * Check if a bot exists
 * @param {*} req Express Request Information
 * @param {*} res Express Result Methods
 * @param {*} next Callback to run next middleware
 */
const exists = async (req, res, next) => {
	const bot = await r.table('bots')
		.get(req.params.id)
		.run();

	if (bot) {
		next();
	} else {
		res.status(404).json({});
	}
};

const GetRating = (positiveVotes, negativeVotes) => {
	const totalVotes = positiveVotes + negativeVotes;
	const average = positiveVotes / totalVotes;
	const score = average - ((average - 0.5) * (2 ** -Math.log2(totalVotes + 1)));

	return score * 100;
};

router.get('/bots', async (req, res) => {
	const result = await r.table('bots')
		.without('token')
		.merge(bot => ({
			// Get individual votes for the bot
			votes: r.db('terminal').table('votes')
				.filter({
					botid: bot('id')
				})
				.map(vote => vote('vote'))
				.coerceTo('array')
		}))
		.merge(bot => ({
			// Count upvotes and downvotes
			upvotes: bot('votes').filter(number => number.eq(1)).count(),
			downvotes: bot('votes').filter(number => number.eq(-1)).count()
		}));

	result.map((bot) => {
		bot.rating = GetRating(bot.upvotes, bot.downvotes);
		return bot;
	});
	res.send(result);
})
	.get('/bots/:id', exists, async (req, res) => {
		const result = await r.table('bots')
			.get(req.params.id)
			.without('token')
			.merge(bot => ({
				// Get individual votes for the bot
				votes: r.db('terminal').table('votes')
					.filter({
						botid: bot('id')
					})
					.map(vote => vote('vote'))
					.coerceTo('array')
			}))
			.merge(bot => ({
				// Count upvotes and downvotes
				upvotes: bot('votes').filter(number => number.eq(1)).count(),
				downvotes: bot('votes').filter(number => number.eq(-1)).count()
			}))
			.run();

		result.rating = GetRating(result.upvotes, result.downvotes);
		res.json(result);
	})
	.post('/bots/:id', exists, authMiddleware, async (req, res) => {
		const count = parseInt(req.body.count || req.body.server_count, 10);
		if (typeof count !== 'string' && typeof count !== 'number') {
			res.status(400).json({ error: 'You provided an invalid guild count' });
		} else if (count < 0) {
			res.status(400).json({ error: 'Your bot count was too low (0)' });
		} else if (count > 1000000) {
			res.status(400).json({ error: 'Your bot count was too high (1000000)' });
		} else if (isNaN(count)) {
			res.status(400).json({ error: 'The value of your count was NaN' });
		} else {
			await r.table('bots')
				.get(req.params.id)
				.update({ count })
				.run();
			res.json({ message: 'OK' });
		}
	})
	.get('/bots/:id/embed*', exists, async (req, res) => {
		const bot = await r.table('bots')
			.get(req.params.id)
			.default({})
			.without('token')
			.merge(info => ({
				ownerinfo: r.table('users').get(info('owner'))
			}))
			.run();
		request({ uri: bot.avatar, encoding: 'binary' }, (err, response, body) => {
			let avatar = '';
			const scale = parseInt(req.query && req.query.scale, 10) <= 1000 ? parseInt(req.query && req.query.scale, 10) : 200;
			const font = ((req.query && req.query.font) || '').replace(/[\\/]/g, '');
			if (response.statusCode === 200) {
				const type = response.headers['content-type'];
				const base64 = new Buffer(body, 'binary').toString('base64');
				avatar = `data:${type};base64,${base64}`;
			}
			if (req.query && req.query.locale) res.locals.setLocale(req.query.locale);
			const svg = pug.renderFile(path.join(__dirname, 'v1', 'embed.pug'), {
				bot,
				avatar,
				font,
				query: req.query,
				__: res.locals.__
			});
			if (req.query.type === 'png') {
				const magick = spawn('convert', ['-background', 'none', '-font', `"${font}"` || '"Noto-Sans"', '-density', scale, 'svg:-', 'png:-']);
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
	})
	.use('/test/:id', exists, authMiddleware, (req, res) => {
		res.json({ message: 'OK' });
	})
	.get('/doc/', (req, res) => fs.readFile(path.join(__dirname, '..', 'markdown', 'index.md'), 'utf8', (err, data) => res.send(marked(data))))
	.get('/doc/:page', (req, res) => {
		// Try to find the markdown page
		if (fs.existsSync(path.join(__dirname, '..', 'markdown', `${req.params.page}.md`))) {
			// Render the specific page
			fs.readFile(path.join(__dirname, '..', 'markdown', `${req.params.page}.md`), 'utf8', (err, data) => res.send(marked(data)));
		} else {
			res.status(404).json({ error: 'The page was not found' });
		}
	})
	.use('*', (req, res) => {
		res.status(404).json({ error: 'This API method has not been defined.' });
	});

module.exports = router;
