import modesta from '../scss/ModestaCSS/scss/modesta.module.scss';
import twitterEmojis from '../scss/twemoji.module.scss';
import elements from '../scss/elements.module.scss';

const makeBetter = name => name.replace(/-([a-z0-9])/g, (capture) => capture[1].toUpperCase()).replace('-', '');
const makeFrom = (from) => Object.keys(from)
  .reduce((prev, curr) => Object.assign({}, prev, {
    [makeBetter(curr)]: from[curr]
  }), {})

const Modesta = makeFrom(modesta)
const TwitterEmojis = makeFrom(twitterEmojis)
const CSSElements = makeFrom(elements);

export {
  Modesta,
  TwitterEmojis,
  CSSElements
}
