const { SlashCommandBuilder } = require('@discordjs/builders');
const { Client, Collection, Intents } = require('discord.js');

const wait = require('util').promisify(setTimeout);

module.exports = {

    data: new SlashCommandBuilder()
        .setName('remind')
        .setDescription('The goose will remind you to do something after some time.')
        .addIntegerOption(option =>
            option.setName('time')
                .setDescription('The time you want the goose to remind you later (in minutes)')
                .setRequired(true),
        )
        .addStringOption(option =>
            option.setName('stuff')
                .setDescription('What you want the goose to remind you to do (e.g. homework)')
                .setRequired(true)
        ),

    async execute(interaction) {
        const time = interaction.options.getInteger('time');
        const stuff = interaction.options.getString('stuff');
        
        if (time >= 15){
        
        // If the timeframe is more than 15 minutes
        await interaction.reply({ content: `<@${interaction.user.id}> I cannot set a timer for more than 15 minutes; I am too lazy to do that.`, ephemeral: true });

        } else {
        
        // Execute if it is less
        await interaction.reply({ content: `<@${interaction.user.id}> I have set a timer for ${time} minutes to remind you about ${stuff}.`});
        
        await wait(time * 60000); // The time period in minutes
        
        await interaction.deleteReply();
        await interaction.reply({ content:`<@${interaction.user.id}> HONK! It's been ${time} minutes; don't forget to do ${stuff}.`});
        
        }

    },
};