const joi = require('joi');
const githubUsernameRegex = require('github-username-regex');
const i18n = require('../static/i18n');

const schema = joi.object({
  id: joi.string().regex(/^[0-9]+$/, 'numbers').required(),
  oauth: joi.string().regex(/^[0-9]+$/, 'numbers').allow(''),
  invite: joi.string().uri({ scheme: ['https'] }).required(),
  support: joi.string().uri({ scheme: ['https'] }).allow(''),
  guilds: joi.array().items(joi.number().integer().min(0).max(2000000)),
  authors: joi.array().items(joi.string().regex(/^[0-9]+$/, 'numbers').min(1).max(10)).required(),
  github: joi.object({
    owner: joi.string().regex(githubUsernameRegex, 'github username'),
    repo: joi.string(),
  }),
  trigger: joi.object({
    prefix: joi.array().items(joi.string().min(1).max(10)),
    customisable: joi.bool(),
  }),
  contents: joi.object().pattern(joi.string().valid(i18n.getLocales()), joi.object({
    name: joi.string().min(4).max(32).required(),
    description: joi.string().min(10).max(64).required(),
    page: joi.string().min(20).max(10000).required(),
  }))
});

module.exports = schema;
