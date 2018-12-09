const joi = require('./joi');
const languages = require('../data/languages.json');

const schema = joi.object({
  bot: joi.string().regex(/^[0-9]+$/, 'numbers').required().error(new Error('errors.reviews.bot')),
  author: joi.string().regex(/^[0-9]+$/, 'numbers').required().error(new Error('errors.reviews.author')),
  rating: joi.number().integer().min(1).max(5).required().error(new Error('errors.reviews.rating')),
  text: joi.string().max(2000).error(new Error('errors.reviews.text')),
  language: joi.string().required().valid(Object.keys(languages)).error(new Error('errors.reviews.language'))
}).required();

module.exports = schema;
