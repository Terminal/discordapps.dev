const express = require('express');

const router = express.Router();

router.get('/', (req, res) => {
	res.render('lang.pug', {
		title: 'Languages'
	});
})
	.get('/:lang', (req, res) => {
		res.cookie('lang', req.params.lang);
		res.redirect('/');
	});

module.exports = router;
