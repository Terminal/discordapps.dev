import twitterEmojis from '../scss/twemoji.module.scss';

const TwitterEmojis = {};

Object.keys(twitterEmojis)
  .forEach((css) => {
    TwitterEmojis[css.replace(/-([a-z0-9])/g, (capture) => capture[1].toUpperCase()).replace('-', '')] = twitterEmojis[css];
  });

export default TwitterEmojis;
export {
  TwitterEmojis
};
