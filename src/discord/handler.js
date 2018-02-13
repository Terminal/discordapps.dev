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
const { commands } = require('./cogs');
const client = require('./');
const r = require('./../db');
const i18n = require('i18n');

const prefixes = config.get('discord').prefix;

/*
 * Modified Eris Code - https://github.com/abalabahaha/eris
 * Allows me to clean any message content
 */
const clean = (message, content) => {
	let cleanContent = content;

	if (message.mentions) {
		message.mentions.forEach((mention) => {
			if (message.channel.guild) {
				const member = message.channel.guild.members.get(mention.id);
				if (member) {
					cleanContent = cleanContent.replace(new RegExp(`<@!${mention.id}>`, 'g'), `@${member.nick}` || mention.username);
				}
			}
			cleanContent = cleanContent.replace(new RegExp(`<@!?${mention.id}>`, 'g'), `@${mention.username}`);
		});
	}

	if (message.channel.guild && message.roleMentions) {
		message.roleMentions.forEach((roleID) => {
			const role = message.channel.guild.roles.get(roleID);
			const roleName = role ? role.name : 'deleted-role';
			cleanContent = cleanContent.replace(new RegExp(`<@&${roleID}>`, 'g'), `@${roleName}`);
		});
	}

	message.channelMentions.forEach((id) => {
		const channel = client.getChannel(id);
		if (channel && channel.name && channel.mention) {
			cleanContent = cleanContent.replace(channel.mention, `#${channel.name}`);
		}
	});

	return cleanContent.replace(/@everyone/g, '@\u200beveryone').replace(/@here/g, '@\u200bhere');
};

module.exports = async (message, callback) => {
	const mss = {};

	// Set default values
	mss.content = message.content.trim() || '';
	mss.prefix = prefixes.find(prefix => mss.content.toLowerCase().startsWith(prefix)) || '';
	mss.command = '';
	mss.input = '';
	mss.admin = 0;

	i18n.init(message);

	// If there's a prefix, get rid of the prefix and check for any command
	if (mss.prefix && !message.author.bot) {
		const noprefix = mss.content.substring(mss.prefix.length).trim();
		mss.command = Object.keys(commands).find(command => noprefix.startsWith(command)) || '';
		if (mss.command) {
			mss.input = noprefix.substring(mss.command.length).trim();
			mss.cleanInput = clean(message, mss.input);
		}
	}

	// Set the permission level
	/*
	 * 3: Administrator of the bot
	 * 2: Has administrator role
	 * 1: Can kick/ban
	 */
	if (config.get('discord').admins.includes(message.author.id)) {
		mss.admin = 3;
	} else if (message.member && message.member.permission.has('administrator')) {
		mss.admin = 2;
	} else if (message.member && (message.member.permission.has('kickMembers') || message.member.permission.has('banMembers'))) {
		mss.admin = 1;
	}

	message.mss = mss;

	const locale = await r.table('i18n')
		.get(message.author.id);

	message.setLocale((locale && locale.lang) || 'en-gb');
	callback();
};
