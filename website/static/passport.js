const passport = require('passport');
const DiscordStrategy = require('passport-discord').Strategy;
const config = require('../config');
const ImageCache = require('../class/ImageCache');

const r = require('../rethinkdb');

passport.serializeUser((user, done) => done(null, user.id));

passport.deserializeUser((id, done) => {
  r.table('users')
    .get(id)
    .then((user) => {
      done(null, user);
    });
});

// DiscordApp
passport.use(new DiscordStrategy(
  {
    clientID: config.discord.clientID,
    clientSecret: config.discord.clientSecret,
    scope: config.discord.scope,
    callbackURL: `${config.webserver.location}/auth/callback`
  },
  (accessToken, refreshToken, profile, done) => {
    if (accessToken !== null) {
      const write = () => {
        r.table('users')
          .insert(profile, {
            conflict: 'replace'
          })
          .then(() => {
            done(null, profile);
          })
          .catch((err) => {
            throw err;
          });
      };

      // Cache the user's avatar as soon as they log in.
      if (profile.avatar) {
        const cache = new ImageCache({
          url: `https://cdn.discordapp.com/avatars/${profile.id}/${profile.avatar}.png`,
          x: 512,
          y: 512
        });
        cache.cache()
          .then(() => {
            profile.cachedAvatar = cache.permalink;
            write();
          })
          .catch((err) => {
            done(err);
          });
      } else {
        done();
      }
    }
  }
));

module.exports = passport;
