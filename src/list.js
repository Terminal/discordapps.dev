const express = require('express');
const r = require('./db');
const csrfM = require('./csrf');
const discM = require('./discord');
const userM = require('./user');
const bot = require('./listbot');
const config = require('config');

const router = express.Router();

router.get('/', csrfM.make, (req, res, next) => {
	res.locals.approve = true;
	next();
}, discM.list)
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
	});

module.exports = router;
