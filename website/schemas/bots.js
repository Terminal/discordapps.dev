const originaljoi = require('joi');
const githubUsernameRegex = require('github-username-regex');
const config = require('../config');

const joi = originaljoi.extend({
  base: originaljoi.string(),
  name: 'string',
  coerce: (value, state, options) => (value === '' ? null : value) // eslint-disable-line
});

const schema = joi.object({
  id: joi.string().regex(/^[0-9]+$/, 'numbers').required().error(new Error('errors.bots.id')),
  oauth: joi.string().regex(/^[0-9]+$/, 'numbers').allow(null).error(new Error('errors.bots.oauth')),
  invite: joi.string().uri({ scheme: ['https'] }).required().error(new Error('errors.bots.invite')),
  support: joi.string().uri({ scheme: ['https'] }).allow(null).error(new Error('errors.bots.support')),
  avatar: joi.string().uri({ scheme: ['https'] }).allow(null).error(new Error('errors.bots.avatar')),
  authors: joi.array().items(joi.string().regex(/^[0-9]+$/, 'numbers')).required().error(new Error('errors.bots.authors')),
  nsfw: joi.bool().error(new Error('errors.bots.nsfw')),
  github: joi.object({
    owner: joi.string().regex(githubUsernameRegex, 'github username').allow(null).error(new Error('errors.bots.githubowner')),
    repo: joi.string().allow(null).error(new Error('errors.bots.githubrepo')),
  }),
  trigger: joi.object({
    prefix: joi.array().items(joi.string().min(1).max(10)).min(1).max(10)
      .error(new Error('errors.bots.prefix')),
    customisable: joi.bool().error(new Error('errors.bots.customisable')),
    mentionable: joi.bool().error(new Error('errors.bots.mentionable')),
  }),
  contents: joi.object().pattern(joi.string().valid(Object.keys(config.languages)), joi.object({
    name: joi.string().min(4).max(32).required()
      .error(new Error('errors.bots.name')),
    description: joi.string().min(10).max(64).required()
      .error(new Error('errors.bots.description')),
    page: joi.string().min(20).max(10000).required()
      .error(new Error('errors.bots.page')),
  })).required().error((errors) => {
    if (errors.some(e => e.context.key === 'contents')) {
      return new Error('errors.bots.languages');
    }
    return errors;
  })
});

module.exports = {
  joi, schema
};
