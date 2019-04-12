const githubUsernameRegex = require('github-username-regex');
const joi = require('./joi');
const languages = require('../data/languages.json');

const schema = joi.object({
  id: joi.string().regex(/^[0-9]+$/, 'numbers').required().error(new Error('errors.apps.id')),
  oauth: joi.default(null).valid(null),
  invite: joi.string().uri({ scheme: ['https'] }).required().error(new Error('errors.rpc.invite')),
  website: joi.string().uri({ scheme: ['https'] }).allow(null).error(new Error('errors.apps.website')),
  support: joi.string().uri({ scheme: ['https'] }).allow(null).error(new Error('errors.apps.support')),
  type: joi.default('rpc').valid('rpc'),
  authors: joi.array().items(joi.string().regex(/^[0-9]+$/, 'numbers')).min(1).max(10).required().error(new Error('errors.apps.authors')),
  nsfw: joi.default(false).valid(false),
  category: joi.default(null).valid(null),
  github: joi.object({
    owner: joi.string().regex(githubUsernameRegex, 'github username').allow(null).error(new Error('errors.apps.githubowner')),
    repo: joi.string().allow(null).error(new Error('errors.apps.githubrepo')),
  }),
  trigger: joi.object().valid(null),
  images: joi.object({
    avatar: joi.string().uri({ scheme: ['https'] }).max(2000).allow(null).error(new Error('errors.apps.avatar')),
    cover: joi.string().uri({ scheme: ['https'] }).max(2000).allow(null).disallow(joi.ref('images.avatar')).error(new Error('errors.apps.cover')),
    preview: joi.array().items(joi.string().uri({ scheme: ['https'] }).max(2000)).max(20).error(new Error('errors.apps.preview'))
  }),
  videos: joi.object({
    youtube: joi.string().regex(/[a-zA-Z0-9_]{11}/, 'YouTube ID').max(15).allow(null).error(new Error('errors.apps.youtube')), // Youtube currently automatically cuts off over 11 chars. Maybe in the future...
    youku: joi.string().regex(/[a-zA-Z0-9_=]{15}/, 'Alibaba YOUKU ID').max(20).allow(null).error(new Error('errors.apps.youku')) // Need to serve the mainland.
  }),
  flags: joi.object({
    inAppPurchases: joi.default(null).valid(null),
    adverts: joi.default(null).valid(null),
    win: joi.bool().error(new Error('errors.apps.boolean')),
    mac: joi.bool().error(new Error('errors.apps.boolean')),
    linux: joi.bool().error(new Error('errors.apps.boolean'))
  }).default({
    inAppPurchases: null,
    adverts: null,
    win: false,
    mac: false,
    linux: false
  }),
  count: joi.default(null).valid(null),
  contents: joi.array().items(joi.object({
    locale: joi.string().valid(languages).required().error(new Error('errors.apps.languages')),
    name: joi.string().min(4).max(32).required().error(new Error('errors.apps.name')),
    description: joi.string().min(10).max(100).required().error(new Error('errors.apps.description')),
    page: joi.string().min(20).max(10000).required().error(new Error('errors.apps.page')),
  }))
    .min(1)
    .required()
    .error((errors) => {
      // If the error is about contents, return the error about contents
      if (errors.some(e => e.context.key === 'contents')) {
        return new Error('errors.apps.contents');
      }
      return errors;
    })
}).required();

module.exports = schema;
