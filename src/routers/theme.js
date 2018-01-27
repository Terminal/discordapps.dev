const express = require('express');
const themes = require('./../data/themes.json').selectable;

const router = express.Router();

router.get('/', (req, res) => {
	// Send the list of selectable themes to the client
	res.render('theme', { themes });
})
	.get('/:theme', (req, res) => {
		// Set the client's cookie to the selected theme
		res.cookie('theme', req.params.theme);
		res.redirect('/');
	});

module.exports = router;
