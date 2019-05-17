/**
	This file is licenced under CC0 1.0
	https://creativecommons.org/publicdomain/zero/1.0/
	https://github.com/Terminal/discordapps.dev/tree/archive-pugjs
*/

const express = require('express');
const auth = require('./auth');

const router = express.Router();

router.use('/callback', auth.authenticate('discord'), (req, res) => {
	res.redirect('/');
})
	.get('/', auth.authenticate('discord'))
	.get('/info', (req, res) => {
		if (req.user && req.user.id) {
			res.json(req.user);
		} else {
			res.status(404).json(null);
		}
	})
	.use('/logout', (req, res) => {
		req.logout();
		res.redirect('/');
	});

module.exports = router;
