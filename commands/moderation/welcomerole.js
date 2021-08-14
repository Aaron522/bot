/* eslint-disable no-shadow */
/* eslint-disable no-shadow-restricted-names */
/* eslint-disable no-unused-vars */

const Discord = require('discord.js');
const db = require('quick.db');
module.exports = {
	commands: ['welcomerole'],
	minArgs: 0,
	maxArgs: 0,
	callback: (message, arguments, text) => {
		if(!message.member.hasPermission('ADMINISTRATOR')) {
			message.channel.send('You are not allowed to use this');
		}
		else {
			const user = message.author;
			const member = message.member;
			message.channel.send('Enter a role ID.');
			const filter = m => m.author == user;
			const collector = message.channel.createMessageCollector(filter, { time: 150000, max: 1 });

			collector.on('collect', msg => {
				if (isNaN(msg)) {
					message.channel.send('Enter a valid role ID.');
				}
				else {
					db.set(`welcomerole_${member.guild}`, msg.toString());
					message.channel.send('The welcome role has been <@.');
				}

			});
		}

	},
	requiredRoles: ['moderator'],
};