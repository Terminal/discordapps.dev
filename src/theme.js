const express = require('express');
const fs = require('fs');

const themes = fs.readdirSync('./src/dynamic/');
const router = express.Router();

router.get('/', (req, res) => {
	res.render('theme', { themes });
})
	.get('/:theme', (req, res) => {
		res.cookie('theme', req.params.theme);
		res.redirect('/');
	});

module.exports = router;
