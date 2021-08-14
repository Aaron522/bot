/* eslint-disable no-shadow-restricted-names */

const Discord = require('discord.js');
const db = require('quick.db');

/* eslint-disable no-unused-vars */
module.exports = {
	commands: ['unlock'],
	minArgs: 0,
	maxArgs: 2,
	callback: (message, arguments, text) => {
		let prefix;
		const member = message.author;
		const cprefix = db.get(`prefix_${message.guild}`);
		if (cprefix == null) {
			prefix = '!';
		}
		else {
			prefix = cprefix;
		}
		const usage = new Discord.MessageEmbed();
		usage.setTitle(`Usage: ${prefix}lock`);
		usage.setColor('RANDOM');
		if (!message.member.hasPermission('MANAGE_CHANNELS')) {
			return;
		}
		else {
			const role = message.guild.roles.cache.find(r => r.name === '@everyone');

			message.channel.updateOverwrite(role, { SEND_MESSAGES: true }, 'Overwrite permissions')
				.then(() => message.channel.send('Channel unlocked'))

				.catch(error => {
					console.log('error ' + error);
				});
		}


	},
	requiredRoles: ['moderator'],
};