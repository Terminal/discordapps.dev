const express = require('express');
const csrfM = require('./csrf');
const discM = require('./discord');

const router = express.Router();

router.get('/', (req, res) => {
	res.redirect('/');
})
	.get('/all', csrfM.make, discM.list) // Display all bots
	.get('/queue', csrfM.make, (req, res, next) => {
		// Display not-yet approved bots
		res.locals.approve = false;
		next();
	}, discM.list)
	.get('/:id', csrfM.make, (req, res, next) => {
		res.locals.owner = req.params.id;
		next();
	}, discM.list);

module.exports = router;
