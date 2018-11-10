const express = require('express');
const { isLoggedIn } = require('../static/middleware');

const router = express.Router();

router
  .get('/add', isLoggedIn, (req, res) => {
    res.render('add', {
      layout: 'docs',
    });
  });

module.exports = router;
