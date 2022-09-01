const { EmbedBuilder, InteractionType, ChannelType, SlashCommandBuilder } = require('discord.js');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('channelinfo')
    .setDescription(`Gets Info about a channel in the server`)
    .addChannelOption((option) => option
      .setName('channel')
      .setDescription('channel to get the info of')
      .setRequired(true),
    ),
  cooldown: 5000,
  category: 'Information',
  usage: '/channelinfo <channel>',
 async execute(interaction, client) {

    if(interaction.type != InteractionType.ApplicationCommand) return;
   if (!interaction.isChatInputCommand()) return;
   
   const channel = interaction.options.getChannel('channel');
   

		const embed = new EmbedBuilder().setTitle(`${channel.name} Info`);
		if (channel.type === ChannelType.GuildText && channel.topic) {
			embed.setDescription(channel.topic);
		}
		if (channel.rateLimitPerUser) {
			embed.addFields({name: 'Slow Mode:', value: `${channel.rateLimitPerUser} Seconds`, inline: true});
		}
		if (channel.parent) {
			embed.addFields({name: 'Category Name:', value: channel.parent.name});
		}
		if (channel.lastPinTimestamp) {
			embed.addFields({name: 'Last Pin Message At:', value: `<t:${Math.floor(channel.lastPinTimestamp / 1000)}:R>`, inline: true});
		}
		let channelTypes;
		switch (channel.type) {
			case 'GUILD_TEXT':
				channelTypes = 'Text Channel';
				break;
			case 'GUILD_VOICE':
				channelTypes = 'Voice Channel';
				break;
			case 'GUILD_CATEGORY':
				channelTypes = 'Category Channel';
				break;
			case 'GUILD_NEWS':
				channelTypes = 'News Channel';
				break;
			case 'GUILD_NEWS_THREAD':
				channelTypes = 'News Thread Channel';
				break;
			case 'GUILD_PUBLIC_THREAD':
				channelTypes = 'Public Thread Channel';
				break;
			case 'GUILD_PRIVATE_THREAD':
				channelTypes = 'Private Thread Channel';
				break;
			case 'GUILD_STAGE_VOICE':
				channelTypes = 'Stage Channel';
				break;
		}
		embed.addFields({name: 'Channel Type:', value: channelTypes, inline: true },
        {name: "Channel Created About:", value: `<t:${Math.floor(channel.createdTimestamp / 1000)}:R>`, inline: true});
		embed.setColor('BLURPLE');
		interaction.reply({
			embeds: [embed],
		});
  }
}