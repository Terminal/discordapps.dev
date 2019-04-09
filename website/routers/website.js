const express = require('express');
const config = require('../config');

const authRouter = require('./auth');
const appsRouter = require('./apps');
const v1Router = require('./v1');
const v2Router = require('./v2');
const reactv1Router = require('./react-v1');
const reactv2Router = require('./react-v2');

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
    next();
  })
  .use('/auth', authRouter)
  .use('/apps', appsRouter)
  .use('/bots', appsRouter)
  .use('/api/v1', v1Router)
  .use('/api/v2', v2Router)
  .use('/reactjs/v1', reactv1Router)
  .use('/reactjs/v2', reactv2Router)
  .use('/api', v1Router);

module.exports = router;
