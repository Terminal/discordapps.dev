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
const { description, categories } = require('./data/types.json');

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
	$('object').remove();
	return $.html();
};

const validate = (req, res, next) => {
	// Details to pass on to the next router to insert into the database
	const details = {};

	// List of failed points
	const failure = [];

	const body = req.body;

	// Check the short description
	if (typeof body.shortDesc !== 'string') {
		failure.push('error_shortdesc_invalid');
	} else if (body.shortDesc.length === 0) {
		failure.push('error_shortdesc_blank');
	} else if (body.shortDesc.length > 200) {
		failure.push('error_shortdesc_length');
	} else if (failure.length === 0) {
		details.shortDesc = body.shortDesc;
	}

	// Check the prefix
	if (typeof body.prefix !== 'string') {
		failure.push('error_prefix_invalid');
	} else if (body.prefix.length === 0) {
		failure.push('error_prefix_blank');
	} else if (req.body.prefix.length > 50) {
		failure.push('error_prefix_length');
	} else if (failure.length === 0) {
		details.prefix = body.prefix;
	}

	// Check the type
	if (typeof body.type !== 'string') {
		failure.push('error_type_invalid');
	} else if (!description.some(type => body.type === type)) {
		failure.push('error_type_invalid');
	} else if (failure.length === 0) {
		details.type = body.type;

		// There is a type, so there should be a long description to go along
		if (typeof body.longDesc !== 'string') {
			failure.push('error_longdesc_invalid');
		} else if (body.longDesc.length === 0) {
			failure.push('error_longdesc_blank');
		} else if (body.type === 'iframe') {
			// Validate the iframe input
			if (body.longDesc.length > 2000) {
				failure.push('error_longdesc_iframe_length');
			} else if (!/^https:\/\//.test(body.longDesc)) {
				failure.push('error_longdesc_iframe_https');
			} else {
				details.longDesc = body.longDesc;
			}
		} else if (body.type === 'markdown') {
			// Validate the markdown input
			if (body.longDesc.length > 20000) {
				failure.push('error_longdesc_markdown_length');
			} else {
				details.longDesc = body.longDesc;
			}
		} else if (body.type === 'asciidoctor') {
			// Validate the ASCIIdoctor input
			if (body.longDesc.length > 20000) {
				failure.push('error_longdesc_asciidoctor_length');
			} else {
				details.longDesc = body.longDesc;
			}
		} else if (body.type === 'html') {
			// Validate the HTML input
			// Dangerous tags are removed when sent to the client
			if (body.longDesc.length > 200000) {
				failure.push('error_longdesc_html_length');
			} else {
				details.longDesc = body.longDesc;
			}
		}
	}

	// Validate the bot counts
	if (typeof body.count !== 'string') {
		failure.push('error_count_invalid');
	} else if (body.count.length === 0) {
		details.count = 0;
	} else if (/\D/.test(body.count)) {
		failure.push('error_count_invalid');
	} else if (parseInt(req.body.count, 10) < 0) {
		failure.push('error_count_low');
	} else if (parseInt(body.count, 10) > 1000000) {
		failure.push('error_count_low');
	} else if (failure.length === 0) {
		details.count = parseInt(body.count, 10);
	}

	// Validate the bot theme
	if (typeof body.theme !== 'string') {
		failure.push('error_theme_invalid');
	} else if (!themelist.some(theme => body.theme === theme)) {
		failure.push('error_theme_invalid');
	} else if (req.body.theme === 'store' && details.type !== 'markdown') {
		failure.push('error_theme_store_markdown');
	} else if (failure.length === 0) {
		details.theme = body.theme;
	}

	// Validate the bot category
	if (typeof body.category !== 'string') {
		failure.push('error_category_invalid');
	} else if (!categories.some(category => body.category === category)) {
		failure.push('error_category_invalid');
	} else if (failure.length === 0) {
		details.category = body.category;
	}

	// Validate the owners
	if (typeof body.owners !== 'string') {
		failure.push('error_owners_invalid');
	} else if (body.owners.length > 200) {
		failure.push('error_owners_length');
	} else if (failure.length === 0) {
		// Remove duplicates, remove original owner
		const owners = [...new Set(body.owners.split(/\D+/g))]
			.filter((owner) => {
				// If the owner is blank, remove it
				if (owner === '') {
					return false;
				}

				// If the bot exists, compare to the bot owner
				if (res.locals.bot && res.locals.bot.owner) {
					return owner !== res.locals.bot.owner;
				}

				// If the bot doesn't exist, compare to the logged in user
				// Should work for adding new bots
				return owner !== req.user.id;
			});

		console.dir(owners);

		if (owners.length > 5) {
			failure.push('error_owners_max');
		} else if (owners.some(owner => owner.length > 25)) {
			failure.push('error_owner_length');
		} else {
			details.owners = owners;
		}
	}

	// Validate the ID.
	// If it's valid, contact Discord
	if (typeof body.id !== 'string') {
		failure.push('error_id_invalid');
	} else if (body.id.length === 0) {
		failure.push('error_id_blank');
	} else if (body.id.length > 25) {
		failure.push('error_id_length');
	} else if (/\D/.test(body.id)) {
		failure.push('error_id_invalid');
	} else {
		details.id = body.id;
	}

	if (failure.length === 0) {
		request({
			uri: `https://discordapp.com/api/v6/users/${body.id}`,
			method: 'GET',
			headers: {
				'User-Agent': config.get('useragent'),
				Authorization: `Bot ${config.get('discord').token}`
			},
			json: true
		}, (err, response, discordResponse) => {
			if (response.statusCode === 404) {
				failure.push('error_discord_not_found');
			} else if (body.code) {
				failure.push('error_discord_error');
				console.dir(discordResponse);
			}

			if (failure.length === 0) {
				// Validate the invite
				if (typeof body.invite !== 'string') {
					failure.push('error_invite_invalid');
				} else if (body.invite.length === 0) {
					details.invite = `https://discordapp.com/oauth2/authorize?client_id=${req.body.id}&scope=bot&permissions=0`;
				} else if (body.invite.length > 2000) {
					failure.push('error_invite_length');
				} else if (!/^https?:\/\//.test(body.invite)) {
					failure.push('error_invite_http');
				} else if (failure.length === 0) {
					details.invite = body.invite;
				}

				// Validate the avatar
				if (typeof body.avatar !== 'string') {
					failure.push('error_avatar_invalid');
				} else if (body.avatar.length === 0) {
					details.avatar = `https://cdn.discordapp.com/avatars/${discordResponse.id}/${discordResponse.avatar}`;
				} else if (body.avatar.length > 2000) {
					failure.push('error_avatar_length');
				} else if (!/^https:\/\//.test(body.avatar)) {
					failure.push('error_avatar_https');
				} else if (failure.length === 0) {
					details.avatar = body.avatar;
				}

				// Validate the name
				if (typeof body.name !== 'string') {
					failure.push('error_name_invalid');
				} else if (body.name.length === 0) {
					details.name = discordResponse.username;
				} else if (body.name.length > 32) {
					failure.push('error_name_length');
				} else {
					details.name = body.name;
				}

				// Check if the user is a bot or not
				if (!discordResponse.bot) {
					failure.push('error_discord_userbot');
				}

				if (failure.length === 0) {
					// No errors was found
					res.locals.details = details;
					next();
				} else {
					// Error page where Discord has been contacted, and there is user error
					res.render('error', {
						message: failure.map(reason => res.__(reason)).join('\n')
					});
				}
			} else {
				// Error page where Discord has been contacted, but returned an error
				res.render('error', {
					message: failure.map(reason => res.__(reason)).join('\n')
				});
			}
		});
	} else {
		// Error page where Discord has not been contacted, and there is user error
		res.render('error', {
			message: failure.map(reason => res.__(reason)).join('\n')
		});
	}
};

/**
 * Check if a user matches a certain permission level
 * @param {number} level The level at which to check at
 * @returns {Function} The middleware
 */
const owns = level =>
	async (req, res, next) => {
		const result = await r.table('bots')
			.get(req.params.id || req.body.id)
			.run();

		if (!result) {
			res.status(404).render('error', { status: 404, message: 'Bot not found' });
		} else if ((level <= 3 && req.user.admin) || (level <= 2 && result.owner === req.user.id) || (level <= 1 && result.owners.includes(req.user.id))) {
			res.locals.bot = result;
			next();
		} else {
			res.status(400).render('error', { status: 400, message: 'You are not allowed to edit other\'s bots' });
		}
	};


router.get('/add', userM.auth, csrfM.make, (req, res) => {
	// Display the add screen
	res.render('add.pug', {
		themes: themelist,
		categories
	});
})
	.post('/add', userM.auth, csrfM.check, validate, async (req, res) => {
		// Insert specific elements into the database.
		// Input validated by Discord Middleware
		// const response = await r.table('bots')
		// 	.insert({
		// 		id: req.body.id,
		// 		name: req.body.name,
		// 		avatar: req.body.avatar,
		// 		invite: req.body.invite,
		// 		count: parseInt(req.body.count, 10),
		// 		shortDesc: req.body.shortDesc,
		// 		prefix: req.body.prefix,
		// 		type: req.body.type,
		// 		longDesc: req.body.longDesc,
		// 		owner: [req.user.id, ...req.body.owners.split(' ')],
		// 		approved: false,
		// 		theme: req.body.theme,
		// 		timestamp: Date.now()
		// 	})
		// 	.run();

		const response = await r.table('bots')
			.insert(Object.assign(res.locals.details, {
				owner: req.user.id,
				token: crypto.randomBytes(64).toString('hex'),
				timestamp: Date.now(),
				approved: false
			}));

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
			client.createMessage(config.get('discord').channel, `${req.user.username} added \`${res.locals.details.name}\` <@${req.body.id}>`);
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
					ownerinfo: bot('owners')
						.default([])
						.append(bot('owner'))
						.map(id => r.table('users').get(id))
						.default({ username: 'Unknown', discriminator: '0000' }),
					owners: bot('owners').default([]),
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
			let render = '';
			if (req.user && (botinfo.owner.includes(req.user.id) || req.user.admin)) {
				botinfo.editable = true;
			}
			if (botinfo.longDesc) {
				if (botinfo.type === 'asciidoc') {
					render = clean(asciidoctor.convert(botinfo.longDesc));
				} else if (botinfo.type === 'markdown') {
					render = clean(marked(botinfo.longDesc, {
						sanitize: botinfo.theme === 'store'
					}));
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
	.get('/:id/edit', userM.auth, csrfM.make, owns(1), (req, res) => {
		// Display the edit screen with the bot's items
		res.render('edit', {
			bot: res.locals.bot,
			owners: res.locals.bot.owners ? res.locals.bot.owners.join(' ') : '',
			themes: themelist,
			categories
		});
	})
	.post('/:id/edit', userM.auth, csrfM.check, owns(1), validate, async (req, res) => {
		// Edit only the bits that need to be edited
		const response = await r.table('bots')
			.get(req.params.id)
			.update(res.locals.details)
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
	.get('/:id/delete', userM.auth, csrfM.make, owns(2), (req, res) => {
		// View a page before deleting the bot
		res.render('delete');
	})
	.post('/:id/delete', userM.auth, csrfM.check, owns(2), (req, res) => {
		// Delete the bot
		r.table('bots')
			.get(req.params.id)
			.delete()
			.run();

		res.redirect('/');
		client.createMessage(config.get('discord').channel, `<@${req.user.id}> deleted \`${res.locals.bot.name}\` <@${res.locals.bot.id}> by <@${res.locals.bot.owner}>`);
	})
	.get('/:id/token', userM.auth, csrfM.make, owns(1), (req, res) => {
		// Display the token for this bot
		res.render('token.pug', {
			bot: res.locals.bot
		});
	})
	.post('/:id/token', userM.auth, csrfM.check, owns(1), async (req, res) => {
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
	.get('/:id/remove', userM.auth, csrfM.make, userM.admin, (req, res) => {
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
	})
	.get('/:id/vote', userM.auth, async (req, res) => {
		const status = await r.table('votes')
			.filter({
				botid: req.params.id,
				userid: req.user.id
			})(0).default({});

		if (status.id) {
			res.send(status.vote.toString());
		} else {
			res.status(404).send({});
		}
	})
	.post('/:id/vote', userM.auth, async (req, res) => {
		const status = await r.table('votes')
			.filter({
				botid: req.params.id,
				userid: req.user.id
			})(0).default(null);

		console.log(JSON.stringify(req.body));

		let vote;
		if (req.body.vote === 1 || req.body.vote === -1) {
			vote = req.body.vote;
		} else {
			vote = 0;
		}

		if (status.id) {
			await r.table('votes')
				.get(status.id)
				.update({
					vote
				});
		} else {
			await r.table('votes')
				.insert({
					botid: req.params.id,
					userid: req.user.id,
					vote
				});
		}

		const upvotes = await r.table('votes')('vote').count(1);
		const downvotes = await r.table('votes')('vote').count(-1);

		res.json({
			upvotes,
			downvotes
		});
	});

module.exports = router;
