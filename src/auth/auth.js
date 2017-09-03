const config = require('config');
const passport = require('passport');
const DiscordStrategy = require('passport-discord').Strategy;
const r = require('../db');

passport.serializeUser((user, done) => done(null, user.id));

passport.deserializeUser((id, done) => {
	r.table('users')
		.get(id)
		.run(r.conn)
		.then((user) => {
			done(null, user);
		});
});

// DiscordApp
passport.use(new DiscordStrategy(
	{
		clientID: config.get('discord').clientID,
		clientSecret: config.get('discord').clientSecret,
		scope: config.get('discord').scope,
		callbackURL: `${config.get('webserver').location}auth/callback`
	},
	(accessToken, refreshToken, profile, done) => {
		if (accessToken !== null) {
			r.table('users')
				.insert(profile, {
					conflict: 'replace'
				})
				.run(r.conn)
				.then(() => {
					done(null, profile);
				})
				.catch((err) => {
					throw err;
				});
		}
	}
));

module.exports = passport;
