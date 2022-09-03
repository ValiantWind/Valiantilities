const { EmbedBuilder, InteractionType, PermissionFlagsBits, SlashCommandBuilder } = require('discord.js');

const modstatsdb = require('quick.db');
const mutedb = require('../../../models/mutedb');
const ms = require('ms');
const parseTime = require('parse-duration')

module.exports = {
  data: new SlashCommandBuilder()
    .setName('mute')
    .setDescription(`Restricts a user from sending messages.`)
    .addUserOption((option) => option
      .setName('user')
      .setDescription(`The user that you want to mute.`)
      .setRequired(true)
    )
		  .addStringOption((option) => option
      .setName('duration')
      .setDescription(`The amount of minutes that you want the user to stay muted. (Eg: 1m, 30m, 50m)`)
      .setRequired(true)
    )
    .addStringOption((option) => option
      .setName('reason')
      .setDescription(`The reason you're muting this user for.`)
      .setRequired(true)
    )
  .setDefaultMemberPermissions(PermissionFlagsBits.KickMembers),
  cooldown: 5000,
  category: 'Moderation',
  usage: '/mute <member> <reason> <duration (1m, 1h, 1d)>',
  async execute(interaction) {

    if(interaction.type != InteractionType.ApplicationCommand) return; 
    
    const member = interaction.options.getMember('user');
    const duration = interaction.options.getString('duration');
    const reason = interaction.options.getString('reason') || 'No reason specified.'

    const parsedTime = parseTime(duration);
    

    const muteEmbed = new EmbedBuilder()
      .setColor('BLURPLE')
      .setTitle(`**Muted!**`)
      .setDescription(`***Successfully muted ***${member} for ${duration}! || ${reason} `)
      .setTimestamp();

    let msg = `You have been muted in ${interaction.guild.name}. Reason: ${reason}. Duration: ${duration}.`;
    
      
      if (member.id == interaction.member.user.id) {
      return interaction.reply({ content: `Stupid mod. You can't mute youself. Why would you even want to do that lol`, ephemeral: true });
    }  
    if (interaction.member.roles.highest.comparePositionTo(member.roles.highest) <= 0) {
       interaction.reply({ content: `Your roles must be higher than the roles of the person you want to mute.`, ephemeral: true });
      } else if (parsedTime < ms('1m') || parsedTime > ms('28d')) {
        
      interaction.reply({content:'Please provide a time greater than 1 minute (1m) and less than 28 days (28d)', ephemeral: true})
      } else if (!member.manageable){
         interaction.reply({content: "Make sure my role is higher than the roles of the person you want to mute.", ephemeral: true})
      } else if(!member.moderatable){
         interaction.reply({content: "I am unable to mute this person.", ephemeral: true})
      } else if(member.isCommunicationDisabled()) { 
         interaction.reply('This person is already muted.')
      } else {
        new mutedb({
    userId: member.id,
    guildId: interaction.guildId,
    moderatorId: interaction.user.id,
    duration,
    reason,
    timestamp: Date.now(),
    
  }).save();

        await member.timeout(parsedTime, reason)
        member.send(msg)
        modstatsdb.add(`muteModstats_${interaction.member.user.id}`, 1)
    modstatsdb.add(`totalModstats_${interaction.member.user.id}`, 1)
        interaction.reply({embeds: [muteEmbed]})
      }
  
  }
}