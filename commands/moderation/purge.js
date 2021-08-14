/* eslint-disable quotes */
/* eslint-disable no-shadow-restricted-names */

const db = require('quick.db');
const Discord = require("discord.js");

/* eslint-disable no-unused-vars */
module.exports = {
	commands: ['purge'],
	permissionError: 'You need the required permissions to run this command',
	minArgs: 0,
	maxArgs: 1,
	callback: (message, arguments, text) => {
		let prefix;
		const args = message.content.split(' ').slice(1);
		const amount = args.join(' ');
		const cprefix = db.get(`prefix_${message.guild}`);
		if (cprefix == null) {
			prefix = '!';
		}
		else {
			prefix = cprefix;
		}
		const usage = new Discord.MessageEmbed();
		usage.setTitle(`Usage: ${prefix}purge (amount)`);
		usage.setColor('RANDOM');
		if (!message.member.hasPermission("MANAGE_MESSAGES")) {
			return;
		}
		else if (!amount) {
			message.channel.send(usage);
		}
		else if (isNaN(amount)) {
			message.channel.send('Specify a number only.');
		}
		else if (amount > 100) {
			message.channel.send('You can only delete less than 100 messages at a time.');
		}
		else if (amount < 1) {
			message.channel.send('You must delete 1+ messges.');
		}

		message.channel.messages.fetch({ limit: amount }).then(messages => {
			message.channel.bulkDelete(messages);
		});
	},
	requiredRoles: ['moderator'],
};