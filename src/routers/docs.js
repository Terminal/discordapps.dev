const express = require('express');
const marked = require('marked');
const fs = require('fs');
const path = require('path');

const router = express.Router();

const renderPage = (req, res, next) => {
	const sidebar = marked(fs.readFileSync(path.join(__dirname, '..', 'markdown', 'sidebar.md'), 'utf8'));
	if (fs.existsSync(path.join(__dirname, '..', 'markdown', `${res.locals.page}.md`))) {
		// Render the specific page
		fs.readFile(path.join(__dirname, '..', 'markdown', `${res.locals.page}.md`), 'utf8', (err, data) => {
			res.render('md.pug', {
				title: req.params.page,
				markdown: marked(data),
				sidebar
			});
		});
	} else {
		// Continue (to reach the 404 found later on)
		next();
	}
};

const sendPage = (req, res, next) => {
	res.locals.page = req.params.page;
	if (fs.existsSync(path.join(__dirname, '..', 'markdown', `${res.locals.page}.md`))) {
		// Render the specific page
		fs.readFile(path.join(__dirname, '..', 'markdown', `${res.locals.page}.md`), 'utf8', (err, data) => {
			res.set('content-type', 'text/markdown').send(data);
		});
	} else {
		next();
	}
};

router.get('', (req, res, next) => {
	res.locals.page = 'index';
	next();
}, renderPage)
	.get('/random', (req, res) => {
		const elements = fs.readdirSync(path.join(__dirname, 'markdown'));
		const page = elements[Math.floor(Math.random() * elements.length)];
		res.redirect(`/docs/${page.substr(page, page.indexOf('.'))}`);
	})
	.get('/:page', (req, res, next) => {
		res.locals.page = req.params.page;
		next();
	}, renderPage)
	.get('/:page.md', (req, res, next) => {
		res.locals.page = req.params.page;
		next();
	}, sendPage);

module.exports = router;
