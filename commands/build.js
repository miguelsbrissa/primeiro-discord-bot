const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');
const { dataChamps } = require('../data/champions.json')
const { dataBuilds } = require('../data/builds.json')

function sendBuildByChamp(champion) {
    const champion_choosed = dataBuilds.filter(champ => champ.champion_name === champion)
    const buildEmbed = new EmbedBuilder()
        .setColor('Red')
        .setTitle(`Build ${champion_choosed[0].champion_name}`)
        .setThumbnail(champion_choosed[0].image)
        .addFields(
            { name: 'Skills', value: ' ' },
            { name: 'Ordem para começar', value: champion_choosed[0].skill_order, inline: true },
            { name: 'Ordem para maximizar', value: champion_choosed[0].skill_max, inline: true },
            { name: '\u200B', value: '\u200B' },
            { name: 'Itens', value: ' ' },
            { name: 'Itens iniciais', value: champion_choosed[0].initial_items},
            { name: 'Botas', value: champion_choosed[0].boots},
            { name: 'Itens', value: champion_choosed[0].core_items},

        )
        .addFields(
            { name: '\u200B', value: '\u200B' },
            { name: 'Runas', value: ' ' },
        )
        .setImage(champion_choosed[0].runes)
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
        const choices = dataChamps.map(champ => champ.name)
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