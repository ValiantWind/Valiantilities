const { EmbedBuilder, InteractionType, SlashCommandBuilder } = require('discord.js');
const fetch = require('node-fetch');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('panda')
		.setDescription('Displays a random panda photo'),
  cooldown: 3000,
  category: 'Fun',
  usage: '/panda',
	async execute(interaction) {

     if(interaction.type != InteractionType.ApplicationCommand) return;
    if (!interaction.isChatInputCommand()) return;
    
		await interaction.deferReply();
    const res = await fetch('https://some-random-api.ml/img/panda');
    const img = (await res.json()).link;
    const embed = new EmbedBuilder()
    .setTitle(`Panda! :D`)
    .setImage(img)
    .setTimestamp()
    .setColor('BLURPLE');
		interaction.editReply({ embeds: [embed] });
	},
};