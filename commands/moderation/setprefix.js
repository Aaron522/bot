/* eslint-disable no-shadow */
/* eslint-disable no-shadow-restricted-names */
/* eslint-disable no-unused-vars */

const Discord = require('discord.js');
const db = require('quick.db');
module.exports = {
	commands: ['setprefix'],
	minArgs: 0,
	maxArgs: 0,
	callback: (message, arguments, text) => {
		const botdevid = '519660875842584596';
		if (!message.member.hasPermission('ADMINISTRATOR') || !message.author.id == botdevid) {
			message.channel.send('You are not allowed to use this.');
		}
		else {
			const user = message.author;
			message.channel.send('Enter your new prefix');
			const filter = m => m.author == user;
			const collector = message.channel.createMessageCollector(filter, { time: 15000, max: 1 });
			collector.on('collect', message => {
				message.channel.send(`Prefix set to **${message}**`);
				db.set(`prefix_${message.guild}`, message.toString());

			});
		}

	},
};
