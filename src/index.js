const fs = require('node:fs');
const path = require('node:path');
const { Client, Intents, Collection } = require('discord.js');
const { token } = require('./config.json');
const { waitForDebugger } = require('node:inspector');

const client = new Client({ intents: [Intents.FLAGS.GUILDS] });

client.commands = new Collection();
const commandsPath = path.join(__dirname, 'commands');
const commandFiles = fs.readdirSync(commandsPath).filter(file => file.endsWith('.js'));

for (const file of commandFiles) {
    const filePath = path.join(commandsPath, file);
    const command = require(filePath);
    client.commands.set(command.data.name, command);
}

client.once('ready', () => {
    console.log('Ready!');
});

client.on('interactionCreate', async interaction => {
    if (!interaction.isCommand()) return;

    const command = client.commands.get(interaction.commandName);

    if (!command) return;

    try {
        await command.execute(interaction);
    } catch (error) {
        console.error(error);
        await interaction.reply({ content: 'There was an error while executing this command!', ephemeral: true });
    }
});


client.on('interactionCreate', async interaction => {
    if (!interaction.isButton()) return;
    // interaction.channel.send(`<@${interaction.member.user.id}> locked in for ${interaction.customId}`);

    interaction.reply({ content: `Got it. Locked in for ${interaction.customId}. Feel free to dismiss this message.`, ephemeral: true });
});

// Login to Discord with your client's token
client.login(token);
