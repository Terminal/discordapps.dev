/* eslint-env mocha */

const Bot = require('./../app/class/Bot');
const uuidv1 = require('uuid/v1');
const assert = require('assert');

describe('Bot Class', () => {
  let bot1;
  let token1;
  let bot2;
  const id1 = uuidv1();
  it('create a bot with ID', () => {
    bot1 = new Bot(id1);
  });
  it('post it to the database', (done) => {
    bot1.post().then(() => done());
  });
  it('reset the token and post it to the database', (done) => {
    token1 = bot1.token;
    bot1.resetToken().then(() => done());
  });
  it('check that the token has actually changed', () => {
    assert.notStrictEqual(token1, bot1.token);
  });
  it('set information on the bot and post it to the database', (done) => {
    bot1.name = 'DiscordMail';
    bot1.invite = 'https://discordmail.com/url/invite';
    bot1.prefix = 'dmail';
    bot1.description = 'The Discord Bot that links E-Mail to your Discord DMs!';
    bot1.post().then(() => done());
  });
  it('create an empty bot with the same ID', () => {
    bot2 = new Bot(id1);
  });
  it('get data from the database', (done) => {
    bot2.get().then(() => done());
  });
  it('check that the information has been saved', () => {
    assert.strictEqual(bot1.name, bot2.name);
    assert.strictEqual(bot1.invite, bot2.invite);
    assert.strictEqual(bot1.prefix, bot2.prefix);
    assert.strictEqual(bot1.description, bot2.description);
  });
});
