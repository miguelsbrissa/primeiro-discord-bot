const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');
const { data } = require('../data/champions.json')

function sendBuildByChamp(champion) {
    const buildEmbed = new EmbedBuilder()
        .setColor('Red')
        .setTitle(`Build ${champion}`)
        .setThumbnail('https://i.im.ge/2023/03/15/DsM0jp.League-Infobox-Lee-Sin.jpg')
        .addFields(
            { name: 'Skills', value: ' ' },
            { name: 'Ordem para começar', value: 'E>W>Q', inline: true },
            { name: 'Ordem para maximizar', value: 'Q>W>E', inline: true },
            { name: '\u200B', value: '\u200B' },
            { name: 'Itens', value: ' ' },
            { name: 'Itens iniciais', value: 'Smite blue, Poção' },
            { name: 'Botas', value: 'Tabi ou Mercuri' },
            { name: 'Itens', value: 'Gore, Cutelo, Maumotiros/Danca/GA/Chempunk' },

        )
        .addFields(
            { name: '\u200B', value: '\u200B' },
            { name: 'Runas', value: ' ' },
        )
        .setImage('https://i.im.ge/2023/03/15/DsbL1C.conqueror.png')
        .setTimestamp()

    return buildEmbed
}

module.exports = {
    data: new SlashCommandBuilder()
        .setName('build')
        .setDescription('Mostra a build do campeão escolhido')
        .addStringOption(option =>
            option.setName('campeão')
                .setRequired(true)
                .setDescription('Digite o nome do Campeão desejado')
                .setAutocomplete(true)),


    async autocomplete(interaction) {
        const focusedValue = interaction.options.getFocused();
        const choices = data.map(champ => champ.name)
        const filtered = choices.filter(choice => choice.startsWith(focusedValue));
        await interaction.respond(
            filtered.map(choice => ({ name: choice, value: choice })),
        );
    },
    async execute(interaction) {
        const option = interaction.options.getString("campeão")
        await interaction.reply({ content: `Campeão escolhido escolhido: ${option}`, embeds: [sendBuildByChamp(option)] })
    }
};