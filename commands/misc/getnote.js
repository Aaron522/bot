/* eslint-disable quotes */
/* eslint-disable no-shadow-restricted-names */
/* eslint-disable no-unused-vars */
const Discord = require('discord.js');
const db = require('quick.db');
const mysql = require('mysql');
module.exports = {
	commands: ['getnote'],
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
		const user = args[1];
		const usage = new Discord.MessageEmbed();
		usage.setTitle(`Usage: ${prefix}getnote (@user)`);
		usage.setColor('RANDOM');
		const checknote = db.get(`note_${user}`);
		if (!user) {
			message.channel.send(usage);
		}
		else if (checknote == null) {
			message.channel.send(`${user} has no note yet.`);
		}
		else {
			message.channel.send(`${user}'s note is **${db.get(`note_${user}`)}**`);

		}

	},
};