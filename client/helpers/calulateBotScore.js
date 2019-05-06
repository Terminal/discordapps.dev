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
      // Subtract 2 points for each instance of a competitor
      // https://stackoverflow.com/questions/4009756/how-to-count-string-occurrence-in-string
      // '---discordbots.org---'
      //    ==> ['---', '---'] ==> 1 instance
      // '---discordbots.org---discordbots.org---'
      //    ==> ['---', '---', '---'] ==> 2 instances
      const instances = content.page.split(competitor).length - 1;
      bot.random -= 2 * instances;
    });
  });

  // Bots with preview images gain .5 points.
  if (bot.images.preview.length > 0) {
    bot.random += .5;
  }

  // Bots with a support server gain .1 points.
  if (bot.support) {
    bot.random += .1;
  }

  if (bot.rating && bot.reviewsCount && bot.rating >= 1 && bot.reviewsCount >= 1) {
    // *ring ring*
    // me:   Yes can i speak to Matt Parker
    // them: No they're too busy
    // me:   Great time to do this the crap way
    bot.random += bot.rating * Math.log10(bot.reviewsCount) / 5
  }

  return bot;
}

export default calculateBotScore;
