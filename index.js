// Required imports
const fs = require('fs');
const dotenv = require('dotenv');
const { Client, Collection, Intents } = require('discord.js');
const { REST } = require('@discordjs/rest');
const { Routes } = require('discord-api-types/v9');
const express = require('express');

// Dotenv config
dotenv.config();

// Client setup
const client = new Client({ intents: [Intents.FLAGS.GUILDS] });
client.commands = new Collection();

// Command handling
const commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.js'));

for (const file of commandFiles) {
	const command = require(`./commands/${file}`);
	client.commands.set(command.data.name, command);
}

// Registering slash commands
const commands = [];

// Place your client and guild ids here
const guildId = '876124195241730048'; // The dev server
const clientId = '876091817802739722';

for (const file of commandFiles) {
	const command = require(`./commands/${file}`);
	commands.push(command.data.toJSON());
}

const rest = new REST({ version: '9' }).setToken(process.env.TOKEN);

(async () => {
	try {
		console.log('Started refreshing application (/) commands.');

		/* await rest.put(
            Routes.applicationCommands(clientId), { body: commands },
        ); */ // This is for global commands

        await rest.put(
			Routes.applicationGuildCommands(clientId, guildId),
			{ body: commands },
		); // This is for guild commands

		console.log('Successfully reloaded application (/) commands.');
	} catch (error) {
		console.error(error);
	}
})();

// Event handling
const eventFiles = fs.readdirSync('./events').filter(file => file.endsWith('.js'));

for (const file of eventFiles) {
	const event = require(`./events/${file}`);
	if (event.once) {
		client.once(event.name, (...args) => event.execute(...args, client));
	} else {
		client.on(event.name, (...args) => event.execute(...args, client));
	}
}

client.on('interactionCreate', async interaction => {
	if (!interaction.isCommand()) return;
	const { commandName } = interaction;
	if (!client.commands.has(commandName)) return;

	try {
		await client.commands.get(commandName).execute(interaction);
	} catch (error) {
		console.error(error);
		return interaction.reply({ content: 'There was an error while executing this command!', ephemeral: true });
	}
});

// Log into the client using the environment variable
client.login(process.env.TOKEN);

// Website for uptimerobot to ping
require('http').createServer((req, res) => res.end('Bot is alive!')).listen(3000);