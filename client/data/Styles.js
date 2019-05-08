import rougeHighlight from '../scss/rougeHighlight.module.scss';
import modesta from '../scss/ModestaCSS/scss/modesta.module.scss';
import twitterEmojis from '../scss/twemoji.module.scss';

const makeBetter = name => name.replace(/-([a-z0-9])/g, (capture) => capture[1].toUpperCase()).replace('-', '');
const makeFrom = (from) => Object.keys(from)
  .reduce((prev, curr) => Object.assign({}, prev, {
    [makeBetter(curr)]: from[curr]
  }), {})

const RougeHighlight = makeFrom(rougeHighlight)
const Modesta = makeFrom(modesta)
const TwitterEmojis = makeFrom(twitterEmojis)

export {
  RougeHighlight,
  Modesta,
  TwitterEmojis
}
