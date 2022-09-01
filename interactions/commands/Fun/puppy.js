const { InteractionType, SlashCommandBuilder } = require('discord.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('puppy')
		.setDescription('Displays a link to a cute puppy video.'),
  cooldown: 5000,
  category: 'Fun',
  usage: "/puppy",
	async execute(interaction) {
    
     if(interaction.type != InteractionType.ApplicationCommand) return;
    if (!interaction.isChatInputCommand()) return;
    
		return interaction.reply('https://valiantwind.me/puppy');
	},
};