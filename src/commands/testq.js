const { SlashCommandBuilder } = require('@discordjs/builders');
const { MessageActionRow, MessageButton } = require('discord.js');
const { SendQuizQuestion } = require('./lib/postquiz');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('testq')
		.setDescription('Display a test question'),
	async execute(interaction) {
		SendQuizQuestion(interaction);
	},
};