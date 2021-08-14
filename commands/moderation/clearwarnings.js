/* eslint-disable quotes */
/* eslint-disable no-shadow-restricted-names */
/* eslint-disable no-unused-vars */
const Discord = require('discord.js');
const db = require('quick.db');
module.exports = {
	commands: ['clearwarnings', 'clearwarns'],
	permissionError: 'You need the required permissions to run this command',
	minArgs: 0,
	maxArgs: 2,
	callback: (message, arguments, text) => {
		let prefix;
		const user = message.mentions.members.first();
		const warnings = db.get(`warnings_${message.guild.id}_${user}`);
		const usage = new Discord.MessageEmbed();
		const cprefix = db.get(`prefix_${message.guild}`);
		if (cprefix == null) {
			prefix = '!';
		}
		else {
			prefix = cprefix;
		}
		usage.setTitle(`Usage: ${prefix}clearwarnings (@user)`);
		usage.setColor('RANDOM');
		if (!message.member.hasPermission("MANAGE_ROLES")) {
			return;
		}

		else if(!user) {
			message.channel.send(usage);
		}

		else if(!message.author === user) {
			message.channel.send('You cannot clear your own warnings.');
		}

		else if(warnings === null) {
			message.channel.send('This user does not have any current warnings.');
		}
		else {
			db.delete(`warnings_${message.guild.id}_${user}`);
			user.send(`All your warnings were reset by ${message.author} from ${message.guild.name}`);
			message.channel.send(`Reset all warnings for ${user}`);
		}
	},
	requiredRoles: ['moderator'],
};