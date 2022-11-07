 const { EmbedBuilder, InteractionType, ButtonBuilder, ActionRowBuilder, SlashCommandBuilder } = require('discord.js');
const noblox = require('noblox.js');
const fetch = require('node-fetch');

module.exports = {
  data: new SlashCommandBuilder()
    .setName("groupinfo")
    .setDescription("Displays information about a specific Roblox Group.")
    .addIntegerOption((option) => option
      .setName("groupid")
      .setDescription("ID of the group you want to view the info of.")
      .setRequired(true)
    ),
  cooldown: 3000,
  category: 'Roblox',
  usage: '/groupinfo <roblox group id>',
  async execute(interaction) {

     if(interaction.type != InteractionType.ApplicationCommand) return;
    
    
    const groupId = interaction.options.getInteger("groupid");
    
    await interaction.deferReply();

    try {
      const info = await noblox.getGroup(groupId)
       const groupLogo = await noblox.getLogo(groupId, '720x720', false, 'png')

      let groupShout = info.shout
      let groupShoutMessage;
      if(groupShout === null){
        groupShoutMessage = 'No Group Shout';
      } else {
        groupShoutMessage = groupShout.body
      }

    const res = await fetch(`https://groups.roblox.com/v1/groups/${groupId}/name-history?sortOrder=Asc&limit=10`);


      const row = new ActionRowBuilder()
			.addComponents(
				new ButtonBuilder()
					.setLabel('Group Link')
					.setStyle('Link')
          .setURL(`https://roblox.com/groups/${groupId}/`)
			);

      

      const nameHistory = (await res.json()).data.name;
      
  const embed = new EmbedBuilder()
    .setColor('BLURPLE')
    .setTitle(`${info.name}'s Group Info`)
    .setDescription(info.description)
    .addFields(
      {name: 'Group Owner', value: info.owner.username || 'No Owner'},
      {name: 'Group ID', value: info.id.toString()},
      {name: 'Current Group Shout Message', value: groupShoutMessage || 'No Group Shout'},
      {name: 'Group Open to Everyone?', value: info.publicEntryAllowed.toString()},
      {name: 'Member Count', value: info.memberCount.toString() || 'Not Available'},
      {name: 'Previous Group Name(s)', value: nameHistory || 'No Previous Names'}
    )
    .setTimestamp()
    .setThumbnail(groupLogo)

    interaction.editReply({embeds: [embed], components: [row]})
    } catch(error) {
      console.log(error)
      interaction.editReply({content: 'An Error occured. Make sure the group id you typed in exists or that the group is not banned!'})
    }
  }
};