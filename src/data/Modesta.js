import modesta from '../scss/modestacss/scss/modesta.module.scss';
import twitterEmojis from '../scss/twemoji.module.scss';

import overrideColours from '../scss/colours.module.scss';

const Modesta = {};
const TwitterEmojis = {};

Object.keys(modesta)
  .forEach((css) => {
    Modesta[css.replace(/-([a-z0-9])/g, (capture) => capture[1].toUpperCase()).replace('-', '')] = modesta[css];
  });

Object.keys(twitterEmojis)
  .forEach((css) => {
    TwitterEmojis[css.replace(/-([a-z0-9])/g, (capture) => capture[1].toUpperCase()).replace('-', '')] = twitterEmojis[css];
  });

Modesta.secondary = overrideColours.secondary

export default Modesta;
export {
  TwitterEmojis
};
