/**
	ls.terminal.ink Discord Bot List Server
	Copyright (C) 2018 Moustacheminer Server Services
	Copyright (C) 2018 Terminal.ink

    This program is free software: you can redistribute it and/or modify
    it under the terms of the GNU General Public License as published by
    the Free Software Foundation, either version 3 of the License, or
    (at your option) any later version.

    This program is distributed in the hope that it will be useful,
    but WITHOUT ANY WARRANTY; without even the implied warranty of
    MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
    GNU General Public License for more details.

    You should have received a copy of the GNU General Public License
	along with this program.  If not, see <http://www.gnu.org/licenses/>.
*/

const config = require('config');
const passport = require('passport');
const DiscordStrategy = require('passport-discord').Strategy;
const r = require('../db');

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
