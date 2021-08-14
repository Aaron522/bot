/* eslint-disable no-shadow */
/* eslint-disable no-shadow-restricted-names */
/* eslint-disable no-unused-vars */

const Discord = require('discord.js');
const db = require('quick.db');
module.exports = {
	commands: ['welcomemessage'],
	minArgs: 0,
	maxArgs: 0,
	callback: (message, arguments, text) => {
		if (!message.member.hasPermission('ADMINISTRATOR')) {
			message.channel.send('You are not allowed to use this');
		}
		else {
			const member = message.member;
			const user = message.author;
			message.channel.send('Enter a welcome message to DM users upon joining.');
			const filter = m => m.author == user;
			const collector = message.channel.createMessageCollector(filter, { time: 1500000, max: 1 });

			collector.on('collect', msg => {
				db.set(`welcomemessage_${member.guild}`, msg.toString());
				message.channel.send('The welcome message has been configured.');


			});
		}

	},
	requiredRoles: ['moderator'],
};