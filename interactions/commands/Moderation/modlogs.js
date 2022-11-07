const {
  ActionRowBuilder,
  EmbedBuilder,
  InteractionType,
  PermissionFlagsBits,
  SelectMenuBuilder,
	SlashCommandBuilder
} = require('discord.js');

const warndb = require('../../../models/warndb');
const mutedb = require('../../../models/mutedb');
const kickdb = require('../../../models/kickdb');
const bandb = require('../../../models/bandb');
const moment = require('moment');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('modlogs')
    .setDescription(`Displays the number of modlogs a user has.`)
    .addStringOption((option) => option
      .setName('userid')
      .setDescription(`The userid of the user you want to view the modlogs of.`)
      .setRequired(true)
    ),
  cooldown: 5000,
  category: 'Moderation',
  usage: '/modlogs <member>',
  async execute(interaction) {
    if (!interaction.isChatInputCommand()) return;
    
    const options = interaction.options;

      const target = options.get('userid')?.value;

      const userId = target;
      const userWarnings = await warndb.find({      
      userId: userId,
      guildId: interaction.guildId
    })
    const userMutes = await mutedb.find({
      //userId: user.id,
      userId: userId,
      guildId: interaction.guildId
    })
    const userKicks = await kickdb.find({
      userId: userId,
      //userId: user.id,
      guildId: interaction.guildId
    })
    const userBans = await bandb.find({
      userId: userId,
      //userId: user.id,
      guildId: interaction.guildId
    })
    if(!userWarnings?.length && !userMutes?.length && !userKicks?.length && !userBans?.length) return interaction.reply({content: `This member has no infractions in this server.`});
    

    const row = new ActionRowBuilder()
      .addComponents(
        new SelectMenuBuilder()
          .setCustomId('select')
          .setPlaceholder('Select action type')
          .addOptions(
            {
              label: 'Warnings',
              value: 'warnings',
              description: 'Warnings'
            },
            {
              label: 'Mutes',
              value: 'mutes',
              description: 'Mutes'
            },
            {
              label: 'Kicks',
              value: 'kicks',
              description: 'Kicks'
            },
            {
              label: 'Bans',
              value: 'bans',
              description: 'Bans'
            }
          )
      )

      const filter = (int) => int.customId === 'select' && int.user.id === userId;

    const warnField = userWarnings.map((warn) => {
      const warnModerator = interaction.guild.members.cache.get(warn.moderatorId);

      return [
        `warnId: ${warn._id}`,
        `Moderator: ${warnModerator || 'Has Left'}`,
        `Date: ${moment(warn.timestamp).format("MMMM Do YYYY")}`,
        `Reason: ${warn.reason}`,
      ].join("\n")    
    })
    .join("\n\n");
    const muteField = userMutes.map((mute) => {
        const muteModerator = interaction.guild.members.cache.get(mute.moderatorId);

        return [
          `muteId: ${mute._id}`,
          `Moderator: ${muteModerator || 'Has Left'}`,
          `Date: ${moment(mute.timestamp).format("MMMM Do YYYY")}`,
          `Duration: ${mute.duration}`,
          `Reason: ${mute.reason}`,
        ].join("\n")
        }).join("\n\n")
    const kickField = userKicks.map((kick) => {
        const kickModerator = interaction.guild.members.cache.get(kick.moderatorId);

        return [
          `kickId: ${kick._id}`,
          `Moderator: ${kickModerator || 'Has Left'}`,
          `Date: ${moment(kick.timestamp).format("MMMM Do YYYY")}`,
          `Reason: ${kick.reason}`,
        ].join("\n")
        }).join("\n\n");
    const banField = userBans.map((ban) => {
        const banModerator = interaction.guild.members.cache.get(ban.moderatorId);

        return [
          `banId: ${ban._id}`,
          `Moderator: ${banModerator || 'Has Left'}`,
          `Date: ${moment(ban.timestamp).format("MMMM Do YYYY")}`,
          
          `Reason: ${ban.reason}`,
        ].join("\n")
        }).join("\n\n");

        let collector = interaction.channel.createMessageComponentCollector({ filter, time: 60000 });


        collector.on('collect', async (i) => {
            let cat = i.values.join('')
            if(cat === 'warnings'){
              await i.update({ embeds: [new EmbedBuilder()
              .setTitle(`${interaction.user.username}'s warns.`)
              .setDescription(`Total warns: ${warnField.length}`)
              .addFields({ name: `Warns`, value: warnField || 'No warns.' })] })
            } else if(cat === 'mutes'){
              await i.update({ embeds: [new EmbedBuilder()
              .setTitle(`${interaction.user.username}'s mutes.`)
              .setDescription(`Total mutes: ${muteField.length}`)
              .addFields({ name: `Mutes`, value: muteField || 'No mutes.' })] })
            } else if(cat === 'kicks'){
              await i.update({ embeds: [new EmbedBuilder()
              .setTitle(`${interaction.user.username}'s kicks.`)
              .setDescription(`Total kicks: ${kickField.length}`)
              .addFields({ name: `Kicks`, value: kickField || 'No kicks.' })] })
            } else if(cat === 'bans'){
              await i.update({ embeds: [new EmbedBuilder()
              .setTitle(`${interaction.user.username}'s bans.`)
              .setDescription(`Total bans: ${banField.length}`)
              .addFields({ name: `Bans`, value: banField || 'No bans.' })] })
            }
        });
     await interaction.reply({ components: [row] })
  
  }
}