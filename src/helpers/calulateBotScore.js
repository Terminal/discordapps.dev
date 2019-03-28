import { getMasterLanguage } from "../locales";
import Competitors from "../data/Competitors";

const calculateBotScore = ({
  bot,
  locale
}) => {
  // If the bot has the same language as the viewer, add 100 points.
  if (bot.contents.some(contents => contents.locale === locale || contents.locale === getMasterLanguage(locale))) {
    bot.random += 100;
  }

  bot.contents.forEach((content) => {
    // For each description that starts with a lowercase character, deduct .5 points.
    if (/^[a-z]/.test(content.description)) {
      bot.random -= .5;
    }

    // Bots with competitors in the bot page lose 2 points.
    Competitors.forEach((competitor) => {
      if (content.page.includes(competitor)) {
        bot.random -= 2;
      }
    })
  });

  // Bots with preview images gain .5 points.
  if (bot.images.preview.length > 0) {
    bot.random += .5;
  }

  // Bots with a support server gain .1 points.
  if (bot.support) {
    bot.random += .1;
  }

  return bot;
}

export default calculateBotScore;
