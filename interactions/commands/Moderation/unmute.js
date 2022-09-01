const { EmbedBuilder, InteractionType, PermissionFlagsBits, SlashCommandBuilder } = require('discord.js');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('unmute')
    .setDescription(`Unmutes a user.`)
    .addUserOption((option) => option
      .setName('user')
      .setDescription(`The user that you want to unmute.`)
      .setRequired(true)
    )
    .addStringOption((option) => option
      .setName('reason')
      .setDescription(`The reason you're unmuting this user.`)
      .setRequired(false)
    )
  .setDefaultMemberPermissions(PermissionFlagsBits.KickMembers),
  cooldown: 5000,
  category: 'Moderation',
  usage: '/unmute <member> <reason>',
  async execute(interaction) {

    if(interaction.type != InteractionType.ApplicationCommand) return;
    
    const member = interaction.options.getMember('user');
    const reason = interaction.options.getString('reason') || 'No reason provided.'
    
    const unmuteEmbed = new EmbedBuilder()
      .setColor('BLURPLE')
      .setTitle(`**Unmuted!**`)
      .setDescription(`***Successfully unmuted*** ${member}! || ${reason} `)
      .setTimestamp();
      
        await member.timeout(null, reason)
        member.send(`You have been unmuted in ${interaction.guild.name}.`);
        interaction.reply({embeds: [unmuteEmbed]});


  }
}