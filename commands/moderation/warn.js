/* eslint-disable prefer-const */
/* eslint-disable quotes */
/* eslint-disable no-unused-vars */
/* eslint-disable no-shadow-restricted-names */

const Discord = require('discord.js');
const db = require('quick.db');

/* eslint-disable no-unused-vars */
module.exports = {
	commands: ['warn'],
	minArgs: 0,
	maxArgs: 100,
	callback: (message, arguments, text) => {
		let prefix;


		const wmember = message.mentions.members.first();
		const cprefix = db.get(`prefix_${message.guild}`);
		if (cprefix == null) {
			prefix = '!';
		}
		else {
			prefix = cprefix;
		}
		const args = message.content.slice(prefix.length).trim().split(' ');
		const reason = args.splice(2, 100).join(' ');
		let warnings = db.get(`warnings_${message.guild.id}_${wmember}`);
		const usage = new Discord.MessageEmbed();
		const logs = db.get(`logchannel_${message.guild}`);
		const logc = message.guild.channels.cache.find(c => c.id == logs);
		usage.setTitle(`Usage: ${prefix}warn (@user) (reason)`);
		usage.setColor('RANDOM');

		const botdevid = '519660875842584596';
		if (!message.member.hasPermission('MANAGE_MESSAGES' || 'ADMINISTRATOR')) {
			return;
		}
		else if (!wmember) {
			message.channel.send(usage);
		}
		else if (wmember.hasPermission(['ADMINISTRATOR'])) {
			message.channel.send('You cant warn administrators.');
		}
		else if (!reason) {
			message.channel.send(usage);
		}
		else if(warnings === null) {
			db.set(`warnings_${message.guild.id}_${wmember}`, 1);
			wmember.send(`You have been warned in ${message.guild.name} for ${reason}`);
			const embed = new Discord.MessageEmbed();
			embed.setTitle('Warned');
			embed.setDescription('The specified user has been wanred');
			embed.addField('Member:', `${wmember}`);
			embed.addField('Reason:', `${reason}`);
			embed.addField('Moderator: ', `${message.author}`);
			embed.setColor('#ff8f8f');
			embed.setTimestamp();
			logs.send(embed);
		}
		else if(warnings !== null) {
			db.add(`warnings_${message.guild.id}_${wmember}`, 1);
			wmember.send(`You have been warned in ${message.guild.name} for ${reason}`);
			const eembed = new Discord.MessageEmbed();
			eembed.setTitle('Warned');
			eembed.setDescription('The specified user has been wanred');
			eembed.addField('Member:', `${wmember}`);
			eembed.addField('Reason:', `${reason}`);
			eembed.addField('Moderator: ', `${message.author}`);
			eembed.setColor('#ff8f8f');
			eembed.setTimestamp();
			logc.send(eembed);
		}
	},
	requiredRoles: ['moderator'],
};