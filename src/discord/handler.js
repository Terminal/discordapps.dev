/**
	This is free and unencumbered software released into the public domain.

	Anyone is free to copy, modify, publish, use, compile, sell, or
	distribute this software, either in source code form or as a compiled
	binary, for any purpose, commercial or non-commercial, and by any
	means.

	In jurisdictions that recognize copyright laws, the author or authors
	of this software dedicate any and all copyright interest in the
	software to the public domain. We make this dedication for the benefit
	of the public at large and to the detriment of our heirs and
	successors. We intend this dedication to be an overt act of
	relinquishment in perpetuity of all present and future rights to this
	software under copyright law.

	THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND,
	EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
	MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT.
	IN NO EVENT SHALL THE AUTHORS BE LIABLE FOR ANY CLAIM, DAMAGES OR
	OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE,
	ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR
	OTHER DEALINGS IN THE SOFTWARE.

	For more information, please refer to <http://unlicense.org>
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
