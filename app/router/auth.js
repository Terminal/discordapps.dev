const express = require('express');
const auth = require('../modules/passport');
const config = require('../../config');

const router = express.Router();

const removeKey = (object, key) => {
  const { [key]: deleted, ...keys } = object;
  return keys;
};

router.use('/callback', auth.authenticate('discord'), (req, res) => {
  res.redirect(`${config.webserver.frontend.protocol}://${config.webserver.frontend.uri}/`);
})
  .get('/', auth.authenticate('discord'))
  .get('/info', (req, res) => {
    if (req.user && req.user.id) {
      res.json(removeKey(req.user, 'accessToken'));
    } else {
      res.status(401).json(null);
    }
  })
  .use('/logout', (req, res) => {
    req.logout();
    res.redirect(`${config.webserver.frontend.protocol}://${config.webserver.frontend.uri}/`);
  });

module.exports = router;
