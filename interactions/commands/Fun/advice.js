const { InteractionType, SlashCommandBuilder } = require('discord.js');
const fetch = require('node-fetch');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('advice')
		.setDescription('Gives you some random advice'),
  cooldown: 3000,
  category: 'Fun',
  usage: '/advice',
	async execute(interaction) {

    if(interaction.type != InteractionType.ApplicationCommand) return;
    if (!interaction.isChatInputCommand()) return;
    
    const res = await fetch('https://api.adviceslip.com/advice');
    const advice = (await res.json()).slip.advice;
    interaction.reply({content: advice})
	},
};