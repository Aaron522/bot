/* eslint-disable quotes */
/* eslint-disable no-shadow-restricted-names */
/* eslint-disable no-unused-vars */
const Discord = require('discord.js');
const db = require('quick.db');
/* eslint-disable quotes */
/* eslint-disable no-shadow-restricted-names */
/* eslint-disable no-unused-vars */
module.exports = {
	commands: ['warnings'],
	permissionError: 'You need the required permissions to run this command',
	minArgs: 0,
	maxArgs: 2,
	callback: (message, arguments, text) => {
		const user = message.mentions.members.first() || message.author;
		const usage = new Discord.MessageEmbed();
		usage.setTitle('Usage: `!warnings (@user)`');
		usage.setColor('RANDOM');


		let warnings = db.get(`warnings_${message.guild.id}_${user}`);


		if(warnings === null) warnings = 0;

		const embed = new Discord.MessageEmbed();
		embed.setTitle('Warnings');
		embed.addField('User:', `${user}`);
		embed.addField('Warnings:', `${warnings}`);
		embed.addField('Requested By:', `${message.author}`);
		message.channel.send(embed);


	},
	requiredRoles: ['moderator'],
};