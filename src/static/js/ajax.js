/**
 * This file is licenced under CC0 1.0
 * https://creativecommons.org/publicdomain/zero/1.0/
 * https://github.com/Terminal/discordapps.dev/tree/archive-pugjs
 */

const main = [...document.getElementsByTagName('main')][0];

const link = () => {
  [...document.getElementsByTagName('a')]
    .filter(elem => elem.dataset.ajaxUrl !== undefined)
    .forEach((elem) => {
      delete elem.dataset.ajaxUrl;
      elem.addEventListener('click', function ajax(event) {
        // Do not change page to URL on click
        event.preventDefault();
        const xhttp = new XMLHttpRequest();
        const url = this.href;
        xhttp.onreadystatechange = function onLoad() {
          if (this.readyState === 4) {
            main.innerHTML = this.responseText;
            window.history.pushState('', 'Page', url);
            link();
          }
        };
        xhttp.open('get', `${this.pathname}?ajax=true`, true);
        xhttp.send();
      });
    });
};

window.addEventListener('load', () => {
  link();
});
