const { InteractionType, PermissionFlagsBits, SlashCommandBuilder } = require('discord.js');

const bandb = require('../../../models/bandb');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('delban')
    .setDescription(`Allows a Staff Member with sufficient permissions to remove a ban log from a member in the server .`)
    .addStringOption((option) => option
      .setName('banid')
      .setDescription('ID of the modlog you want to delete')
      .setRequired(true)
    )
    .setDefaultMemberPermissions(PermissionFlagsBits.BanMembers),
  cooldown: 5000,
  category: 'Moderation',
  usage: '/delban <ban id>',
  async execute(interaction) {

     if(interaction.type != InteractionType.ApplicationCommand) return;
    if (!interaction.isChatInputCommand()) return;
    
   const banId = interaction.options.getString('banid');

    const data = await bandb.findById(banId);
    if(!data) return interaction.reply({
      content: `${banId} is not a valid id!`
    });
    data.delete();

    const user = interaction.guild.members.cache.get(data.userId);
    
    return interaction.reply({
      content:  `Successfully removed the ban log from ${user.user.tag}.`
    });

  },
}; 