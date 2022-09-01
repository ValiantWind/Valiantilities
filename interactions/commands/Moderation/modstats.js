const { EmbedBuilder, InteractionType, PermissionFlagsBits, SlashCommandBuilder } = require('discord.js');

const modstatsdb = require('quick.db');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('modstats')
    .setDescription(`Displays the number of warnings a user has.`)
    .addUserOption((option) => option
      .setName('user')
      .setDescription(`The user that you want to view the modstats of.`)
      .setRequired(true)
    )
.setDefaultMemberPermissions(PermissionFlagsBits.KickMembers),
  cooldown: 5000,
  category: 'Moderation',
  usage: '/modstats <member>',
  async execute(interaction) {

    if(interaction.type != InteractionType.ApplicationCommand) return;
    if (!interaction.isChatInputCommand()) return;

    
    const author = interaction.member.user.username;
    const member = interaction.options.getMember('user') || author;
    
    let totalModstats = modstatsdb.fetch(`totalModstats_${member.id}`)
    let kickModstats = modstatsdb.fetch(`kickModstats_${member.id}`)
    let banModstats = modstatsdb.fetch(`banModstats_${member.id}`)
    let warnModstats = modstatsdb.fetch(`warnModstats_${member.id}`)
    let muteModstats = modstatsdb.fetch(`muteModstats_${member.id}`)
    if(kickModstats == null ){ 
      kickModstats = 0;
    }
    if(banModstats == null){
      banModstats = 0;
    }
    if(warnModstats == null){
      warnModstats = 0;
    }
    if(muteModstats == null){
      muteModstats = 0;
    }
    if(totalModstats == null){
      totalModstats = 0;
    }
    
    let embed = new EmbedBuilder()
        .setTitle(`Modstats of ${member.tag || member.user.tag}`)
        .setDescription(`Total Mod Stats: ${totalModstats}`)
      .addFields(
        {name: 'Total Warn Mod Stats: ', value: warnModstats.toString(), inline: true},
        {name: 'Total Mute Mod Stats: ', value: muteModstats.toString(), inline: true},
        {name: 'Total Kick Mod Stats', value: kickModstats.toString(), inline: true},
        {name: 'Total Ban Mod Stats', value: banModstats.toString(), inline: true}
      )
        .setTimestamp()
        .setColor('BLURPLE')
    interaction.reply({ embeds: [embed] })
  }
}