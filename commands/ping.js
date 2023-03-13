const { SlashCommandBuilder } = require('discord.js')

module.exports = {
    data: new SlashCommandBuilder()
    .setName("ping")//nome q aparece dps da /
    .setDescription("Responde 'Pong!'"),//descrição q aparece

    async execute(interaction){
        await interaction.reply("Pong!")
    }
}
