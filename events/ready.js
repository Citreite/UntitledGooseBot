const { Client, Collection, Intents } = require('discord.js');
const client = new Client({ intents: [Intents.FLAGS.GUILDS] });

module.exports = {
	name: 'ready',
	once: true,
	execute(client) {
        client.user.setPresence({ activities: [{ name: 'much honking', type: 'LISTENING'}], status: 'dnd'});
		console.log(`Ready! Logged in as ${client.user.tag}, ready to wreck some chaos inside the server.`);
	},
};