const { SlashCommandBuilder } = require('@discordjs/builders');
const { SendQuizQuestion } = require('./lib/postquiz');
const { GetQuestions }     = require('./lib/getquestions');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('quickround')
        .setDescription('Play a quick, one-round question!'),
    async execute(interaction) {
        let channel = interaction.channel;
        let question = await GetQuestions(interaction);
        let responses = await SendQuizQuestion(interaction,question);

        let messageContent = "";

        if(responses.winners.length == 0) {
            messageContent += "Nobody got it right. :( You'll get 'em next time!";
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
            messageContent += "\nLosers:";
            for (i in responses.losers) {
                messageContent += ` <@${responses.losers[i].id}>`;
            }
        }

        channel.send(messageContent);
    },
};