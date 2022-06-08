const MINIMUM_GAME_LENGTH = 1;
const MAXIMUM_GAME_LENGTH = 15;
const DEFAULT_GAME_LENGTH = 5;

const { SlashCommandBuilder } = require('@discordjs/builders');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('trivia')
		.setDescription('Create a game of Trivia Tiger!')
        .addIntegerOption(option =>
            option.setName('rounds')
                .setDescription('Choose from 1-10 rounds (5 by default)')),
	async execute(interaction) {
        // const roundCount = interaction.options.getInteger('rounds');
        roundCount = interaction.options.getInteger('rounds');

        if(!roundCount)
        {
            roundCount = DEFAULT_GAME_LENGTH;
        }

        if(roundCount > MAXIMUM_GAME_LENGTH) {
            await interaction.reply({ content: `Please use ${MAXIMUM_GAME_LENGTH} rounds or less.`, ephemeral: true });
        } else if(roundCount < MINIMUM_GAME_LENGTH) {
            await interaction.reply({ content: `There must be at least one round!`, ephemeral: true });
        } else {

            await interaction.reply(`The game can be started with ${roundCount} rounds.`);

            //FUN STUFF GOES HERE

        }
	},
};
