import express from 'express';
import r from '../../helpers/database';

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
  .use((req, res) => {
    res.send('hi')
  })

export default ApiOneApps;
