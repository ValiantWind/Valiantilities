const { EmbedBuilder, InteractionType, PermissionFlagsBits, SlashCommandBuilder } = require('discord.js');

const warndb =   require('../../../models/warndb');
const moment = require('moment');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('warnings')
    .setDescription(`Displays the number of warns a user has.`)
    .addUserOption((option) => option
      .setName('target')
      .setDescription(`The user that you want to view the warns of.`)
      .setRequired(true)
    )
    .setDefaultMemberPermissions(PermissionFlagsBits.KickMembers),
  cooldown: 5000,
  category: 'Moderation',
  usage: '/warnings <member>',
  async execute(interaction) {

    if (!interaction.isChatInputCommand()) return;
    
    
    const user = interaction.options.getMember('target');

		try {
			 const userWarnings = await warndb.find({
      userId: user.id,
      guildId: interaction.guildId
    })
    
    if(!userWarnings?.length) return interaction.reply({content: `${user} has no warnings in this server.`});

    const embedDescription = userWarnings.map((warn) => {
      const moderator = interaction.guild.members.cache.get(warn.moderatorId);

      return [
        `warnId: ${warn._id}`,
        `Moderator: ${moderator || 'Has Left'}`,
        `Date: ${moment(warn.timestamp).format("MMMM Do YYYY")}`,
        `Reason: ${warn.reason}`,
      ].join("\n");
    })
    .join("\n\n");


      const embed = new EmbedBuilder()
      .setTitle(`${user.user.tag}'s warnings`)
      .setDescription(embedDescription)
      .setColor('BLURPLE')

   await interaction.reply({embeds: [embed]})
		} catch(e){
			console.log(e);
		}
}
}