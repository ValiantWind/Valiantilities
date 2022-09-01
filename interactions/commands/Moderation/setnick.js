const { EmbedBuilder, InteractionType, PermissionFlagsBits, SlashCommandBuilder } = require('discord.js');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('setnick')
    .setDescription(`Allows a Staff Member with sufficient permissions to set the nickname of a member in the server.`)
    .addUserOption((option) => option
      .setName('target')
      .setDescription(`The user that you want to set the nickname of.`)
      .setRequired(true)
    )
    .addStringOption((option) => option
      .setName('nickname')
      .setDescription(`The nickname you want to set for the user.`)
    .setRequired(true)
    )
    .setDefaultMemberPermissions(PermissionFlagsBits.ManageNicknames),
  cooldown: 5000,
  category: 'Moderation',
  usage: '/setnick <member> <new nickname>',
  async execute(interaction) {

    if(interaction.type != InteractionType.ApplicationCommand) return;
    if (!interaction.isChatInputCommand()) return;
    
    const user = interaction.options.getMember('target');
    const newNick = interaction.options.getString('nickname');

if(interaction.member.roles.highest.comparePositionTo(user.roles.highest) <= 0){
      interaction.reply({ content: `Your roles must be higher than the roles of the person you want to set the nickname of.`, ephemeral: true });
} else {
  
      user.setNickname(newNick);
      let embed = new EmbedBuilder()
    .setTitle("Success!")
    .setDescription(`Successfully set ${user.user.tag}'s nickname to ${newNick}`)
    .setColor('BLURPLE')
    .setTimestamp()
   await interaction.reply({embeds: [embed]})
  }
}
}