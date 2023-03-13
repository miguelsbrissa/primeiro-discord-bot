const { Client, Events, GatewayIntentBits, Collection } = require('discord.js');

//config do dotenv
const dotenv = require('dotenv')
dotenv.config()
const { TOKEN, CLIENT_ID, GUILD_ID } = process.env

//comandos do node para mexer com arquivos
const fs = require('node:fs')
const path = require('node:path')

//pega os arquivos de comandos
const commandsPath = path.join(__dirname, "commands")
const commandsFiles = fs.readdirSync(commandsPath).filter(file => file.endsWith('.js'))
console.log(commandsFiles)

//cria uma Coleção que irá armazenar todos os comandos
const client = new Client({ intents: [GatewayIntentBits.Guilds] });
client.commands = new Collection()

//adiciona na coleção todos os comandos
for (const file of commandsFiles) {
    const filePath = path.join(commandsPath, file)
    const command = require(filePath)

    if ("data" in command && "execute" in command) {
        client.commands.set(command.data.name, command)
    } else {
        console.log(`Esse comando em ${filePath} está com data ou execute ausentes!`)
    }
}


//login do bot
client.once(Events.ClientReady, c => {
    console.log(`Ready! Logged in as ${c.user.tag}`);
});
client.login(TOKEN);

function sendDoc(lang){

    if (lang == "javascript") {
        return "Documentação do Javascript: https://developer.mozilla.org/en-US/docs/Web/JavaScript"
    } else if (lang == "python") {
        return "Documentação do Python: https://www.python.org"
    } else if (lang == "csharp") {
        return "Documentação do C#: https://learn.microsoft.com/en-us/dotnet/csharp/"
    } else if (lang == "discordjs") {
        return "Documentação do Discord.js: https://discordjs.guide/#before-you-begin"
    }
}

//listener de interações com o bot
client.on(Events.InteractionCreate, async interaction => {
    if (interaction.isStringSelectMenu()) {
        const selected = interaction.values[0]
        await interaction.reply(sendDoc(selected))
    }

    if (!interaction.isChatInputCommand()) return

    const command = interaction.client.commands.get(interaction.commandName)

    if (!command) {
        console.error("Comando não encontrado")
        return
    }

    try {
        await command.execute(interaction)
    } catch (error) {
        console.error(error)
        await interaction.reply("Houve um erro ao executar esse comando")
    }
})