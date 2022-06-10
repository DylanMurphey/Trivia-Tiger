const { SlashCommandBuilder } = require('@discordjs/builders');
const { SendQuizQuestion } = require('./lib/postquiz');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('testq')
		.setDescription('Display a test question'),
	async execute(interaction) {
		SendQuizQuestion(interaction);
	},
};