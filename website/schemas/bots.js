const githubUsernameRegex = require('github-username-regex');
const joi = require('./joi');
const languages = require('../data/languages.json');
const categories = require('../data/categories.json');

const schema = joi.object({
  id: joi.string().regex(/^[0-9]+$/, 'numbers').required().error(new Error('errors.apps.id')),
  oauth: joi.string().regex(/^[0-9]+$/, 'numbers').allow(null).error(new Error('errors.apps.oauth')),
  invite: joi.string().uri({ scheme: ['https'] }).required().error(new Error('errors.bots.invite')),
  website: joi.string().uri({ scheme: ['https'] }).allow(null).error(new Error('errors.apps.website')),
  support: joi.string().uri({ scheme: ['https'] }).allow(null).error(new Error('errors.apps.support')),
  type: joi.default('bots').valid('bots'),
  authors: joi.array().items(joi.string().regex(/^[0-9]+$/, 'numbers')).min(1).max(10).required().error(new Error('errors.apps.authors')),
  nsfw: joi.bool().error(new Error('errors.apps.nsfw')),
  category: joi.string().valid(categories).required().error(new Error('errors.apps.category')),
  github: joi.object({
    owner: joi.string().regex(githubUsernameRegex, 'github username').allow(null).error(new Error('errors.apps.githubowner')),
    repo: joi.string().allow(null).error(new Error('errors.apps.githubrepo')),
  }),
  trigger: joi.object({
    prefix: joi.array().items(joi.string().min(1).max(10)).required().min(1).max(10).error(new Error('errors.apps.prefix')),
    customisable: joi.bool().error(new Error('errors.apps.customisable')),
    mentionable: joi.bool().error(new Error('errors.apps.mentionable')),
  }),
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
    inAppPurchases: joi.bool().error(new Error('errors.apps.boolean')),
    adverts: joi.bool().error(new Error('errors.apps.boolean')),
    win: joi.default(null).valid(null),
    mac: joi.default(null).valid(null),
    linux: joi.default(null).valid(null)
  }).default({
    inAppPurchases: false,
    adverts: false,
    win: null,
    mac: null,
    linux: null
  }),
  count: joi.number().integer().min(0).max(5000000).error(new Error('errors.apps.count')).allow(null), // Maximum of 5 Million bots... b'cus why not?
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
