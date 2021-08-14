/* eslint-disable no-undef */
/* eslint-disable no-unused-vars */
/* eslint-disable no-shadow-restricted-names */

const Discord = require('discord.js');
const db = require('quick.db');

/* eslint-disable no-unused-vars */
module.exports = {
	commands: ['mute'],
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
		const logs = db.get(`logchannel_${message.guild}`);
		const role = message.guild.roles.cache.find(r => r.name === 'Muted');
		const logc = message.guild.channels.cache.find(c => c.id == logs);
		if (!role) {
			message.channel.send('Please create a role called `Muted`');
		}
		else {
			const botdevid = '519660875842584596';
			const usage = new Discord.MessageEmbed();
			usage.setTitle(`Usage: ${prefix}mute (@user) (reason)`);
			if (!message.member.hasPermission('MANAGE_ROLES')) {
				return;
			}
			else if (!member) {
				message.channel.send(usage);

			}
			else if (member.hasPermission(['ADMINISTRATOR'])) {
				message.channel.send('You cant mute administrators.');
			}
			else if (!reason) {
				message.channel.send(usage);
			}
			else {
				member.roles.add(role);
				const embed = new Discord.MessageEmbed;
				embed.setTitle('Muted');
				embed.setDescription('User has been muted');
				embed.addField('User Muted:\n', `${member}`);
				embed.addField('Reason:\n', `${reason}`);
				embed.addField('Moderator:\n', `${message.author}`);
				embed.setTimestamp();
				embed.setThumbnail('https://miro.medium.com/max/768/1*n5eFSDjYkA4JaWHr4GrzUQ.png');
				embed.setColor('#ffd1fa');
				embed.setFooter('Bot made by Aaronn#3287');
				logc.send(embed);
			}

		}


	},
	requiredRoles: ['moderator'],
};

