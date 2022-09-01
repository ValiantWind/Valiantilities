const { EmbedBuilder, InteractionType, SlashCommandBuilder } = require('discord.js');
const fetch = require('node-fetch');
module.exports = {
	data: new SlashCommandBuilder()
		.setName('dog')
		.setDescription('Displays a random dog photo'),
  cooldown: 3000,
  category: 'Fun',
  usage: '/dog',
	async execute(interaction) {

    if(interaction.type != InteractionType.ApplicationCommand) return;
    if (!interaction.isChatInputCommand()) return;
    
    const res = await fetch('https://dog.ceo/api/breeds/image/random');
    const img = (await res.json()).message;

    const embed = new EmbedBuilder()
    .setTitle(`Doggy! :D`)
    .setImage(img)
    .setTimestamp()
    .setColor('BLURPLE');
		interaction.reply({ embeds: [embed] });
	},
};