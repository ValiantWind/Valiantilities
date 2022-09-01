const { EmbedBuilder, InteractionType, SlashCommandBuilder } = require('discord.js');
const fetch = require('node-fetch');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('koala')
		.setDescription('Displays a random koala photo'),
  cooldown: 3000,
  category: 'Fun',
  usage: "/koala",
	async execute(interaction) {

     if(interaction.type != InteractionType.ApplicationCommand) return;

if (!interaction.isChatInputCommand()) return;
    
		await interaction.deferReply();
    const res = await fetch('https://some-random-api.ml/img/koala');
    const img = (await res.json()).link;
    const embed = new EmbedBuilder()
    .setTitle(`Koala! :D`)
    .setImage(img)
    .setTimestamp()
    .setColor('BLURPLE');
		interaction.editReply({ embeds: [embed] });
	},
};