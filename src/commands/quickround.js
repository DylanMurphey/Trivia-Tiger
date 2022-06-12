const { SlashCommandBuilder } = require('@discordjs/builders');
const { SendQuizQuestion } = require('./lib/postquiz');
const { GetQuestions }     = require('./lib/getquestions');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('quickround')
        .setDescription('Play a quick, one-question round!'),
    async execute(interaction) {
        let localCallId = GLOBAL_CALLS++;

        console.log(`#${localCallId} - START quickround`);

        let channel = interaction.channel;
        let question = await GetQuestions(interaction);
        let quizReturnPackage = await SendQuizQuestion(interaction,question);

        let responses = quizReturnPackage.responses;
        let originalMessage = quizReturnPackage.message;

        let messageContent = "";

        if(responses.winners.length == 0) {
            messageContent += "Nobody got it right, you've got it next time!";
        } else {
            messageContent += "Congratulations to";
            
            for (i in responses.winners) {
                messageContent += ` <@${responses.winners[i].id}>`;
            }

            messageContent += " for getting it right!";

            if(responses.losers.length == 0) {
                messageContent += "\nNobody got it wrong!";
            }
        }
        
        if(responses.losers.length > 0) {
            messageContent += "\nNice try:";
            for (i in responses.losers) {
                messageContent += ` <@${responses.losers[i].id}>`;
            }
        }

        originalMessage.reply(messageContent);

        console.log(`#${localCallId} - STOP quickround`);
    },
};
