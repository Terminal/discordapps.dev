const express = require('express');
const r = require('../rethinkdb');
const config = require('../config');

const authRouter = require('./auth');
const botsRouter = require('./bots');
const langRouter = require('./locales');
const adminRouter = require('./admin');
const docsRouter = require('./docs');
const v1Router = require('./v1');
const v2Router = require('./v2');

const { localise } = require('../static/list');
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

    if (req.get('x-forwarded-proto') && req.get('x-forwarded-proto') !== config.webserver.protocol) {
      res.redirect(config.webserver.location);
    } else if (config.webserver.host !== req.get('host')) {
      res.redirect(config.webserver.location);
    } else {
      next();
    }
  })
  .get('/', (req, res, next) => {
    r.table('bots')
      .merge(bot => r.branch(bot('contents').hasFields(res.getLocale()), {
        random: bot('random').add(10)
      }, {}))
      .orderBy(r.desc('random'))
      .filter({
        verified: true,
        nsfw: false,
        hide: false
      })
      .limit(12)
      .then((list) => {
        const localised = list.map(item => localise(item, res));
        const slider = localised.splice(0, 6);
        res.render('main', {
          slider,
          cards: localised
        });
      })
      .catch((err) => {
        next(err);
      });
  })
  .get('/oops', (req, res, next) => {
    next(new Error('This error was thrown on purpose'));
  })
  .use('/auth', authRouter)
  .use('/bots', botsRouter)
  .use('/locale', langRouter)
  .use('/admin', adminRouter)
  .use('/docs', docsRouter)
  .use('/edit', (req, res) => {
    res.redirect(`${res.locals.languagePrefix}/bots/add`);
  })
  .use('/bot/:id', (req, res) => {
    res.redirect(`${res.locals.languagePrefix}/bots/${req.params.id}`);
  })
  .use('/api/v1', v1Router)
  .use('/api/v2', v2Router)
  .use('/api', v1Router)
  .use('/manifest.json', (req, res) => {
    res.json(manifest(res));
  });

module.exports = router;
