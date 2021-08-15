const { SlashCommandBuilder } = require('@discordjs/builders');
const { Client, Collection, Intents } = require('discord.js');

module.exports = {

    data: new SlashCommandBuilder()
        .setName('ping')
        .setDescription('The goose will use advanced tech to find out the websocket heartbeat.'),
        
    async execute(interaction) {
        await interaction.reply(`**HONK HONK!** My tech reports show that the websocket heartbeat is currently ${interaction.client.ws.ping} ms. <:gooseThonk:876124917270188043>`);
    },
};