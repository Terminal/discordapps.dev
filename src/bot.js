const r = require('./db');
const userM = require('./user');
const csrfM = require('./csrf');
const crypto = require('crypto');
const config = require('config');
const marked = require('marked');
const express = require('express');
const request = require('request');
const cheerio = require('cheerio');
const client = require('./discord');
const reasons = require('./data/reasons.json');
const asciidoctor = require('asciidoctor.js')();
const themelist = require('./data/themes.json').usable;
const { description } = require('./data/description.json');

const router = express.Router();

/**
 * Remove dangerous tags from rendered HTML sent to the client
 * @param {string} html The dangerous HTML
 * @returns {string} The "safe" HTML
 */
const clean = (html) => {
	const $ = cheerio.load(html);
	$('*').each((i, element) => {
		Object.keys(element.attribs)
			.filter(attribute => attribute.startsWith('on'))
			.forEach((attribute) => {
				$(element).removeAttr(attribute);
			});
	});
	$('script').remove();
	return $.html();
};

/**
 * Validate the POST query to check if the bot is valid.
 * @param {*} req Express Request Information
 * @param {*} res Express Result Methods
 * @param {*} next Callback to run next middleware
 */
const validate = (req, res, next) => {
	if (typeof req.body.id !== 'string') {
		res.status(400).render('error', { status: 400, message: 'You provided an invalid ID' });
	} else if (typeof req.body.shortDesc !== 'string') {
		res.status(400).render('error', { status: 400, message: 'You provided an invalid short description' });
	} else if (typeof req.body.prefix !== 'string') {
		res.status(400).render('error', { status: 400, message: 'You provided an invalid prefix' });
	} else if (typeof req.body.type !== 'string') {
		res.status(400).render('error', { status: 400, message: 'You provided an invalid type' });
	} else if (!description.some(type => req.body.type === type)) {
		res.status(400).render('error', { status: 400, message: 'You provided an incorrect type' });
	} else if (typeof req.body.longDesc !== 'string') {
		res.status(400).render('error', { status: 400, message: 'You provided an invalid long description' });
	} else if (typeof req.body.count !== 'string') {
		res.status(400).render('error', { status: 400, message: 'You provided an invalid guild count' });
	} else if (typeof req.body.theme !== 'string') {
		res.status(400).render('error', { status: 400, message: 'You provided an invalid theme ID' });
	} else if (!themelist.some(theme => req.body.theme === theme)) {
		res.status(400).render('error', { status: 400, message: 'You provided an incorrect theme' });
	} else if (req.body.id.length > 70) {
		res.status(400).render('error', { status: 400, message: 'You provided a bot id that was too long (70)' });
	} else if (req.body.shortDesc.length > 200) {
		res.status(400).render('error', { status: 400, message: 'You provided a short description that was too long (200)' });
	} else if (req.body.prefix.length > 50) {
		res.status(400).render('error', { status: 400, message: 'You provided a prefix that was too long (50)' });
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
	} else if (req.body.owners.split(' ').length > 5) {
		res.status(400).render('error', { status: 400, message: 'You provided too many additional owners. (Maximum: 5)' });
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

/**
 * Check if a user owns a bot, or is an admin
 * @param {*} req Express Request Information
 * @param {*} res Express Result Methods
 * @param {*} next Callback to run next middleware
 */
const owns = async (req, res, next) => {
	const result = await r.table('bots')
		.get(req.params.id || req.body.id)
		.run();

	if (!result) {
		res.status(404).render('error', { status: 404, message: 'Bot not found' });
	} else if (result.owner.includes(req.user.id) || req.user.admin) {
		res.locals.bot = result;
		next();
	} else {
		res.status(400).render('error', { status: 400, message: 'You are not allowed to edit other\'s bots' });
	}
};

router.get('/add', userM.auth, csrfM.make, (req, res) => {
	// Display the add screen
	res.render('add.pug', {
		themes: themelist
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
				prefix: req.body.prefix,
				type: req.body.type,
				longDesc: req.body.longDesc,
				owner: [req.user.id, ...req.body.owners.split(' ')],
				approved: false,
				theme: req.body.theme,
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
			client.createMessage(config.get('discord').channel, `${req.user.username} added \`${req.body.name}\` <@${req.body.id}>`);
		}
	})
	.get('/:id', csrfM.make, async (req, res) => {
		// Check if the count is empty
		const exists = await r.table('bots')
			.get(req.params.id)
			.run();

		if (exists) {
			const botinfo = await r.table('bots')
				.get(req.params.id)
				.without('token')
				.merge(bot => ({
					ownerinfo: bot('owner').map(id => r.table('users').get(id)).default({ username: 'Unknown', discriminator: '0000' })
				}))
				.run();
			let render = '';
			if (req.user && (botinfo.owner.includes(req.user.id) || req.user.admin)) {
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
			if (botinfo.theme) res.theme(botinfo.theme);
			res.render('botpage', {
				botinfo,
				render
			});
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
			bot: res.locals.bot,
			themes: themelist
		});
	})
	.post('/:id/edit', userM.auth, csrfM.check, owns, validate, async (req, res) => {
		// Edit only the bits that need to be edited
		const response = await r.table('bots')
			.get(req.params.id)
			.update({
				name: req.body.name,
				avatar: req.body.avatar,
				invite: req.body.invite,
				count: parseInt(req.body.count, 10),
				shortDesc: req.body.shortDesc,
				prefix: req.body.prefix,
				type: req.body.type,
				theme: req.body.theme,
				longDesc: req.body.longDesc
			})
			.run();

		// Redirect to the bot page
		res.redirect(`/bot/${req.params.id}`);

		// Post info if it's changed
		if (!response.unchanged) {
			if (req.user.id === res.locals.bot.owner) {
				client.createMessage(config.get('discord').channel, `${req.user.username} edited \`${res.locals.bot.name}\` <@${res.locals.bot.id}>`);
			} else {
				client.createMessage(config.get('discord').channel, `<@${req.user.id}> edited \`${res.locals.bot.name}\` <@${res.locals.bot.id}> by <@${res.locals.bot.owner}>`);
			}
		}
	})
	.get('/:id/delete', userM.auth, csrfM.make, owns, (req, res) => {
		// View a page before deleting the bot
		res.render('delete');
	})
	.get('/:id/delete', userM.auth, csrfM.make, owns, (req, res) => {
		// View a page before deleting the bot
		res.render('delete.pug', {
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
		client.createMessage(config.get('discord').channel, `<@${req.user.id}> deleted \`${res.locals.bot.name}\` <@${res.locals.bot.id}> by <@${res.locals.bot.owner}>`);
	})
	.get('/:id/token', userM.auth, csrfM.make, owns, (req, res) => {
		// Display the token for this bot
		res.render('token.pug', {
			bot: res.locals.bot
		});
	})
	.post('/:id/token', userM.auth, csrfM.check, owns, async (req, res) => {
		// Generate a new token
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
		// Get the previous URL
		const previous = req.header('Referer') || '/';

		// Find the bot and set the approved flag to true.
		const result = await r.table('bots')
			.get(req.params.id)
			.update({
				approved: true
			}, {
				returnChanges: true
			})
			.run();
		const member = client.guilds.get(config.get('discord').guild).members.get(req.params.id);
		// console.log(member);

		// Return a specific page
		if (res.skipped) {
			// The bot was not found
			res.status(404).render('error', { status: 404, message: 'Bot Not found' });
		} else if (!result.changes) {
			// There was no changes, so go back
			res.redirect(previous);
		} else if (member) {
			// There was a change, and the member was found
			member.removeRole(config.get('terminal').unverified);
			res.redirect(previous);
		} else {
			// There was a change, but the member was not found
			res.status(202).render('error', { status: 202, message: 'The bot has been approved, but the website could not find the member.' });
		}

		// Send a message to the Discord channel
		client.createMessage(config.get('discord').channel, `<@${req.user.id}> approved \`${result.changes[0].old_val.name}\` <@${result.changes[0].old_val.id}> by <@${result.changes[0].old_val.owner}>`);
	})
	.get('/:id/remove', userM.auth, csrfM.make, userM.admin, async (req, res) => {
		res.render('remove', {
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
			client.createMessage(config.get('discord').channel, `<@${req.user.id}> deleted \`${user.name}\` <@${user.id}> by <@${user.owner}> for: \`${res.__(`remove_${reasons.remove[req.body.reason]}`)}\` (${req.body.reason})\n${req.body.description}`);
		} else {
			res.status(400).render('error', { status: 400, message: 'Invalid reason' });
		}
	});

module.exports = router;
