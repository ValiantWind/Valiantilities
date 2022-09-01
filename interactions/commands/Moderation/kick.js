const { EmbedBuilder, InteractionType, PermissionFlagsBits, SlashCommandBuilder } = require('discord.js');

const kickdb = require('../../../models/kickdb');
const modstatsdb = require('quick.db');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('kick')
    .setDescription(`Allows a Staff Member with sufficient permissions to kick a member out of the server.`)
    .addUserOption((option) => option
      .setName('user')
      .setDescription(`The user that you want to kick.`)
      .setRequired(true)
    )
    .addStringOption((option) => option
      .setName('reason')
      .setDescription(`The reason you're kicking this user for.`)
    )
    .setDefaultMemberPermissions(PermissionFlagsBits.KickMembers),
  cooldown: 5000,
  category: 'Moderation',
  usage: '/kick <member> <reason>',
  async execute(interaction) {

    if(interaction.type != InteractionType.ApplicationCommand) return;

    
    const member = interaction.options.getMember('user');
    const reason = interaction.options.getString('reason') || 'No reason specified.';
    
    if (member.id == interaction.member.user.id) {
      return interaction.reply({ content: `I mean you could just leave the server.` });
    }
    if(interaction.member.roles.highest.comparePositionTo(member.roles.highest) <= 0) {
     return interaction.reply({ content: `Your roles must be higher than the roles of the person you want to kick!`, ephemeral: true });
    } else  if (!member.kickable) {
     return interaction.reply({ content: `I am unable to kick this member.`, ephemeral: true });
    } else if(!member.manageable){
      return interaction.reply({content: "Make sure my role is higher than the roles of the person you want to kick."})
    } else {
    
    
new kickdb({
    userId: member.id,
    guildId: interaction.guildId,
    moderatorId: interaction.user.id,
    reason,
    timestamp: Date.now(),
}).save();


    const kickEmbed = new EmbedBuilder()
      .setColor('BLURPLE')
      .setTitle(`***Kicked!**`)
      .setDescription(`***Successfully kicked **${member}! || ${reason} `)
      .setTimestamp();
    let msg = `You have been kicked from ${interaction.guild.name}. Reason: ${reason}`;
    
    modstatsdb.add(`kickModstat_${interaction.member.user.id}`, 1)
    modstatsdb.add(`totalModstats_${interaction.member.user.id}`, 1)
    member.kick();
    interaction.reply({embeds: kickEmbed});
    await member.send({ content: msg });
  }
  }
}