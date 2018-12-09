const joi = require('./joi');
const githubUsernameRegex = require('github-username-regex');
const languages = require('../data/languages.json');
const categories = require('../data/categories.json');

const schema = joi.object({
  id: joi.string().regex(/^[0-9]+$/, 'numbers').required().error(new Error('errors.bots.id')),
  oauth: joi.string().regex(/^[0-9]+$/, 'numbers').allow(null).error(new Error('errors.bots.oauth')),
  invite: joi.string().uri({ scheme: ['https'] }).required().error(new Error('errors.bots.invite')),
  website: joi.string().uri({ scheme: ['https'] }).allow(null).error(new Error('errors.bots.website')),
  support: joi.string().uri({ scheme: ['https'] }).allow(null).error(new Error('errors.bots.support')),
  authors: joi.array().items(joi.string().regex(/^[0-9]+$/, 'numbers')).min(1).max(10).required().error(new Error('errors.bots.authors')),
  nsfw: joi.bool().error(new Error('errors.bots.nsfw')),
  category: joi.string().valid(categories).required().error(new Error('errors.bots.category')),
  github: joi.object({
    owner: joi.string().regex(githubUsernameRegex, 'github username').allow(null).error(new Error('errors.bots.githubowner')),
    repo: joi.string().allow(null).error(new Error('errors.bots.githubrepo')),
  }),
  trigger: joi.object({
    prefix: joi.array().items(joi.string().min(1).max(10)).required().min(1).max(10).required().error(new Error('errors.bots.prefix')),
    customisable: joi.bool().error(new Error('errors.bots.customisable')),
    mentionable: joi.bool().error(new Error('errors.bots.mentionable')),
  }),
  images: joi.object({
    avatar: joi.string().uri({ scheme: ['https'] }).max(2000).allow(null).error(new Error('errors.bots.avatar')),
    cover: joi.string().uri({ scheme: ['https'] }).max(2000).allow(null).error(new Error('errors.bots.cover')),
    preview: joi.array().items(joi.string().uri({ scheme: ['https'] }).max(2000)).max(20).error(new Error('errors.bots.preview'))
  }),
  flags: joi.object({
    inAppPurchases: joi.bool().error(new Error('errors.bots.inAppPurchases')),
    adverts: joi.bool().error(new Error('errors.bots.adverts'))
  }),
  contents: joi.object().pattern(joi.string().valid(Object.keys(languages)), joi.object({
    name: joi.string().min(4).max(32).required().error(new Error('errors.bots.name')),
    description: joi.string().min(10).max(100).required().error(new Error('errors.bots.description')),
    page: joi.string().min(20).max(10000).required().error(new Error('errors.bots.page')),
  })).required().error((errors) => {
    if (errors.some(e => e.context.key === 'contents')) {
      return new Error('errors.bots.languages');
    }
    return errors;
  })
}).required();

module.exports = schema;
