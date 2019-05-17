/**
 * This file is licenced under CC0 1.0
 * https://creativecommons.org/publicdomain/zero/1.0/
 * https://github.com/Terminal/discordapps.dev/tree/archive-pugjs
 */

const imageFail = (element) => { // eslint-disable-line
  if (!element.dataset.imageFailure) {
    element.src = '/img/terminal256.png';
    element.dataset.imageFailure = true;
  } else {
    element.src = null;
  }
};
