const config = require('config');
const passport = require('passport');
const DiscordStrategy = require('passport-discord').Strategy;
const r = require('../db');

passport.serializeUser((user, done) => done(null, user.id));

passport.deserializeUser((id, done) => {
	r.table('users')
		.get(id)
		.run(r.conn, (err, user) => done(err, user));
});

// DiscordApp
passport.use(new DiscordStrategy(
	{
		clientID: config.get('discord').api.clientID,
		clientSecret: config.get('discord').api.clientSecret,
		scope: config.get('discord').api.scope,
		callbackURL: '/auth/callback'
	},
	(accessToken, refreshToken, profile, done) => {
		console.dir(profile);
		if (accessToken !== null) {
			r.table('users')
				.get(profile.id)
				.run(r.conn)
				.then((user) => {
					if (user) {
						done(null, user);
					} else {
						// If the user doesn't exist, add the user!
						r.table('users')
							.insert(profile)
							.run(r.conn)
							.then(() => {
								done(null, profile.id);
							});
					}
				})
				.catch((err) => {
					throw err;
				});
		}
	}
));

passport.checkIfLoggedIn = (req, res, next) => {
	if (req.user) {
		next();
	} else {
		res.status(401).render('index.html', { user: req.user, error: 401, message: 'You have not logged in yet' });
	}
};

module.exports = passport;
