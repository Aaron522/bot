/* eslint-disable no-shadow-restricted-names */

const Discord = require('discord.js');
const db = require('quick.db');

/* eslint-disable no-unused-vars */
module.exports = {
	commands: ['addrole'],
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
		const rolecheck = message.guild.roles.cache.find(r => r.id == role);
		const immuneid = message.guild.roles.cache.find(r => r.id === '859583876078895136');
		const botdevid = '519660875842584596';
		const logs = db.get(`logchannel_${message.guild}`);
		const usage = new Discord.MessageEmbed();
		usage.setTitle(`Usage: ${prefix}addrole (user) (role ID)`);
		usage.setColor('RANDOM');
		if (!user) {
			message.channel.send(usage);
		}
		else if (rolecheck == null) {
			message.channel.send('Invalid ID');
		}
		else if (!role) {
			message.channel.send(usage);
		}
		else {
			user.roles.add(role);
			message.channel.send('E');
			message.channel.send(`Role added to ${user}`);
		}


	},
	Permissions: 'KICK_MEMBERS',
};