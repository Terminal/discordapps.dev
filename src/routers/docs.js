const express = require('express');
const config = require('config');

const router = express.Router();

router.get('/', (req, res) => res.redirect(config.get('webserver.docs')));

module.exports = router;
