/* eslint-disable no-shadow-restricted-names */

const Discord = require('discord.js');
const db = require('quick.db');

/* eslint-disable no-unused-vars */
module.exports = {
	commands: ['kick'],
	minArgs: 0,
	maxArgs: 100,
	callback: (message, arguments, text) => {
		let prefix;
		const member = message.mentions.members.first();
		const cprefix = db.get(`prefix_${message.guild}`);
		if (cprefix == null) {
			prefix = '!';
		}
		else {
			prefix = cprefix;
		}
		const args = message.content.slice(prefix.length).trim().split(' ');
		const reason = args.splice(2, 100).join(' ');
		const immuneid = message.guild.roles.cache.find(r => r.id === '859583876078895136');
		const botdevid = '519660875842584596';
		const logs = db.get(`logchannel_${message.guild}`);
		const logc = message.guild.channels.cache.find(c => c.id == logs);
		const usage = new Discord.MessageEmbed();
		usage.setTitle(`Usage: ${prefix}kick (@user) (reason)`);
		usage.setColor('RANDOM');
		if (!message.member.hasPermission('KICK_MEMBERS')) {
			return;
		}
		else if(!member) {
			message.channel.send(usage);
		}
		else if (member.hasPermission(['ADMINISTRATOR'])) {
			message.channel.send('You cant kick administrators.');
		}
		else if (!reason) {
			message.channel.send(usage);
		}
		else if (member == message.guild.owner.id) {
			message.channel.send('You cannot ban the server owner.');
		}
		else {
			member.kick();
			const embed = new Discord.MessageEmbed();
			embed.setTitle('User Kicked');
			embed.setDescription('The specified user has been kicked.');
			embed.addField('Kicked User:\n', `${member}`);
			embed.addField('Reason:\n', `${reason}`);
			embed.addField('Moderator:\n', `${message.author}`);
			embed.setTimestamp();
			embed.setThumbnail('https://upload.wikimedia.org/wikipedia/commons/thumb/e/e1/Removed.svg/696px-Removed.svg.png');
			embed.setColor('#ffee9c');
			logc.send(embed);
		}


	},
	requiredRoles: ['moderator'],
};