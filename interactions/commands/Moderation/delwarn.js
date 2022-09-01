const { InteractionType, PermissionFlagsBits, SlashCommandBuilder } = require('discord.js');

const warndb = require('../../../models/warndb');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('delwarn')
    .setDescription(`Allows a Staff Member with sufficient permissions to remove a warn from a member in the server .`)
    .addStringOption((option) => option
      .setName('warnid')
      .setDescription('ID of the warn you want to delete')
      .setRequired(true)
    )
    .setDefaultMemberPermissions(PermissionFlagsBits.KickMembers),
  cooldown: 5000,
  category: 'Moderation',
  usage: '/delwarn <warn id>',
  async execute(interaction) {

     if(interaction.type != InteractionType.ApplicationCommand) return;
    if (!interaction.isChatInputCommand()) return;
    
   const warnId = interaction.options.getString('warnid');

    const data = await warndb.findById(warnId);

    if(!data) return interaction.reply({
      content: `${warnId} is not a valid id!`
    });

    data.delete()

    const user = interaction.guild.members.cache.get(data.userId);
  
    return interaction.reply({
      content:  `Successfully removed 1 of ${user}'s warnings.`
    });

  },
}; 