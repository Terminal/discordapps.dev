const express = require('express');
const userM = require('./user');
const csrfM = require('./csrf');
const discM = require('./discord');
const r = require('./db');
const bot = require('./listbot');
const marked = require('marked');

const router = express.Router();
marked.setOptions({
	sanitize: true
});

router.get('/:id', async (req, res) => {
	const botinfo = await r.table('bots')
		.get(req.params.id)
		.run(r.conn);
	if ((req.user && req.user.id) === botinfo.owner || (req.user && req.user.admin)) {
		botinfo.editable = true;
	}
	if (botinfo) {
		res.render('botpage', { botinfo, marked });
	} else {
		res.status(400).render('error', { status: 404, message: 'The bot was not found' });
	}
})
	.get('/:id/edit', userM.auth, csrfM.make, discM.owns, (req, res) => {
		// Display the edit screen with the bot's items
		res.render('edit.pug', {
			csrf: req.csrf,
			bot: res.locals.bot,
			title: 'Edit Bot'
		});
	})
	.post('/:id/edit', userM.auth, csrfM.check, discM.owns, discM.validate, (req, res) => {
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
	.get('/:id/delete', userM.auth, csrfM.make, discM.owns, (req, res) => {
		// View a page before deleting the bot
		res.render('delete.pug', {
			csrf: req.csrf,
			title: 'Delete Bot'
		});
	})
	.post('/:id/delete', userM.auth, csrfM.check, discM.owns, (req, res) => {
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
	.get('/:id/token', userM.auth, csrfM.make, discM.owns, (req, res) => {
		// Display the token for this bot
		res.render('token.pug', {
			csrf: req.csrf,
			bot: res.locals.bot,
			title: 'Token'
		});
	})
	.post('/:id/token', userM.auth, csrfM.check, discM.owns, (req, res) => {
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
	});

module.exports = router;
