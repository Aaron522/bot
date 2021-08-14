/* eslint-disable no-unused-vars */
/* eslint-disable no-shadow-restricted-names */

const db = require('quick.db');
const Discord = require('discord.js');

/* eslint-disable no-unused-vars */
module.exports = {
	commands: ['unmute'],
	minArgs: 0,
	maxArgs: 1,
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
		const role = message.guild.roles.cache.find(r => r.name === 'Muted');
		const usage = new Discord.MessageEmbed();
		const logs = db.get(`logchannel_${message.guild}`);
		const logc = message.guild.channels.cache.find(c => c.id == logs);
		usage.setTitle(`Usage: ${prefix}unmute (@user)`);
		usage.setColor('RANDOM');
		if (!message.member.hasPermission('MANAGE_ROLES')) {
			return;
		}
		else if (!member) {
			message.channel.send(usage);

		}
		else {
			member.roles.remove(role);
			const embed = new Discord.MessageEmbed;
			embed.setTitle('Muted');
			embed.setDescription('User has been unmuted');
			embed.addField('User Unmuted:\n', `${member}`);
			embed.addField('Moderator:\n', `${message.author}`);
			embed.setThumbnail('https://www.vhv.rs/dpng/d/560-5606281_transparent-sound-icon-png-mute-and-unmute-icon.png');
			embed.setColor('#ff8f8f');
			embed.setTimestamp();
			logc.send(embed);
		}


	},
	requiredRoles: ['moderator'],
};

