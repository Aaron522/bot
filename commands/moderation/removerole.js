/* eslint-disable no-shadow-restricted-names */

const Discord = require('discord.js');
const db = require('quick.db');

/* eslint-disable no-unused-vars */
module.exports = {
	commands: ['removerole'],
	minArgs: 0,
	maxArgs: 100,
	callback: (message, arguments, text) => {
		let prefix;
		const user = message.mentions.members.first();
		const cprefix = db.get(`prefix_${message.guild}`);
		if (cprefix == null) {
			prefix = '!';
		}
		else {
			prefix = cprefix;
		}
		const args = message.content.slice(prefix.length).trim().split(' ');
		const role = args.splice(2, 100).join(' ');
		const immuneid = message.guild.roles.cache.find(r => r.id === '859583876078895136');
		const botdevid = '519660875842584596';
		const logs = db.get(`logchannel_${message.guild}`);
		const usage = new Discord.MessageEmbed();
		usage.setTitle(`Usage: ${prefix}removerole (user) (role ID)`);
		usage.setColor('RANDOM');
		if (!user) {
			message.channel.send(usage);
		}
		else if (!role) {
			message.channel.send(usage);
		}
		else if (!user.roles.cache.has(role)) {
			message.channel.send('User does not have this role.');
		}
		else {
			user.roles.remove(role);
			message.channel.send('Role removed.');
		}


	},
	requiredRoles: ['moderator'],
};