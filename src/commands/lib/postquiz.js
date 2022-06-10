const { MessageActionRow, MessageButton } = require('discord.js');

module.exports = {
SendQuizQuestion: async function SendQuizQuestion(interaction){
    const row1 = new MessageActionRow()
        .addComponents(
            new MessageButton()
                .setCustomId('A')
                .setLabel('Here is the button for the first answer.')
                .setStyle('PRIMARY'),
            new MessageButton()
                .setCustomId('B')
                .setLabel('Here is the button for the second answer.')
                .setStyle('PRIMARY'),
        );
    const row2 = new MessageActionRow()
        .addComponents(
            new MessageButton()
                .setCustomId('C')
                .setLabel('Here is the button for the third answer.')
                .setStyle('PRIMARY'),
            new MessageButton()
                .setCustomId('D')
                .setLabel('Here is the button for the fourth answer.')
                .setStyle('PRIMARY'),
        );

    await interaction.reply({ content: 'Pong!', components: [row1,row2] });


}
}