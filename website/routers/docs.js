const express = require('express');
const config = require('../config');

const router = express.Router();

router.get('/:link', (req, res) => {
  // Send the list of selectable locales
  res.redirect(`${config.links.docs}/${req.params.link}`);
});


module.exports = router;
