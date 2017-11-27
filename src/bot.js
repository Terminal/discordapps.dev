const express = require('express');
const userM = require('./user');
const csrfM = require('./csrf');
const r = require('./db');
const bot = require('./discord');
const marked = require('marked');
const asciidoctor = require('asciidoctor.js')();
const crypto = require('crypto');
const reasons = require('./data/reasons.json');
const { on } = require('./data/on.json');
const config = require('config');
const request = require('request');
const cheerio = require('cheerio');

const router = express.Router();

const clean = (html) => {
	const $ = cheerio.load(html);
	on.forEach(event => $('*').removeAttr(event));
	$('script').remove();
	return $.html();
};

const validate = (req, res, next) => {
	if (typeof req.body.id !== 'string') {
		res.status(400).render('error', { status: 400, message: 'You provided an invalid ID' });
	} else if (typeof req.body.shortDesc !== 'string') {
		res.status(400).render('error', { status: 400, message: 'You provided an invalid short description' });
	} else if (typeof req.body.type !== 'string') {
		res.status(400).render('error', { status: 400, message: 'You provided an invalid type' });
	} else if (!config.get('terminal').description.some(type => req.body.type === type)) {
		res.status(400).render('error', { status: 400, message: 'You provided an incorrect type' });
	} else if (typeof req.body.longDesc !== 'string') {
		res.status(400).render('error', { status: 400, message: 'You provided an invalid long description' });
	} else if (typeof req.body.count !== 'string') {
		res.status(400).render('error', { status: 400, message: 'You provided an invalid guild count' });
	} else if (req.body.id.length > 70) {
		res.status(400).render('error', { status: 400, message: 'You provided a bot id that was too long (70)' });
	} else if (req.body.shortDesc.length > 200) {
		res.status(400).render('error', { status: 400, message: 'You provided a short description that was too long (200)' });
	} else if (req.body.avatar.length > 2000) {
		res.status(400).render('error', { status: 400, message: 'You provided an avatar that was too long (2000)' });
	} else if (/\D/.test(req.body.count)) {
		res.status(400).render('error', { status: 400, message: 'Your bot count had values other than digits' });
	} else if (parseInt(req.body.count, 10) < 0) {
		res.status(400).render('error', { status: 400, message: 'Your bot count was too low (0)' });
	} else if (parseInt(req.body.count, 10) > 1000000) {
		res.status(400).render('error', { status: 400, message: 'Your bot count was too high (1000000)' });
	} else if (req.body.type === 'iframe' && !/^https:\/\//.test(req.body.longDesc)) {
		res.status(400).render('error', { status: 400, message: 'Your iframe based long description must use HTTPS' });
	} else if (req.body.type === 'iframe' && req.body.longDesc > 2000) {
		res.status(400).render('error', { status: 400, message: 'You provided an iframe based long description that was too long (2000)' });
	} else if (req.body.type === 'markdown' && req.body.longDesc > 20000) {
		res.status(400).render('error', { status: 400, message: 'You provided a markdown based long description that was too long (20000)' });
	} else if (req.body.type === 'asciidoctor' && req.body.longDesc > 20000) {
		res.status(400).render('error', { status: 400, message: 'You provided an AsciiDoctor based long description that was too long (20000)' });
	} else if (req.body.type === 'html' && req.body.longDesc > 200000) {
		res.status(400).render('error', { status: 400, message: 'You provided a HTML based long description that was too long (200000)' });
	} else if (/\D/.test(req.body.id)) {
		res.status(400).render('error', { status: 400, message: 'Your bot ID had values other than digits' });
	} else {
		if (!req.body.invite) { // If there is no invite, make one up using the ID.
			req.body.invite = `https://discordapp.com/oauth2/authorize?client_id=${req.body.id}&scope=bot&permissions=0`;
		}

		if (typeof req.body.invite !== 'string') {
			res.status(400).render('error', { status: 400, message: 'You provided an invalid invite' });
		} else if (req.body.invite.length > 2000) {
			res.status(400).render('error', { status: 400, message: 'You provided an invite that was too long (2000)' });
		} else if (!/^https?:\/\//.test(req.body.invite)) {
			res.status(400).render('error', { status: 400, message: 'Your invite must use HTTP or HTTPS' });
		} else {
			request({
				uri: `https://discordapp.com/api/v6/users/${req.body.id}`,
				method: 'GET',
				headers: {
					'User-Agent': config.get('useragent'),
					Authorization: `Bot ${config.get('discord').token}`
				},
				json: true
			}, (err, response, body) => {
				if (!req.body.avatar && body.avatar) {
					req.body.avatar = `https://cdn.discordapp.com/avatars/${body.id}/${body.avatar}`;
				}

				if (!req.body.name) {
					req.body.name = body.username;
				}

				if (response.statusCode === 404) {
					res.status(404).render('error', { status: 404, message: 'Discord could not find your bot.' });
				} else if (body.code) {
					res.status(500).render('error', { status: 500, message: `Discord returned error ${response.statusCode}: ${body.code} - ${body.message}` });
				} else if (!body.bot) {
					res.status(400).render('error', { status: 400, message: 'Userbots are not allowed' });
				} else if (typeof req.body.avatar !== 'string') {
					res.status(400).render('error', { status: 400, message: 'You provided an invalid avatar' });
				} else if (!/^https:\/\//.test(req.body.avatar) && req.body.avatar) {
					res.status(400).render('error', { status: 400, message: 'Your avatar must use HTTPS' });
				} else if (typeof req.body.name !== 'string') {
					res.status(400).render('error', { status: 400, message: 'You provided an invalid name' });
				} else if (req.body.name.length > 32) {
					res.status(400).render('error', { status: 400, message: 'You provided a name that was too long (32)' });
				} else {
					next();
				}
			});
		}
	}
};

const owns = async (req, res, next) => {
	const result = await r.table('bots')
		.get(req.params.id || req.body.id)
		.run();

	if (!result) {
		res.status(404).render('error', { status: 404, message: 'Bot not found' });
	} else if (req.user.id === result.owner || req.user.admin) {
		res.locals.bot = result;
		next();
	} else {
		res.status(400).render('error', { status: 400, message: 'You are not allowed to edit other\'s bots' });
	}
};

router.get('/add', userM.auth, csrfM.make, (req, res) => {
	// Display the add screen
	res.render('add.pug', {
		csrf: req.csrf
	});
})
	.post('/add', userM.auth, csrfM.check, validate, async (req, res) => {
		// Insert specific elements into the database.
		// Input validated by Discord Middleware
		const response = await r.table('bots')
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
			.run();

		if (response.errors) {
			res.status(409).render('error', {
				status: 409,
				message: res.__('error_duplicate_bot')
			});
		} else {
			res.render('error', {
				status: 200,
				message: res.__('message_bot_inserted')
			});
			// Send message to Discord Channel
			bot.channel.createMessage(`${req.user.username} added \`${req.body.name}\` <@${req.body.id}>`);
		}
	})
	.get('/:id', csrfM.make, async (req, res) => {
		// Check if the count is empty
		const exists = await r.table('bots')
			.get(req.params.id)
			.run();

		if (exists) {
			if (req.headers['user-agent'] && req.headers['user-agent'].toLowerCase().includes('discord')) {
				res.redirect(`/api/v1/bots/${req.params.id}/embed?type=png`)
			} else {
				const botinfo = await r.table('bots')
					.get(req.params.id)
					.without('token')
					.merge(info => ({
						ownerinfo: r.table('users').get(info('owner'))
					}))
					.run();
				let render = '';
				if ((req.user && req.user.id) === botinfo.owner || (req.user && req.user.admin)) {
					botinfo.editable = true;
				}
				if (botinfo.longDesc) {
					if (botinfo.type === 'asciidoc') {
						render = clean(asciidoctor.convert(botinfo.longDesc));
					} else if (botinfo.type === 'markdown') {
						render = clean(marked(botinfo.longDesc));
					} else if (botinfo.type === 'html') {
						render = clean(botinfo.longDesc);
					}
				}
				res.render('botpage', {
					botinfo,
					csrf: req.csrf,
					render
				});
			}
		} else {
			res.status(404).render('error', {
				csrf: res.csrf,
				status: 404,
				message: res.__('error_bot_not_found')
			});
		}
	})
	.get('/:id/edit', userM.auth, csrfM.make, owns, (req, res) => {
		// Display the edit screen with the bot's items
		res.render('edit.pug', {
			csrf: req.csrf,
			bot: res.locals.bot
		});
	})
	.post('/:id/edit', userM.auth, csrfM.check, owns, validate, async (req, res) => {
		// Edit only the bits that need to be edited
		const response = await r.table('bots')
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
			.run();

		if (response.unchanged) {
			res.render('error', {
				status: 200,
				message: res.__('message_bot_unchanged')
			});
		} else {
			res.render('error', {
				status: 200,
				message: res.__('message_bot_changed')
			});
			if (req.user.id === res.locals.bot.owner) {
				bot.channel.createMessage(`${req.user.username} edited \`${res.locals.bot.name}\` <@${res.locals.bot.id}>`);
			} else {
				bot.channel.createMessage(`<@${req.user.id}> edited \`${res.locals.bot.name}\` <@${res.locals.bot.id}> by <@${res.locals.bot.owner}>`);
			}
		}
	})
	.get('/:id/delete', userM.auth, csrfM.make, owns, (req, res) => {
		// View a page before deleting the bot
		res.render('delete', {
			csrf: req.csrf
		});
	})
	.get('/:id/delete', userM.auth, csrfM.make, owns, (req, res) => {
		// View a page before deleting the bot
		res.render('delete.pug', {
			csrf: req.csrf,
			title: 'Delete Bot'
		});
	})
	.post('/:id/delete', userM.auth, csrfM.check, owns, (req, res) => {
		// Delete the bot
		r.table('bots')
			.get(req.params.id)
			.delete()
			.run();

		res.redirect('/');
		bot.channel.createMessage(`<@${req.user.id}> deleted \`${res.locals.bot.name}\` <@${res.locals.bot.id}> by <@${res.locals.bot.owner}>`);
	})
	.get('/:id/token', userM.auth, csrfM.make, owns, (req, res) => {
		// Display the token for this bot
		res.render('token.pug', {
			csrf: req.csrf,
			bot: res.locals.bot
		});
	})
	.get('/:id/iframe', async (req, res) => {
		const result = await r.table('bots')
			.get(req.params.id)
			.run();

		if (result && result.type === 'html') {
			res.send(result.longDesc);
		} else {
			res.status(404).render('error', {
				status: 404,
				message: res.__('error_bot_html_not_found')
			});
		}
	})
	.post('/:id/token', userM.auth, csrfM.check, owns, async (req, res) => {
		await r.table('bots')
			.get(req.params.id)
			.update({
				token: crypto.randomBytes(64).toString('hex')
			}, {
				returnChanges: true
			})
			.run();
		res.redirect(req.originalUrl);
	})
	.post('/:id/approve', userM.auth, csrfM.check, userM.admin, async (req, res) => {
		const previous = req.header('Referer') || '/';
		const result = await r.table('bots')
			.get(req.params.id)
			.update({
				approved: true
			}, {
				returnChanges: true
			});
		const member = bot.guild.members.get(result.changes[0].old_val.id);
		if (member) {
			if (res.skipped) {
				res.status(404).render('error', { status: 404, message: 'Bot Not found' });
			} else if (!result.changes) {
				res.redirect(previous);
			} else {
				member.removeRole(config.get('terminal').unverified);
				res.redirect(previous);
			}
		} else {
			res.status(202).render('error', { status: 202, message: 'The bot has been approved, but is not within the guild. Please manually invite the bot.' });
		}
		bot.channel.createMessage(`<@${req.user.id}> approved \`${result.changes[0].old_val.name}\` <@${result.changes[0].old_val.id}> by <@${result.changes[0].old_val.owner}>`);
	})
	.get('/:id/remove', userM.auth, csrfM.make, userM.admin, async (req, res) => {
		res.render('remove', {
			csrf: req.csrf,
			reasons: reasons.remove
		});
	})
	.post('/:id/remove', userM.auth, csrfM.check, userM.admin, async (req, res) => {
		const user = await r.table('bots')
			.get(req.params.id)
			.run();

		if (!user) {
			res.status(404).render('error', { status: 404, message: 'Bot Not found' });
		} else if (typeof req.body.reason !== 'string' || typeof req.body.description !== 'string' || req.body.description.length > 1000) {
			res.status(400).render('error', { status: 400, message: 'The reason or description was invalid' });
		} if (reasons.remove[req.body.reason]) {
			r.table('bots')
				.get(req.params.id)
				.delete()
				.run();
			res.redirect('/');
			bot.channel.createMessage(`<@${req.user.id}> deleted \`${user.name}\` <@${user.id}> by <@${user.owner}> for: \`${res.__(`remove_${reasons.remove[req.body.reason]}`)}\` (${req.body.reason})\n${req.body.description}`);
		} else {
			res.status(400).render('error', { status: 400, message: 'Invalid reason' });
		}
	});

module.exports = router;
