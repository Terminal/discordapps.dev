const originaljoi = require('joi');
const githubUsernameRegex = require('github-username-regex');
const config = require('../config');

const joi = originaljoi.extend({
  base: originaljoi.string(),
  name: 'string',
  coerce: (value, state, options) => (value === '' ? null : value) // eslint-disable-line
});

const schema = joi.object({
  id: joi.string().regex(/^[0-9]+$/, 'numbers').required().error(new Error('bot_id_error')),
  oauth: joi.string().regex(/^[0-9]+$/, 'numbers').allow(null).error(new Error('bot_oauth_error')),
  invite: joi.string().uri({ scheme: ['https'] }).required().error(new Error('bot_invite_error')),
  support: joi.string().uri({ scheme: ['https'] }).allow(null).error(new Error('bot_support_error')),
  authors: joi.array().items(joi.string().regex(/^[0-9]+$/, 'numbers')).required().error(new Error('bot_authors_error')),
  nsfw: joi.bool().error(new Error('bot_nsfw_error')),
  github: joi.object({
    owner: joi.string().regex(githubUsernameRegex, 'github username').allow(null).error(new Error('bot_githubowner_error')),
    repo: joi.string().allow(null).error(new Error('bot_githubrepo_error')),
  }),
  trigger: joi.object({
    prefix: joi.array().items(joi.string().min(1).max(10)).min(1).max(10)
      .error(new Error('bot_prefix_error')),
    customisable: joi.bool().error(new Error('bot_customisable_error')),
    mentionable: joi.bool().error(new Error('bot_mentionable_error')),
  }),
  contents: joi.object().pattern(joi.string().valid(Object.keys(config.languages)), joi.object({
    name: joi.string().min(4).max(32).required()
      .error(new Error('bot_name_error')),
    description: joi.string().min(10).max(64).required()
      .error(new Error('bot_description_error')),
    page: joi.string().min(20).max(10000).required()
      .error(new Error('bot_page_error')),
  })).required().error((errors) => {
    if (errors.some(e => e.context.key === 'contents')) {
      return new Error('bot_languages');
    }
    return errors;
  })
});

module.exports = {
  joi, schema
};
