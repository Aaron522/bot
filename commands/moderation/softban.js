/* eslint-disable no-shadow-restricted-names */

const Discord = require('discord.js');
const db = require('quick.db');

/* eslint-disable no-unused-vars */
module.exports = {
	commands: ['softban'],
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
		const botdevid = '519660875842584596';
		const usage = new Discord.MessageEmbed();
		const logc = message.guild.channels.cache.find(c => c.id == logs);
		const logs = db.get(`logchannel_${message.guild}`);
		usage.setTitle(`Usage: ${prefix}softban (@user) (reason)`);
		usage.setColor('RANDOM');
		if (!message.member.hasPermission('BAN_MEMBERS')) {
			return;
		}
		else if(!member) {
			message.channel.send(usage);
		}
		else if (member.hasPermission(['ADMINISTRATOR'])) {
			message.channel.send('You cant softban administrators.');
		}
		else if (!reason) {
			message.channel.send(usage);
		}

		else if (member == message.guild.owner.id) {
			message.channel.send('You cannot softban the server owner.');
		}
		else {
			member.ban({ days: 7 });
			message.guild.members.unban(member);
			const embed = new Discord.MessageEmbed;
			embed.setTitle('User Softbanned');
			embed.setDescription('The specified user has been softbanned.');
			embed.addField('Softbanned User:\n', `${member}`);
			embed.addField('Reason:\n', `${reason}`);
			embed.addField('Moderator:\n', `${message.author}`);
			embed.setTimestamp();
			embed.setThumbnail('https://upload.wikimedia.org/wikipedia/commons/thumb/e/e1/Removed.svg/696px-Removed.svg.png');
			embed.setColor('#ffee9c');
			logc.send(embed);
		}

		const embed = new Discord.MessageEmbed();


	},
	requiredRoles: ['moderator'],
};