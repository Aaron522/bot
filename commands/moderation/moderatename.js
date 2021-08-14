/* eslint-disable quotes */
/* eslint-disable no-shadow-restricted-names */

const Discord = require("discord.js");
const db = require('quick.db');

/* eslint-disable no-unused-vars */
module.exports = {
	commands: ['moderatename'],
	minArgs: 0,
	maxArgs: 2,
	callback: (message, arguments, text) => {
		let prefix;
		const user = message.member;
		const cprefix = db.get(`prefix_${message.guild}`);
		function uuidv4() {
			return 'xxxxxxx'.replace(/[xy]/g, function(c) {
				const r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
				return v.toString(16);
			});
		}
		if (cprefix == null) {
			prefix = '!';
		}
		else {
			prefix = cprefix;
		}
		const member = message.mentions.members.first();
		const usage = new Discord.MessageEmbed();
		usage.setTitle(`Usage: ${prefix}moderatename (user)`);
		usage.setColor('random');
		if (!member) {
			message.channel.send(usage);
		}
		else {
			member.setNickname(`Moderated Nickname ${uuidv4()}`);
			message.channel.send('Nickname moderated.');

		}

	},
	requiredRoles: ['moderator'],
};