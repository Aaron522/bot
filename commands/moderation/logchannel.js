/* eslint-disable quotes */
/* eslint-disable no-shadow-restricted-names */
/* eslint-disable no-unused-vars */
const Discord = require('discord.js');
const db = require('quick.db');
const mysql = require('mysql');
module.exports = {
	commands: ['logchannel'],
	permissionError: 'You need the required permissions to run this command',
	minArgs: 0,
	maxArgs: 2,
	callback: (message, arguments, text) => {
		let prefix;
		const cprefix = db.get(`prefix_${message.guild}`);
		if (cprefix == null) {
			prefix = '!';
		}
		else {
			prefix = cprefix;
		}
		const args = message.content.slice(prefix.length).trim().split(' ');
		const lchannel = args[1];
		const usage = new Discord.MessageEmbed();
		const checklog = db.get(`logchannel_${message.guild}`);
		usage.setTitle(`Usage: ${prefix}logchannel (channel ID)`);
		usage.setColor('RANDOM');
		if(!lchannel) {
			message.channel.send(usage);
		}
		else if (isNaN(lchannel)) {
			message.channel.send('Enter a valid channel ID.');
		}
		else if (lchannel == checklog) {
			message.channel.send('This is already the log channel.');
		}
		else {
			db.set(`logchannel_${message.guild}`, lchannel.toString());
			message.channel.send(`Log channel set to <#${lchannel}>`);
		}

	},
	requiredRoles: ['moderator'],
};