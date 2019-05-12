import express from 'express';
import r from '../../helpers/database';
import Categories from '../../../data/Categories';
import databaseConfig from '../../../configuration/server/databaseConfig';


const ApiOneApps = express.Router();

const getUser = (id) => r.table('users')
  .get(id)
  .default({
    id,
    discriminator: null,
    username: null,
    cachedAvatar: null
  })
  .pluck('discriminator', 'username', 'cachedAvatar', 'id')

const mergeAuthors = (app) => app('authors')
  .map(id => getUser(id))

const mergeReviews = (app, req) => r.table('reviews')
  .filter({ // Find reviews for this bot
    bot: app('id')
  })
  .merge(reviewer => getUser(reviewer('author')))
  .merge(reviewer => ({
    isCurrentUserOwner: req.user ? r.eq(reviewer('author'), req.user.id) : false
  }))
  .default([])
  .without('bot', 'author', 'id')
  .coerceTo('array')

ApiOneApps
  .use((req, res, next) => {
    if (!databaseConfig.enabled) {
      res.json({
        ok: false,
        message: 'The database has not been enabled. Edit `/data/databaseConfig.js` with the relevant settings to enable.'
      })
    } else {
      next();
    }
  })
  .use('/id/:id', (req, res, next) => {
    r.table('apps')
      .get(req.params.id)
      .merge(app => ({
        authors: mergeAuthors(app),
        reviews: mergeReviews(app, req),
      }))
      .default({})
      .without('token')
      .then((bot) => {
        if (!bot.id) res.status(404);
        res.json({
          ok: true,
          data: bot
        });
      })
      .catch((err) => {
        next(err);
      });
  })
  .use('/search', (req, res, next) => {
    // Keys in the BOTS table that can be sorted by
    const sortKeys = [
      'id',
      'random',
      'created',
      'edited',
    ];

    const query = typeof req.query.q === 'string' ? req.query.q : '';
    const state = typeof req.query.state === 'string' ? req.query.state : '';
    const category = typeof req.query.category === 'string' ? req.query.category : '';
    const nsfw = typeof req.query.nsfw === 'string' ? req.query.nsfw : '';
    const type = typeof req.query.type === 'string' ? req.query.type : '';
    const owners = Array.isArray(req.query.owners) ? req.query.owners : [];
    const sort = sortKeys.includes(req.query.sort) ? req.query.sort : 'random';
    const order = req.query.order === 'asc' ? 'asc' : 'desc';

    const filter = (app) => {
      // Bodge for chaining
      // All tables always has ID
      let databaseQuery = app.hasFields('id');

      if (state) {
        databaseQuery = databaseQuery.and(app('state').eq(state));
      }

      if (query) {
        databaseQuery = databaseQuery.and(
          app('contents').contains(contents => contents('page').default('').match(sanitise(query))
            .or(contents('name').default('').match(sanitise(query)))
            .or(contents('description').default('').match(sanitise(query))))
        );
      }

      // If NSFW bots are requested, add that to the query
      if (nsfw === 'nsfw') {
        databaseQuery = databaseQuery.and(app('nsfw').eq(true));
      } else if (nsfw === 'sfw') {
        databaseQuery = databaseQuery.and(app('nsfw').eq(false));
      }

      if (type) {
        databaseQuery = databaseQuery.and(app('type').eq(type));
      }

      // If a query is requested, add that to the query
      if (Categories.includes(category)) {
        databaseQuery = databaseQuery.and(app('category').eq(category));
      }

      // If there's an array of owners, add that to the query
      // but only if it is not empty
      for (let i = 0; i < owners.length; i += 1) {
        if (owners[i] !== '') {
          databaseQuery = databaseQuery.and(app('authors').contains(owners[i]));
        }
      }

      return databaseQuery;
    };

    r.table('apps')
      .filter(filter)
      .merge(apps => ({
        authors: mergeAuthors(apps),
        rating: r.table('reviews')
          .filter({
            bot: apps('id')
          })
          .avg('rating')
          .default(0),
        reviewsCount: r.table('reviews')
          .filter({
            bot: apps('id')
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

export default ApiOneApps;
