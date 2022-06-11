const { MessageActionRow, MessageButton } = require('discord.js');

const DURATION = 10000;

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
            text:  quizQuestion.category + ' - ' + DURATION/1000 + ' seconds',
        },
    };

    const row1 = new MessageActionRow()
        .addComponents(
            new MessageButton()
                .setCustomId('0')
                .setLabel(quizQuestion.choices[0])
                .setStyle('PRIMARY'),
            new MessageButton()
                .setCustomId('1')
                .setLabel(quizQuestion.choices[1])
                .setStyle('PRIMARY'),
        );
    const row2 = new MessageActionRow()
        .addComponents(
            new MessageButton()
                .setCustomId('2')
                .setLabel(quizQuestion.choices[2])
                .setStyle('PRIMARY'),
            new MessageButton()
                .setCustomId('3')
                .setLabel(quizQuestion.choices[3])
                .setStyle('PRIMARY'),
        );

    await interaction.reply({ content: 'Quiz running...'});

    let message = await interaction.channel.send({
        embeds: [embed],
        components: [row1,row2]
    });

    let responses = {
        'winners':[],
        'losers':[],
    };

    const collector = message.createMessageComponentCollector({ componentType: 'BUTTON', time : DURATION });

    collector.on('collect', i => {
        if(responses.winners.includes(i.user) || responses.losers.includes(i.user)) {
            i.reply({ content: "You're already locked in! Feel free to dismiss this message.", ephemeral: true });
        } else {
            if(i.customId == quizQuestion.correct) {
                responses.winners.push(i.user);
            } else {
                responses.losers.push(i.user);
            }
            
            i.reply({ content: `Got it. Locked in for \`${quizQuestion.choices[i.customId]}\`. Feel free to dismiss this message.`, ephemeral: true });
        }
    });

    await new Promise(resolve => {
        setTimeout(async () => {
          await message.delete();
          await interaction.deleteReply();
          await interaction.channel.send(`The correct answer was \`${quizQuestion.choices[quizQuestion.correct]}\`.`);
          resolve();
        }, DURATION);
        }
    )

    return responses;
}
}