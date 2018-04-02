const config = require('../../config');
const passport = require('passport');
const DiscordStrategy = require('passport-discord').Strategy;
const r = require('./rethinkdb');

passport.serializeUser((user, done) => done(null, user.id));

passport.deserializeUser((id, done) => {
  r.table('users')
    .get(id)
    .then((user) => {
      done(null, user);
    });
});

passport.use(new DiscordStrategy(
  {
    clientID: config.discord.clientID,
    clientSecret: config.discord.clientSecret,
    scope: config.discord.scope,
    callbackURL: `${config.webserver.location}auth/callback`,
  },
  (accessToken, refreshToken, profile, done) => {
    if (accessToken !== null) {
      r.table('users')
        .insert(profile, {
          conflict: 'replace',
        })
        .then(() => {
          done(null, profile);
        })
        .catch((err) => {
          throw err;
        });
    }
  },
));

module.exports = passport;
