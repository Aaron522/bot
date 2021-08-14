/* eslint-disable no-shadow-restricted-names */
/* eslint-disable no-unused-vars */

const Discord = require('discord.js');
const client = new Discord.Client();
const DiscordPages = require('djs-embed-pages');
const db = require('quick.db');
module.exports = {
	commands: ['help'],
	minArgs: 0,
	maxArgs: 0,
	callback: (message, arguments, text) => {
		const embed1 = new Discord.MessageEmbed();
		const embed2 = new Discord.MessageEmbed();
		const embed3 = new Discord.MessageEmbed();
		let prefix;
		const cprefix = db.get(`prefix_${message.guild}`);
		if (cprefix == null) {
			prefix = '!';
		}
		else {
			prefix = cprefix;
		}

		const pages = [
			embed1,
			embed2,
			embed3,
		];

		const embedpages = new DiscordPages({
			pages: pages,
			channel: message.channel,
			restricted: (user) => user.id === message.author.id,
		});
		embed1.setTitle('Help');
		embed1.addField('```MISC```', 'These commands are misc and are mostly used for information and fun!');
		embed1.addField(`${prefix}getnote`, 'Gets the note for a specified user', true);
		embed1.addField(`${prefix}note`, 'Adds a note to the specified user', true);
		embed1.addField(`${prefix}suggest`, 'Allows you to submit a suggestion for the server', true);
		embed1.addField(`${prefix}av`, 'Gets the avatar of yourself or a mentioned user.', true);
		embed1.addField('```ROBLOX API```', 'The following commands interact with the roblox.com API.');
		embed1.addField(`${prefix}groupinfo`, 'This command will get information from a group name specified.', true);
		embed1.addField(`${prefix}robloxinfo`, 'This command will get information from a roblox user specified', true);
		embed1.setThumbnail('https://toppng.com/uploads/preview/red-question-mark-png-11552242990hpigioc6g8.png');
		embed1.setTimestamp();
		embed1.setDescription('This embed will provide you with all the commands our bot has to offer.');
		embed1.setAuthor(`${message.author.username}`);
		embed1.setFooter('EnlessBot 2021 ©️');
		embed1.setColor('#a1ffcd');

		//
		embed2.setTitle('Help');
		embed2.setDescription('This embed will provide you with all the commands our bot has to offer.');
		embed2.setAuthor(`${message.author.username}`);
		embed2.setFooter('EndlessBot 2021 ©️');
		embed2.setTimestamp();
		embed2.setColor('#a1ffcd');
		embed2.addField('```MODERATION```', 'The following commands require the appropriate permissions to be used.');
		embed2.addField(`${prefix}setprefix`, 'Changes the server prefix', true);
		embed2.addField(`${prefix}suggestionchannel`, 'Sets the channel to log suggestions to.', true);
		embed2.addField(`${prefix}welcomerole`, 'Sets the welcome role to give to users upon joining.', true);
		embed2.addField(`${prefix}welcomemessage`, 'Sets the message to DM users upon joining the server.', true);
		embed2.addField(`${prefix}kick`, 'This command will kick a specified user with a reason.', true);
		embed2.addField(`${prefix}unban`, 'This command will unban a specified user.', true);
		embed2.addField(`${prefix}warn`, 'This command will provide a warning to a specified user.', true);

		embed3.setTitle('Help');
		embed3.setDescription('This embed will provide you with all the commands our bot has to offer');
		embed3.setTimestamp();
		embed3.setAuthor(`${message.author.username}`);
		embed3.setColor('#a1ffcd');
		embed3.addField('```MODERATION```', 'The following commands require the appropriate permissions to be used.');
		embed3.addField(`${prefix}warnings`, 'This command will check how many warnings a specified user has', true);
		embed3.addField(`${prefix}clearwarnings`, 'This command will remove all the warnings for a specified user', true);
		embed3.addField(`${prefix}ban`, 'This command will ban a user so they cannot rejoin, it will also delete their messages.', true);
		embed3.addField(`${prefix}softban`, 'This command will ban a user and then unban them straight after, useful for kicking a user and deleting all their messages.', true);
		embed3.addField(`${prefix}mute`, 'This command will mute a user so they cannot send messages, requires a `muted` role to be created.', true);
		embed3.addField(`${prefix}unmute`, 'This command will unmute a user so they can talk again.', true);
		embedpages.createPages();
	},

};