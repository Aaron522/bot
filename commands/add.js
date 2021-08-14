/* eslint-disable quotes */
/* eslint-disable no-shadow-restricted-names */
/* eslint-disable no-unused-vars */
module.exports = {
	commands: ['add', 'addition'],
	expectedArgs: '<num1> <num2>',
	permissionError: 'You need the required permissions to run this command',
	minArgs: 0,
	maxArgs: 2,
	callback: (message, arguments, text) => {
		message.reply("e");
	},
};