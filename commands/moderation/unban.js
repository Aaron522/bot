/* eslint-disable no-unused-vars */
/* eslint-disable no-shadow-restricted-names */

const Discord = require('discord.js');
const db = require('quick.db');

/* eslint-disable no-unused-vars */
module.exports = {
	commands: ['unban'],
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
		const member = args[1];
		const reason = args.splice(2, 100).join(' ');
		const usage = new Discord.MessageEmbed();
		const logs = db.get(`logchannel_${message.guild}`);
		const logc = message.guild.channels.cache.find(c => c.id == logs);
		usage.setTitle(`Usage: ${prefix}unban (@user) (reason)`);
		if (!message.member.hasPermission('BAN_MEMBERS')) {
			return;
		}
		else if (!member) {
			message.channel.send(usage);
		}
		else if (!reason) {
			message.channel.send(usage);
		}
		else {
			message.guild.fetchBans().then(bans => {
				message.guild.members.unban(member);
				const unbanembed = new Discord.MessageEmbed();
				unbanembed.setTitle('User Unbanned');
				unbanembed.setDescription('The specified user has been unbanned from the server');
				unbanembed.addField('Member ID: ', `${member}`);
				unbanembed.addField('Reason: ', `${reason}`);
				unbanembed.addField('Moderator: ', `${message.author}`);
				unbanembed.setTimestamp();
				unbanembed.setColor('#d9d9ff');
				logc.send(unbanembed);
			});
		}


	},
	requiredRoles: ['moderator'],
};