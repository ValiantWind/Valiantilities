const { EmbedBuilder, InteractionType, SlashCommandBuilder } = require('discord.js');
const fetch = require('node-fetch');
module.exports = {
	data: new SlashCommandBuilder()
		.setName('fact')
		.setDescription("Gives you a random and most likely useless fact."),
  cooldown: 3000,
  category: 'Fun',
  usage: "/fact",
	async execute(interaction) {

  if(interaction.type != InteractionType.ApplicationCommand) return;
    if (!interaction.isChatInputCommand()) return;
    
      const response = await fetch('https://uselessfacts.jsph.pl/random.json?language=en');
    await response.json().then(res => {
      interaction.reply({
        embeds: [new EmbedBuilder()
    .setTitle('Your Useless Fact')
    .setDescription(res.text)
    .setColor('BLURPLE')]
      });
    });
	},
};