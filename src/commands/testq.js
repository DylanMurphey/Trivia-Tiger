const { SlashCommandBuilder } = require('@discordjs/builders');
const { SendQuizQuestion } = require('./lib/postquiz');
const { GetQuestions }     = require('./lib/getquestions');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('testq')
        .setDescription('Display a test question'),
    async execute(interaction) {
        question = await GetQuestions(interaction);
        SendQuizQuestion(interaction,question);
    },
};