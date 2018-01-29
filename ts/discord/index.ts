import * as Discord from 'eris';
import config from './../../config';

const client: Discord.Client = new Discord.Client(config.discord.token);

client.connect();
