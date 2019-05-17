/**
 * This file is licenced under CC0 1.0
 * https://creativecommons.org/publicdomain/zero/1.0/
 * https://github.com/Terminal/discordapps.dev/tree/archive-pugjs
 */

/* globals fuzzy */
const bots = [...document.getElementsByClassName('botcard')]
  .map(bot => ({
    name: bot.firstChild.firstChild.firstChild.innerHTML,
    desc: bot.firstChild.firstChild.lastChild.innerHTML,
    id: bot.id,
    dom: bot
  }));

const search = document.getElementById('search');

search.oninput = () => {
  if (search.value.length !== 0) {
    fuzzy.filter(search.value, bots, {
      extract: bot => bot.name + bot.desc + bot.id
    }).reverse().forEach((result) => {
      result.original.dom.parentElement.insertAdjacentElement('afterbegin', result.original.dom);
    });
  } else {
    bots.forEach((bot) => {
      bot.dom.parentElement.insertAdjacentElement('beforeend', bot.dom);
    });
  }
};
