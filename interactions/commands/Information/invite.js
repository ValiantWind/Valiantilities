const { EmbedBuilder, InteractionType, SlashCommandBuilder } = require('discord.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('invite')
		.setDescription('Replies with the Invite Link to the Support Server.'),
  cooldown: 5000,
  category: 'Information',
  usage: '/invite',
	async execute(interaction, client) {

     if(interaction.type != InteractionType.ApplicationCommand) return;
    if (!interaction.isChatInputCommand()) return;
    
    //Discord.js embed
    const embed = new EmbedBuilder()
        .setColor('BLURPLE')
        .setTitle('Invite Link to the Support Server')
        .setURL('https://discord.gg/zPzwgzczHz')
        .setDescription('https://discord.gg/zPzwgzczHz')
        .setTimestamp()

    //Send the embed
    interaction.reply({ embeds: [embed]});
	},
};