const Bot = require('./../app/class/Bot');
const uuidv1 = require('uuid/v1');
const assert = require('assert');

const randomInt = max => Math.floor(Math.random() * Math.floor(max));

describe('Bot', () => {
  let bot1;
  let token1;
  const id1 = uuidv1();
  it('add a bot with ID', () => {
    bot1 = new Bot(id1);
  });
  it('post it to the database', (done) => {
    bot1.post().then(() => done());
  });
  it('should reset the token', (done) => {
    token1 = bot1.token;
    bot1.resetToken().then(() => done());
  })
  it('check that the token has actually changed', () => {
    assert.notStrictEqual(token1, bot1.token);
  })
});
