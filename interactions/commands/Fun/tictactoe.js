const { InteractionType, SlashCommandBuilder } = require('discord.js');
const { TicTacToe } = require('discord-gamecord');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('tictactoe')
		.setDescription('Start a game of TicTacToe!')
    .addUserOption((option) => option
      .setName('opponent')
      .setDescription('Select an opponent to play TicTacToe with!')
      .setRequired(true)
      ),
  cooldown: 30000,
  category: 'Fun',
  usage: '/tictactoe <opponent>',
	async execute(interaction) {

     if(interaction.type != InteractionType.ApplicationCommand) return;
    if (!interaction.isChatInputCommand()) return;
    
    new TicTacToe({
      message: interaction,
      slash_command: true,
      opponent: interaction.options.getMember('opponent'),
      embed: {
        title: 'Tic Tac Toe',
        overTitle: 'Game Over',
        color: '#5865F2',
      },
      oEmoji: '🔵',
      xEmoji: '❌',
      blankEmoji: '➖',
      oColor: 'PRIMARY',
      xColor: 'DANGER',
      waitMessage: 'Waiting for the opponent...',
      turnMessage: '{emoji} | Its now **{player}** turn!',
      askMessage: 'Hey {opponent}, {challenger} challenged you for a game of Tic Tac Toe!',
      cancelMessage: 'Looks like they refused to have a game of Tic Tac Toe. \:(',
      timeEndMessage: 'Since the opponent didnt answer, i dropped the game!',
      drawMessage: 'It was a draw!',
      winMessage: '{emoji} | **{winner}** won the game!',
      gameEndMessage: 'The game went unfinished :(',
    }).startGame();
	},  
};