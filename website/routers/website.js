const express = require('express');
const config = require('../config');

const authRouter = require('./auth');
const botsRouter = require('./bots');
const v1Router = require('./v1');
const v2Router = require('./v2');
const reactv1Router = require('./react-v1');
const manifest = require('../static/manifest');

const router = express.Router();

router
  .use((req, res, next) => {
    if (req.user) {
      req.user.admin = req.user && config.owners.includes(req.user.id);
      res.locals.user = req.user;
    } else {
      res.locals.user = {};
    }
    res.locals.url = req.url;
    res.locals.languagePrefix = res.getLocale() === config.default.language ? '' : `/${res.getLocale()}`;
    next();
  })
  .use('/auth', authRouter)
  .use('/bots', botsRouter)
  .use('/edit', (req, res) => {
    res.redirect(`${res.locals.languagePrefix}/bots/add`);
  })
  .use('/bot/:id', (req, res) => {
    res.redirect(`${res.locals.languagePrefix}/bots/${req.params.id}`);
  })
  .use('/api/v1', v1Router)
  .use('/api/v2', v2Router)
  .use('/reactjs/v1', reactv1Router)
  .use('/api', v1Router)
  .use('/manifest.json', (req, res) => {
    res.json(manifest(res));
  });

module.exports = router;
