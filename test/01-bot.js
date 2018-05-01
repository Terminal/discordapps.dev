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
  it('reset the token', () => {
    token1 = bot1.token;
    bot1.resetToken();
  });
  it('post it to the database', (done) => {
    bot1.post().then(() => done());
  });
  it('check that the token has actually changed', () => {
    assert.notStrictEqual(token1, bot1.token);
  });
  it('set information on the bot and post it to the database', (done) => {
    bot1.name = 'Example Bot';
    bot1.invite = 'https://example.com/invite';
    bot1.prefix = 'exam';
    bot1.description = 'The example Lorem Ipsum that is sure to impress!';
    bot1.banner = 'background';
    bot1.avatar = 'https://terminal.ink/assets/images/avatar.png';
    bot1.addImage('background');
    bot1.addImage('avatar');
    bot1.addOwner('123456789', 3);
    bot1.post().then(() => done());
  });
  it('create an empty bot with the same ID', () => {
    bot2 = new Bot(id1);
  });
  it('get data from the database', (done) => {
    bot2.get().then(() => done());
  });
  it('check that the information has been saved', () => {
    assert.deepStrictEqual(bot1, bot2);
  });
  it('adds a whole bunch of test data', (done) => {
    const bots = [];
    let i;
    for (i = 0; i < 5; i += 1) {
      bots[i] = new Bot(uuidv1());
      bots[i].name = 'Example Bot';
      bots[i].invite = 'https://example.com/invite';
      bots[i].prefix = 'exam';
      bots[i].description = 'The example Lorem Ipsum that is sure to impress!';
      bots[i].banner = 'background';
      bots[i].avatar = 'https://terminal.ink/assets/images/avatar.png';
      bots[i].category = i % 8;
      bots[i].addOwner('123456789', 3);
    }

    const DiscordMail = new Bot('330003632298917889');
    DiscordMail.name = 'DiscordMail';
    DiscordMail.invite = 'https://discordmail.com/invite';
    DiscordMail.prefix = 'dmail or dsuite';
    DiscordMail.description = 'Recieve E-Mails in Discord';
    DiscordMail.banner = 'background';
    DiscordMail.avatar = 'https://discordmail.com/img/DiscordMail.png';
    DiscordMail.category = 7;
    DiscordMail.addOwner('190519304972664832', 3);

    bots.push(DiscordMail);

    Promise.all(bots.map(bot => bot.post()))
      .then(() => {
        done();
      });
  });
});
