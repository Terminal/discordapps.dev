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
	.post('/queue', userM.auth, csrfM.check, userM.admin, async (req, res) => {
		// Delete or flag bot as approved
		const previous = req.header('Referer') || '/';
		if (typeof req.body.id.length > 70
			|| (req.body.approve !== 'true' && req.body.approve !== 'false')) {
			res.status(400).render('error', { status: 400, message: 'Invalid input' });
		} else if (req.body.approve === 'true') {
			const result = await r.table('bots')
				.get(req.body.id)
				.update({
					approved: true
				}, {
					returnChanges: true
				})
				.run();
			if (res.skipped) {
				res.status(404).render('error', { status: 404, message: 'Bot Not found' });
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
		} else if (req.body.approve === 'false') {
			const result = await r.table('bots')
				.get(req.body.id)
				.delete({
					returnChanges: true
				})
				.run();
			if (res.skipped) {
				res.status(404).render('error', { status: 404, message: 'Bot Not found' });
			} else if (!result.changes) {
				res.redirect(previous);
			} else {
				res.redirect(previous);
				bot.channel.createMessage(`<@${req.user.id}> rejected \`${result.changes[0].old_val.name}\` <@${result.changes[0].old_val.id}> by <@${result.changes[0].old_val.owner}>`);
			}
		} else {
			res.status(500).render('error', { status: 500, message: 'An invalid approval type was encountered that was not caught earlier' });
		}
	})
	.get('/:id', csrfM.make, (req, res, next) => {
		res.locals.owner = req.params.id;
		next();
	}, discM.list);

module.exports = router;
