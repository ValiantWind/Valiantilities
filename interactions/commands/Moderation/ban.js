const { EmbedBuilder, InteractionType, PermissionFlagsBits, SlashCommandBuilder } = require('discord.js');

const modstatsdb = require('quick.db');
const bandb = require('../../../models/bandb');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('ban')
    .setDescription(`Allows a Staff Member with sufficient permissions to ban a member from the server.`)
    .addUserOption((option) => option
      .setName('user')
      .setDescription(`The user that you want to ban.`)
      .setRequired(true)
    )
    .addStringOption((option) => option
      .setName('reason')
      .setDescription(`The reason you're banning this user.`)
    )
  .setDefaultMemberPermissions(PermissionFlagsBits.BanMembers),
  cooldown: 5000,
  category: 'Moderation',
  usage: '/ban <member> <reason>',
  async execute(interaction) {
     if(interaction.type != InteractionType.ApplicationCommand) return;
    
    const member = interaction.options.getMember('user');
    const reason = interaction.options.getString('reason');


    
    if (member.id == interaction.member.user.id) {
      interaction.reply({ content: `No.`, ephemeral: true });
    }
      
    if (interaction.member.roles.highest.comparePositionTo(member.roles.highest) <= 0) {
      interaction.reply({ content: `Your roles must be higher than the roles of the person you want to ban!`, ephemeral: true });
    } else if (!member.manageable) {
      interaction.reply({ content: `Make sure that my role is higher than the role of the person you want to ban!`, ephemeral: true });
    } else if(!member.bannable){
    interaction.reply({content: 'I am unable to ban this member.', ephemeral: true})
    } else {

  new bandb({
    userId: member.id,
    guildId: interaction.guildId,
    moderatorId: interaction.user.id,
    reason,
    timestamp: Date.now(),
    
  }).save();
      
      const banEmbed = new EmbedBuilder()
      .setColor('BLURPLE')
      .setTitle(`***Banned!***`)
      .setDescription(`***Successfully banned*** ${member}! || ${reason} `)
      .setTimestamp();
      
    
    member.send(`You have been banned in ${interaction.guild.name}. Reason: ${reason}`);
    
  await interaction.guild.members.ban(member);
    modstatsdb.add(`banModstats_${interaction.member.user.id}`, 1)
    modstatsdb.add(`totalModstats_${interaction.member.user.id}`, 1)
    interaction.reply({ embeds: [banEmbed]})
    }
  }
}