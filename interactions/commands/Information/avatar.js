const { EmbedBuilder, InteractionType, SlashCommandBuilder } = require('discord.js');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('avatar')
    .setDescription(`Displays a user's avatar`)
    .addUserOption((option) => option
      .setName('user')
      .setDescription('The user you want to view info about.')
    ),
  category: 'Information',
  cooldown: 3000,
  usage: '/avatar <member (optional)>',
 async execute(interaction, client) {

    if(interaction.type != InteractionType.ApplicationCommand) return;
   if (!interaction.isChatInputCommand()) return;
   
   const member = interaction.options.getMember('user') || interaction.user;

     const embed = new EmbedBuilder()
      .setTitle(`${member.tag || member.user.tag}'s Avatar`)
      .setImage(member.displayAvatarURL({ dynamic: true, size:  1024 }))
      .setTimestamp()
      .setColor('BLURPLE');
     interaction.reply({ embeds: [embed] });
  }
}