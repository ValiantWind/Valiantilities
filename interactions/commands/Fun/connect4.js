const { Connect4 } = require('discord-gamecord');
const { InteractionType, SlashCommandBuilder } = require('discord.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('connect4')
		.setDescription('Play Connect 4 on Discord!')
		.addUserOption(option => option
      .setName('opponent')
      .setDescription('Select an opponent to play Connect 4 with!')
      .setRequired(true)),
  cooldown: 30000,
  category: 'Fun',
  usage: '/connect4 <opponent>',
	async execute(interaction) {

    if(interaction.type != InteractionType.ApplicationCommand) return;
    if (!interaction.isChatInputCommand()) return;
    
		new Connect4({
			message: interaction,
			slash_command: true,
			opponent: interaction.options.getUser('opponent'),
			embed: {
			  title: 'Connect 4',
			  color: '#5865F2',
			},
			emojis: {
			  player1: '🔵',
			  player2: '🟡'
			},
			waitMessage: 'Waiting for the opponent...',
			turnMessage: '{emoji} | Its turn of player **{player}**.',
			winMessage: '{emoji} | **{winner}** won the game!',
			gameEndMessage: 'The game did not unfinish :(',
			drawMessage: 'It was a draw!',
			othersMessage: 'Nice try. No sabotaging here.',
			askMessage: 'Hey {opponent}, {challenger} challenged you for a game of Connect 4!',
			cancelMessage: 'Looks like they did not want to have a game of Connect4. \:(',
			timeEndMessage: 'Since the opponent did not answer, I canceled the game!',
		  }).startGame()
	},  
};