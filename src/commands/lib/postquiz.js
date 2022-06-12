const { MessageActionRow, MessageButton } = require('discord.js');

const DURATION = 15000;

module.exports = {
SendQuizQuestion: async function SendQuizQuestion(interaction, quizQuestion){
    const embed = {
        'title': quizQuestion.question,
        'color': 16744960,
        'thumbnail': {
            'url': 'https://yarharalc.neocities.org/ttassets/eyeglasstiger.png',
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

    const buttonRows = [row1,row2];

    await interaction.reply({ content: 'Quiz running...'});

    let message = await interaction.channel.send({
        embeds: [embed],
        components: buttonRows
    });

    // update buttons for edit
    buttonRows.forEach((row) => {
        row.components.forEach((button) => {
            button.setDisabled(true);
        })
    });

    //update embed for edit
    embed.thumbnail.url = 'https://yarharalc.neocities.org/ttassets/sleepytiger.png'; //sleeping tiger emoji
    embed.fields = [{
        'name':'Correct Answer',
        'value':quizQuestion.choices[quizQuestion.correct]
    }];
    
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
            await message.edit({
                content: "🐯 Time's up!",
                embeds: [embed],
                components: buttonRows
            });

            await interaction.deleteReply();
            // await interaction.channel.send(`The correct answer was \`${quizQuestion.choices[quizQuestion.correct]}\`.`);
            resolve();
        }, DURATION);
        }
    )

    return {responses, message};
}
}