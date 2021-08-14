/* eslint-disable no-shadow-restricted-names */

const Discord = require('discord.js');
const db = require('quick.db');

/* eslint-disable no-unused-vars */
module.exports = {
	commands: ['ban'],
	permissionError: 'You need the required permissions to run this command',
	minArgs: 0,
	maxArgs: 1000,
	callback: (message, arguments, text) => {
		const member = message.mentions.members.first();
		let prefix;
		const cprefix = db.get(`prefix_${message.guild}`);
		if (cprefix == null) {
			prefix = '!';
		}
		else {
			prefix = cprefix;
		}
		const args = message.content.slice(prefix.length).trim().split(' ');
		const reason = args.splice(2, 100).join(' ');
		const botdevid = '519660875842584596';
		const usage = new Discord.MessageEmbed();
		const logs = db.get(`logchannel_${message.guild}`);
		const logc = message.guild.channels.cache.find(c => c.id == logs);

		usage.setTitle(`Usage: ${prefix}ban (@user) (reason)`);
		usage.setColor('RANDOM');
		if (!message.member.hasPermission('BAN_MEMBERS')) {
			return;
		}
		else if (member == message.author) {
			return;
		}
		else if(!member) {
			message.channel.send(usage);
		}
		else if (member.id == botdevid) {
			message.channel.send('No');
		}
		else if (member.id === '741310714593149040') {
			message.channel.send('You cant ban the server owner.');
		}
		else if (member.hasPermission(['ADMINISTRATOR'])) {
			message.channel.send('You cant ban administrators.');
		}
		else if (!reason) {
			message.channel.send(usage);
		}
		else {
			member.ban();
			member.send(`You were banned in **${message.guild.name}** by **${message.author}** for **${reason}**`).catch(err => {
				if (err) {
					console.log(err);
				}
			});
			message.channel.send(`${member} was banned.`);
			const logbed = new Discord.MessageEmbed();
			logbed.setTitle('Ban');
			logbed.setDescription('Member banned.');
			logbed.addField('User', `${member}`);
			logbed.addField('Reason', `${reason}`);
			logbed.addField('Moderator', `${message.author}`);
			logbed.setTimestamp();
			logc.send(logbed);
		}


	},
	requiredRoles: ['moderator'],
};