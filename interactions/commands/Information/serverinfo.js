const { EmbedBuilder, InteractionType, SlashCommandBuilder } = require('discord.js');
const moment = require('moment');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('serverinfo')
    .setDescription(`Displays information about the server you're in.`),
  cooldown: 3000,
  category: 'Information',
  usage: '/serverinfo',
  async execute(interaction, client) {

     if(interaction.type != InteractionType.ApplicationCommand) return;
    if (!interaction.isChatInputCommand()) return;

    interaction.guild.members.fetch({ withPresences: true }).then(fetchedMembers => {
	const totalOnline = fetchedMembers.filter(member => member.presence?.status === 'online');
});
    
    const ownerId = interaction.guild.ownerId;
    const serverInfoEmbed = new EmbedBuilder()
      .setColor('BLURPLE')
      .setTitle('Server Information')
      .addFields(
        { name: 'Server Name', value: `${interaction.guild.name}` },
        { name: 'Server ID', value: `${interaction.guild.id}` },
        { name: 'Server Description', value: `${interaction.guild.description || 'No Description'}` },
        {name: 'Total Members Currently Online', value: totalOnline},
        { name: 'Total Members', value: `${interaction.guild.memberCount}` },
        { name: 'Owner', value: `<@${ownerId}>` },
        { name: 'Created At', value: `${moment(interaction.guild.createdTimestamp).format('LT')} ${moment(interaction.guild.createdTimestamp).format('LL')} (${moment(interaction.guild.createdTimestamp).fromNow()})` },
        { name: 'Role Count', value: `${interaction.guild.roles.cache.size}`, inline: true},
        { name: 'Channel Count', value: `${interaction.guild.channels.cache.size}`, inline: true},
        { name: 'Custom Emoji Count', value: `${interaction.guild.emojis.cache.size}`, inline: true },
        { name: 'Boost Count', value: `${interaction.guild.premiumSubscriptionCount || '0'}` },
        { name: 'Verified?', value: `${interaction.guild.verified}`, inline: true},
        { name: 'Partnered?', value: `${interaction.guild.partnered}`, inline: true}
      )
      .setThumbnail(interaction.guild.iconURL({ dynamic: true }))
      .setTimestamp();
    interaction.reply({ embeds: [serverInfoEmbed] });
  }
}