const express = require('express');
const multer = require('multer');
const r = require('../rethinkdb');
const checkParamsLength = require('../middleware/checkParamsLength');

const { isOwnerOfBot, isLoggedIn, isAdmin } = require('../static/middleware');
const selectableStates = require('../data/states.json');
const categories = require('../data/categories.json');
const discordWebhooks = require('../static/discordWebhook');
const { fixRoles } = require('../static/bot');

const reader = multer();

const botserverError = () => console.log('Failed to update roles! Is webserver down?');

const router = express.Router();

const operators = /[|\\{}()[\]^$+*?.]/g;
const sanitise = string => `(?i)${string.trim().toLowerCase().replace(operators, '\\$&')}`;

const sortKeys = [
  'id',
  'random',
  'created',
  'edited',
];

router
  .get('/bots/category/:category', checkParamsLength, (req, res, next) => {
    r.table('apps')
      .filter({
        type: 'bots',
        category: req.params.category
      })
      .merge(bot => ({
        authors: r.table('users').getAll(r.args(bot('authors'))).pluck('discriminator', 'username', 'cachedAvatar', 'id').coerceTo('array')
      }))
      .default([])
      .without('token')
      .then((bots) => {
        res.json({
          ok: true,
          data: bots
        });
      })
      .catch((err) => {
        next(err);
      });
  })
  .get('/apps/id/:id', checkParamsLength, (req, res, next) => {
    r.table('apps')
      .get(req.params.id)
      .merge(bot => ({
        authors: r.table('users').getAll(r.args(bot('authors'))).pluck('discriminator', 'username', 'cachedAvatar', 'id').coerceTo('array')
      }))
      .merge(bot => ({
        reviews: r.table('reviews')
          .filter({
            bot: bot('id')
          })
          .merge(reviewer => r.table('users').get(reviewer('author')).pluck('discriminator', 'username', 'cachedAvatar'))
          .merge(reviewer => ({
            isCurrentUserOwner: req.user ? r.eq(reviewer('author'), req.user.id) : false
          }))
          .default([])
          .without('bot')
          .coerceTo('array')
      }))
      .default({})
      .without('token')
      .then((bot) => {
        if (!bot.id) res.status(404);
        res.json({
          ok: !!bot.id,
          data: bot
        });
      })
      .catch((err) => {
        next(err);
      });
  })
  .get('/apps/id/:id/configure', isOwnerOfBot, (req, res, next) => {
    r.table('apps')
      .get(req.params.id)
      .then((bot) => {
        if (!bot.id) res.status(404);
        res.json({
          ok: !!bot.id,
          data: bot
        });
      })
      .catch((err) => {
        next(err);
      });
  })
  .post('/apps/id/:id/state', checkParamsLength, isLoggedIn, isAdmin, reader.none(), (req, res, next) => {
    if (selectableStates.includes(req.body.state)) {
      r.table('apps')
        .get(req.params.id)
        .update({
          state: req.body.state
        }, {
          returnChanges: true
        })
        .then((result) => {
          if (result.replaced === 1) {
            const newVal = result.changes[0].new_val;
            discordWebhooks(`<@${req.user.id}> changed state of <@${req.params.id}> to \`${req.body.state}\`\n${newVal.authors.map(owner => `<@${owner}>`).join(', ')}\n\n${req.body.reason}`);
          }
          res.send({
            ok: true
          });
          fixRoles()
            .catch(botserverError);
        })
        .catch((err) => {
          next(err);
          res.send({
            ok: false,
            message: err.message
          });
        });
    } else {
      res.send({
        ok: false,
        message: 'State not found'
      });
    }
  })
  .get('/apps/search', (req, res, next) => {
    const query = typeof req.query.q === 'string' ? req.query.q : '';
    const state = typeof req.query.state === 'string' ? req.query.state : '';
    const category = typeof req.query.category === 'string' ? req.query.category : '';
    const nsfw = typeof req.query.nsfw === 'string' ? req.query.nsfw : '';
    const type = typeof req.query.type === 'string' ? req.query.type : '';
    const owners = Array.isArray(req.query.owners) ? req.query.owners : [];
    const sort = sortKeys.includes(req.query.sort) ? req.query.sort : 'random';
    const order = req.query.order === 'asc' ? 'asc' : 'desc';

    const filter = (bot) => {
      // Bodge for chaining
      let databaseQuery = bot.hasFields('id');

      if (state) {
        databaseQuery = databaseQuery.and(bot('state').eq(state));
      }

      if (query) {
        databaseQuery = databaseQuery.and(
          bot('contents').contains(contents => contents('page').default('').match(sanitise(query))
            .or(contents('name').default('').match(sanitise(query)))
            .or(contents('description').default('').match(sanitise(query))))
        );
      }

      // If NSFW bots are requested, add that to the query
      if (nsfw === 'nsfw') {
        databaseQuery = databaseQuery.and(bot('nsfw').eq(true));
      } else if (nsfw === 'sfw') {
        databaseQuery = databaseQuery.and(bot('nsfw').eq(false));
      }

      if (type) {
        databaseQuery = databaseQuery.and(bot('type').eq(type));
      }

      // If a query is requested, add that to the query
      if (categories.includes(category)) {
        databaseQuery = databaseQuery.and(bot('category').eq(category));
      }

      // If there's an array of owners, add that to the query
      // but only if it is not empty
      for (let i = 0; i < owners.length; i += 1) {
        if (owners[i] !== '') {
          databaseQuery = databaseQuery.and(bot('authors').contains(owners[i]));
        }
      }

      return databaseQuery;
    };

    r.table('apps')
      .filter(filter)
      .merge(bot => ({
        authors: r.table('users')
          .getAll(r.args(bot('authors')))
          .pluck('discriminator', 'username', 'cachedAvatar', 'id')
          .default({
            discriminator: null,
            username: null,
            cachedAvatar: null
          })
          .coerceTo('array'),
        rating: r.table('reviews')
          .filter({
            bot: bot('id')
          })
          .avg('rating')
          .default(0),
        reviewsCount: r.table('reviews')
          .filter({
            bot: bot('id')
          })
          .count()
      }))
      .without('token')
      .orderBy(r[order](sort))
      .then((bots) => {
        res.json({
          ok: true,
          data: bots
        });
      })
      .catch((err) => {
        next(err);
      });
  })
  .get('/categories', (req, res) => {
    res.json({
      ok: true,
      data: categories
    });
  })
  .use((req, res) => {
    res.status(404).json({
      ok: false,
      message: 'errors.api.404'
    });
  })
  .use((err, req, res, next) => { // eslint-disable-line
    if (err) {
      res.status(500).json({
        ok: false,
        message: 'errors.api.500',
        data: err.stack
      });
    } else {
      res.status(500).json({
        ok: false,
        message: 'errors.api.500'
      });
    }
  });

module.exports = router;
