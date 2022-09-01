const { InteractionType, SlashCommandBuilder } = require('discord.js');
const { Trivia } = require('discord-gamecord');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('trivia')
		.setDescription('Play Trivia on Discord!'),
  cooldown: 10000,
  category: 'Fun',
  usage: '/trivia',
	async execute(interaction, client) {

       if(interaction.type != InteractionType.ApplicationCommand) return;
    if (!interaction.isChatInputCommand()) return;
    
        new Trivia({
            message: interaction,
            slash_command: true,
            embed: {
              title: 'Trivia',
              description: 'You have {time} seconds to respond!',
              color: '#5865F2',
            },
            difficulty: 'medium',
            winMessage: 'Correct! The answer was **{answer}**',
            loseMessage: 'Incorrect! The correct answer was **{answer}**',
            othersMessage: 'Nice try.',
        }).startGame();
	},  
};