const express = require('express');
const marked = require('marked');
const fs = require('fs');
const path = require('path');

const router = express.Router();

router.get('/', (req, res) => {
	fs.readFile(path.join(__dirname, '/markdown/index.md'), 'utf8', (err, data) => {
		res.render('md.pug', {
			title: 'Documentation',
			markdown: marked(data)
		});
	});
})
	.get('/:page', (req, res, next) => {
		if (fs.existsSync(path.join(__dirname, '/markdown/', `${req.params.page}.md`))) {
			fs.readFile(path.join(__dirname, '/markdown/', `${req.params.page}.md`), 'utf8', (err, data) => {
				res.render('md.pug', {
					title: req.params.page,
					markdown: marked(data)
				});
			});
		} else {
			next();
		}
	});

module.exports = router;
