/**
 * This file is licenced under CC0 1.0
 * https://creativecommons.org/publicdomain/zero/1.0/
 * https://github.com/Terminal/discordapps.dev/tree/archive-pugjs
 */

const express = require('express');
const cors = require('cors');
const v1 = require('./apirevisions/v1');
const discord = require('./../discord');

let online;

// Have a status to check if the Discord bot is online or not
discord.on('ready', () => {
  online = true;
});

discord.on('disconnect', () => {
  online = false;
});

const router = express.Router();

// Redirect to the documentation
router.use(cors())
  .get('/', (req, res) => {
    res.redirect('/docs');
  })
  .use((req, res, next) => {
    if (online) {
      next();
    } else {
      res.status(500).json({
        error: 'The webserver has not fully initialised yet. Please try again later'
      });
    }
  })
  .use('/v1', v1) // Version 1
  .use('*', (req, res) => {
    res.status(404).json({ error: 'This API revision does not exist.' });
  });

module.exports = router;
