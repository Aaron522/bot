/* eslint-disable quotes */
/* eslint-disable no-shadow-restricted-names */
/* eslint-disable no-unused-vars */
const Discord = require('discord.js');
const mysql = require('mysql');
const db = require('quick.db');
module.exports = {
	commands: ['note'],
	permissionError: 'You need the required permissions to run this command',
	minArgs: 0,
	maxArgs: 100,
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
		const note = args.splice(2, 100).join(' ');
		const usage = new Discord.MessageEmbed();
		usage.setTitle(`Usage: ${prefix}note (@user) (note)`);
		usage.setColor('RANDOM');
		if (!user) {
			message.channel.send(usage);
		}
		else if (!note) {
			message.channel.send(usage);
		}
		else {
			db.set(`note_${user}`, `${note}`);
			const nembed = new Discord.MessageEmbed();
			nembed.setTitle('Note');
			nembed.addField('User', `${user}`);
			nembed.addField('Note', `${note}`);
			nembed.setColor(`RANDOM`);
			message.channel.send(nembed);

		}

	},
};