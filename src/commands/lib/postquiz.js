const { MessageActionRow, MessageButton } = require('discord.js');

const duration = 10000;

// const embed = {
//     'title': quizQuestion.question,
//     'color': 16744960,
//     'thumbnail': {
//         'url': 'https://emojipedia-us.s3.dualstack.us-west-1.amazonaws.com/thumbs/160/twitter/53/thinking-face_1f914.png',
//     },
//     // 'image': {
//     //     'url': 'https://i.imgur.com/O37Bdpn.png',
//     // },
//     // 'fields': [
//     //     {
//     //         'name': 'Option 1:',
//     //         'value': quizQuestion.choices[0],
//     //     },
//     //     {
//     //         'name': 'Option 2:',
//     //         'value': quizQuestion.choices[1],
//     //     },
//     //     {
//     //         'name': 'Option 3:',
//     //         'value': quizQuestion.choices[2],
//     //     },
//     //     {
//     //         'name': 'Option 4:',
//     //         'value': quizQuestion.choices[3],
//     //     },
//     // ],
//     footer: {
//         text:  quizQuestion.category + ' - ' + duration/1000 + ' seconds',
//     },
// };

module.exports = {
SendQuizQuestion: async function SendQuizQuestion(interaction, quizQuestion){
    const embed = {
        'title': quizQuestion.question,
        'color': 16744960,
        'thumbnail': {
            'url': 'https://emojipedia-us.s3.dualstack.us-west-1.amazonaws.com/thumbs/160/twitter/53/thinking-face_1f914.png',
        },
        footer: {
            text:  quizQuestion.category + ' - ' + duration/1000 + ' seconds',
        },
    };

    const row1 = new MessageActionRow()
        .addComponents(
            new MessageButton()
                .setCustomId('A')
                .setLabel(quizQuestion.choices[0])
                .setStyle('PRIMARY'),
            new MessageButton()
                .setCustomId('B')
                .setLabel(quizQuestion.choices[1])
                .setStyle('PRIMARY'),
        );
    const row2 = new MessageActionRow()
        .addComponents(
            new MessageButton()
                .setCustomId('C')
                .setLabel(quizQuestion.choices[2])
                .setStyle('PRIMARY'),
            new MessageButton()
                .setCustomId('D')
                .setLabel(quizQuestion.choices[3])
                .setStyle('PRIMARY'),
        );

    await interaction.reply({ content: 'Quiz running...'});

    let message = await interaction.channel.send({
        embeds: [embed],
        components: [row1,row2]
    });

    await new Promise(resolve => {
        setTimeout(async () => {
          await message.delete();
          await interaction.deleteReply();
          await interaction.channel.send(`The correct answer was ${question.choices[question.correct]}`);
          resolve();
        }, duration);
      }
    )
}
}