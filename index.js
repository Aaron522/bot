/* eslint-disable no-empty */
/* eslint-disable no-unused-vars */
const path = require('path');
const db = require('quick.db');
const fs = require('fs');
const Discord = require('discord.js');
const client = new Discord.Client();


const config = require('./config.json');


client.on('ready', async () => {
	console.log('The client is ready!');

	const baseFile = 'command-base.js';
	const commandBase = require(`./commands/${baseFile}`);
	const readCommands = (dir) => {
		const files = fs.readdirSync(path.join(__dirname, dir));
		for (const file of files) {
			const stat = fs.lstatSync(path.join(__dirname, dir, file));
			if (stat.isDirectory()) {
				readCommands(path.join(dir, file));
			}
			else if (file !== baseFile) {
				const option = require(path.join(__dirname, dir, file));
				commandBase(client, option);
			}
		}
		client.user.setActivity(`Listening to ${client.guilds.cache.size} servers. !help`);
	};

	readCommands('commands');
});

client.on('emojiCreate', emoji => {
	console.log(`${emoji.author} created the emoji ${emoji.name}`);
});

client.on('emojiDelete', emoji => {
	console.log(`${emoji.author} removed the emoji ${emoji.name}`);
});

client.on('guildMemberRemove', member => {
	console.log(`${member.user.tag} has left the ${member.guild.name}.`);
});

client.on('guildMemberAdd', (member, guild) => {
	const welcomemsg = db.get(`welcomemessage_${member.guild}`);
	if (welcomemsg == null) {
		member.send('Welcome to the server, we hope you enjoy it here').catch(err => {
			console.log('Could not DM user');
		});
	}
	else {
		member.send(welcomemsg);
	}

	const checkwrole = db.get(`welcomerole_${member.guild}`);
	if (checkwrole == null) {
		console.log('No welcome role configured');
	}
	else {
		member.roles.add(checkwrole);
	}


});

client.login(config.token);
