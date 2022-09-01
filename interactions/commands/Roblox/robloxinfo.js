const { EmbedBuilder, InteractionType, ButtonBuilder, ActionRowBuilder, SlashCommandBuilder } = require('discord.js');

const moment = require('moment');
const noblox = require('noblox.js');
const request = require('request-promise');
const fetch = require('node-fetch');

module.exports = {
  data: new SlashCommandBuilder()
    .setName("robloxinfo")
    .setDescription("Displays information about a specific Roblox User.")
    .addStringOption((option) => option
      .setName("username")
      .setDescription("The user you want to view info about.")
      .setRequired(false)
    ),
  cooldown: 3000,
  category: 'Roblox',
  usage: '/robloxinfo <roblox username>',
  async execute(interaction) {

    if(interaction.type != InteractionType.ApplicationCommand) return;
    
    const username = interaction.options.getString("username");

    interaction.deferReply()

      try {
      // const devForumData = await request({
      //   uri: `https://devforum.roblox.com/u/${username}.json`,
      //   json: true,
      //   simple: false,
      // })
      // let devProfile = devForumData.user

      // let trustLevels = {
      //     4: "Roblox Staff",
      //     3: "Community Editor",
      //     2: "Regular",
      //     1: "Member",
      //     0: "Visitor",
      //   }
      
      const id = await noblox.getIdFromUsername(username)
      const info = await noblox.getPlayerInfo(id)
      const groupId = process.env.groupId

      // let trustLevel;
      // if(!devForumData){
      //   let trustLevel = 'No DevForum Account';
      // } else {
      //  // let trustLevel = trustLevels[devProfile.trust_level] || trustLevels[devForumData.trust_level];
      // }

      //   const res = await fetch(`https://groups.roblox.com/v1/users/${id}/groups/primary/role`);

      //   const primaryGroup = (await res.json()).group.name


      // const avatarurl = await noblox.getPlayerThumbnail([id], '720x720', 'png', false, 'body')

        const row = new ActionRowBuilder()
			.addComponents(
				new ButtonBuilder()
					.setLabel('Profile Link')
					.setStyle('Link')
          .setURL(`https://roblox.com/users/${id}/profile`)
			);

  const embed = new EmbedBuilder()
    .setColor('BLURPLE')
    .setTitle(`${username}'s Profile`)
    .setDescription(info.blurb || 'No Description')
    .addFields(
      {name: 'Display Name', value: info.displayName || 'No Display Name'},
      {name: 'User ID', value: id.toString(), inline: true},
      {name: 'Join Date', value: info.joinDate.toDateString(), inline: true},
      {name: 'Account Age (in days)', value: info.age.toString() || 'Not Available', inline: true},
      {name: 'Friend Count', value: info.friendCount.toString(), inline: true},
      {name: 'Follower Count', value: info.followerCount.toString(), inline: true},
      {name: 'Following Count', value: info.followingCount.toString(), inline: true},
    //  {name: 'Primary Group', value: primaryGroup || 'None'},
      {name: 'Previous Usernames(s)', value: info.oldNames.toString() || 'No Previous Usernames'},
      {name: 'Ban Status', value: info.isBanned.toString()}
      )
    .setTimestamp()
    .setThumbnail(avatarurl[0].imageUrl)

    interaction.editReply({embeds: [embed], components: [row]})
    } catch(error) {
      console.log(error)
      interaction.editReply({content: 'An Error occured. Make sure the username you typed in exists or that the user is not banned!'})
    }
    
  }
};