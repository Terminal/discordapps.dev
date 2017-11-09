const express = require('express');
const i18n = require('i18n');

const router = express.Router();

router.get('/', (req, res) => {
	res.render('lang', {
		languages: Object.keys(i18n.getCatalog())
	});
})
	.get('/:lang', (req, res) => {
		res.cookie('lang', req.params.lang);
		res.redirect('/');
	});

module.exports = router;
