/* eslint-disable no-shadow */
/* eslint-disable quotes */
/* eslint-disable no-shadow-restricted-names */
/* eslint-disable no-unused-vars */
const Disord = require('discord.js');
const util = require('util');
module.exports = {
	commands: ['eval'],
	permissionError: 'You need the required permissions to run this command',
	minArgs: 0,
	maxArgs: 1000,
	callback: (message, arguments, text) => {
		const botdevid = '519660875842584596';
		const result = eval(arguments.join(" "));
		if (message.author.id !== botdevid) {
			message.channel.send('Bot dev only');
		}
		else if (!result) {
			message.channel.send('Evaulate something');
		}
		else {
			message.channel.send(result).catch(err => {
				console.log(err);
			});
		}
	},
};