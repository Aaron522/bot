/* eslint-disable no-shadow */
/* eslint-disable no-shadow-restricted-names */
/* eslint-disable no-unused-vars */

const Discord = require('discord.js');
const db = require('quick.db');
module.exports = {
	commands: ['suggest'],
	minArgs: 0,
	maxArgs: 0,
	callback: (message, arguments, text) => {
		const user = message.author;
		message.channel.send('Enter your suggestion');
		const filter = m => m.author == user;
		const collector = message.channel.createMessageCollector(filter, { time: 150000, max: 1 });

		collector.on('collect', message => {
			let prefix;
			const cprefix = db.get(`prefix_${message.guild}`);
			if (cprefix == null) {
				prefix = '!';
			}
			else {
				prefix = cprefix;
			}
			const sug = db.get(`suggestchannel_${message.guild}`);
			const tosend = message.guild.channels.cache.find(c => c.id == sug);
			if (sug == null) {
				message.channel.send(`There is no configured suggestions channel, please set one using the **${prefix}suggestionchannel** command.`);
			}
			else {
				message.channel.send(`Suggestion submitted in ${tosend}`);
				const sembed = new Discord.MessageEmbed();
				sembed.setTitle('Suggestion');
				sembed.addField('User', `${user}`);
				sembed.addField('Suggestion', `${message.content}`);
				sembed.setColor('RANDOM');
				tosend.send(sembed).then(s => {
					s.react('👍');
					s.react('👎');
				});
			}

		});
	},

};