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

const client = require('./..');
const cogs = require('./../cogs');
const { exec } = require('child_process');
const r = require('./../../db');
const i18n = require('i18n');
const os = require('os');
const { inspect } = require('util');

const hardwareinfo = `(${os.arch()}) ${os.cpus()[0].model} @ ${os.cpus()[0].speed} MHz`;
const softwareinfo = `[${os.type()}] ${os.release()}`;

module.exports = [{
	aliases: [
		'ping'
	],
	name: 'ping',
	uses: 1,
	admin: 0,
	command: (message) => {
		let s = 0;

		if (message.channel.guild) {
			s = client.guildShardMap[message.channel.guild.id];
		}

		message.channel.createMessage(`\`\`\`\n${client.shards.map(shard => `${s === shard.id ? '>' : ' '}Shard ${shard.id} | ${shard.latency}ms`).join('\n')}\n\`\`\``);
	}
}, {
	aliases: [
		'eval'
	],
	name: 'eval',
	uses: 1,
	admin: 3,
	command: (message) => {
		try {
			let e = eval(message.mss.input); // eslint-disable-line no-eval

			if (e) {
				if (typeof e !== 'string') {
					e = inspect(e, { depth: 0 });
				}
				message.channel.createMessage(`\`\`\`\n${e}\n\`\`\``);
			}
		} catch (e) {
			message.channel.createMessage(`\`\`\`\n${e}\`\`\``);
		}
	}
}, {
	aliases: [
		'exec'
	],
	name: 'exec',
	uses: 1,
	admin: 3,
	command: (message) => {
		if (message.mss.input) {
			exec(message.mss.input, (error, stdout, stderr) => {
				let output = '';

				if (stdout) {
					output += '=== stdout ===\n';
					output += `${stdout.replace(/`/g, '\'')}\n`;
				}

				if (stderr) {
					output += '=== stderr ===\n';
					output += `${stderr.replace(/`/g, '\'')}\n`;
				}

				message.channel.createMessage(`\n${message.__('exec_output')}\n\`\`\`\n${output}\`\`\``);
			});
		}
	}
}, {
	aliases: [
		'help'
	],
	name: 'help',
	uses: 3,
	admin: 0,
	command: (message) => {
		if (message.mss.input && cogs.commands[message.mss.input]) {
			const command = cogs.commands[message.mss.input];
			const fields = [];
			for (let i = 1; i <= command.uses; i += 1) {
				fields.push({
					name: message.__(`${command.name}_${i}_in`, { prefix: message.mss.prefix, command: command.name }),
					value: message.__(`${command.name}_${i}_out`)
				});
			}

			message.channel.createMessage({
				embed: {
					title: message.__(command.name),
					description: message.__(`${command.name}_desc`),
					fields
				}
			});
		} else if (message.mss.input && cogs.categories[message.mss.input]) {
			message.channel.createMessage({
				embed: {
					title: message.mss.input,
					fields: cogs.categories[message.mss.input]
						.filter(command => message.mss.admin >= command.admin)
						.map(command => ({
							name: command.aliases[0],
							value: message.__(`${command.name}_desc`)
						}))
				}
			});
		} else if (!message.mss.input) {
			Object.keys(cogs.categories).forEach((category) => {
				message.channel.createMessage({
					embed: {
						title: category,
						fields: cogs.categories[category]
							.filter(command => message.mss.admin >= command.admin)
							.map(command => ({
								name: command.aliases[0],
								value: message.__(`${command.name}_desc`)
							}))
					}
				});
			});
		} else {
			message.channel.createMessage(message.__('help_invalid'));
		}
	}
}, {
	aliases: [
		'locale'
	],
	name: 'locale',
	uses: 2,
	admin: 0,
	command: (message) => {
		if (message.mss.input && Object.keys(i18n.getCatalog()).includes(message.mss.input)) {
			r.table('i18n')
				.insert({
					id: message.author.id,
					lang: message.mss.input
				}, {
					conflict: 'update'
				})
				.run();
			message.setLocale(message.mss.input);
			message.channel.createMessage(message.__('locale_set', { locale: message.__(`lang_${message.mss.input}`) }));
		} else {
			message.channel.createMessage(`${message.__('locale_incorrect')}\n${Object.keys(i18n.getCatalog()).map(lang => `\`${lang}\` - ${message.__(`lang_${lang}`)}`).join('\n')}`);
		}
	}
}, {
	aliases: [
		'info'
	],
	name: 'info',
	uses: 1,
	admin: 0,
	command: (message) => {
		const embed = {
			embed: {
				fields: [
					{
						name: message.__('info_nodejs'),
						value: process.version,
						inline: true
					},
					{
						name: message.__('info_guilds'),
						value: client.guilds.size,
						inline: true
					},
					{
						name: message.__('info_pid'),
						value: process.pid,
						inline: true
					},
					{
						name: message.__('info_hard'),
						value: hardwareinfo
					},
					{
						name: message.__('info_soft'),
						value: softwareinfo
					},
					{
						name: message.__('info_licence'),
						value: `[${message.__('info_licencedesc', { name: message.__('website') })}](https://github.com/Terminal/ls.terminal.ink/blob/master/LICENCE)`
					}
				]
			}
		};

		message.channel.createMessage(embed);
	}
}];
