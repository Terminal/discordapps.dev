const originaljoi = require('joi');

const joi = originaljoi.extend({
  base: originaljoi.string(),
  name: 'string',
  coerce: (value, state, options) => {
    if (value === '') return null;
    if (typeof value === 'string') return value;
    if (typeof value === 'number') return value.toString(10);
    return null;
  }
}, {
  base: originaljoi.bool(),
  name: 'bool',
  coerce: (value, state, options) => { // eslint-disable-line
    if (typeof value === 'boolean') {
      return value;
    }
    return value === 'on';
  }
}, {
  base: originaljoi.array(),
  name: 'array',
  coerce: (values, state, options) => { // eslint-disable-line
    if (typeof values === 'object' && Array.isArray(values)) return values.filter(value => value !== '');
    if (typeof values === 'undefined') return [];
    return [];
  }
}, {
  base: originaljoi.number(),
  name: 'number',
  coerce: (value, state, options) => { // eslint-disable-line
    if (typeof value === 'number') {
      return value;
    }
    const numberwang = parseInt(value, 10);
    if (isNaN(numberwang)) {
      return null;
    }
    return numberwang;
  }
});

module.exports = joi;
