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


const r = require('./../../db');
const config = require('config');

const getID = string => string.replace(/\D/g, '');

module.exports = [
	{
		aliases: [
			'botinfo',
			'get'
		],
		name: 'botinfo_get',
		uses: 1,
		admin: 0,
		command: async (message) => {
			const id = getID(message.mss.input);
			const bot = await r.table('bots').get(id);
			console.log(bot);
			console.log(JSON.stringify(id));
			if (bot) {
				message.channel.createMessage({
					content: `<@${bot.id}>`,
					embed: {
						title: bot.name,
						description: bot.shortDesc,
						url: `${config.get('webserver').location}bot/${bot.id}`,
						thumbnail: {
							url: bot.avatar
						},
						fields: [
							{
								name: message.__('botinfo_get_invite'),
								value: bot.invite
							},
							{
								name: message.__('botinfo_get_count'),
								value: bot.count
							},
							{
								name: message.__('botinfo_get_owner'),
								value: `<@${bot.owner}>`
							}
						]
					}
				});
			} else {
				message.channel.createMessage(message.__('error_bot_not_found'));
			}
		}
	}
];
