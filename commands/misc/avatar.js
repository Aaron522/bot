/* eslint-disable quotes */
/* eslint-disable no-shadow-restricted-names */
/* eslint-disable no-unused-vars */
const Discord = require('discord.js');
const db = require('quick.db');
module.exports = {
	commands: ['avatar', 'av'],
	permissionError: 'You need the required permissions to run this command',
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
		const avatarEmbed = require('discord.js-avatar');
		avatarEmbed(message, 'english');


	},
};