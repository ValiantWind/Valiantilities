require('dotenv').config;

const { EmbedBuilder, InteractionType, SlashCommandBuilder } = require('discord.js');
//const fetch = require('node-fetch');
const noblox = require('noblox.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('badgeinfo')
		.setDescription('Displays info about a Roblox badge.')
  .addStringOption((option) => option
    .setName('badgeid')
    .setDescription('The ID of the Roblox Badge you want to view the info of.')
    .setRequired(true)
  ),
  cooldown: 5000,
  category: 'Information',
  usage: '/badgeinfo <badgeid>',
	async execute(interaction) {

   if(interaction.type != InteractionType.ApplicationCommand) return;
    if (!interaction.isChatInputCommand()) return;
    

    const badgeId = interaction.options.getString('badgeid');

     const badgeInfo = await noblox.getBadgeInfo(badgeId);

    const row = new ActionRowBuilder()
			.addComponents(
				new ButtonBuilder()
					.setLabel('Badge Link')
					.setStyle('Link')
          .setURL(`https://roblox.com/badges/${badgeId}/`)
			);
    
    
   try {

      const embed = new EmbedBuilder()
        .setTitle(`Info for the "${badgeInfo.name}" Badge`)
        .setDescription(`Earn this Badge from ${badgeInfo.awardingUniverse.name}` || 'Unknown Badge Origin')
        .addFields(
          {name: 'Description', value: badgeInfo.description || 'No Description'},
          {name: 'Enabled?', value: badgeInfo.enabled.toString() || 'Not Available'},
          {name: 'Number of times awarded', value: badgeInfo.statistics.awardedCount.toString() || 'Not Available'},
          {name: 'Number of times awarded yesterday', value: badgeInfo.statistics.pastDayAwardedCount.toString() || 'Not Available'},
          {name: 'Created At', value: badgeInfo.created.toDateString() || 'Not Available'},
          {name: 'Last Updated', value: badgeInfo.updated.toDateString() || 'Not Available'}
        )
        .setColor('BLURPLE')
        .setURL(`https://www.roblox.com/badges/${badgeId}`)
        .setTimestamp()
        //.setThumbnail(thumbnailUrl)
      interaction.reply({embeds: [embed], components: [row]})
   } catch {
      interaction.reply('An Error occured. Make sure the Badge ID you typed you provided is valid.')
}
    
	},
};