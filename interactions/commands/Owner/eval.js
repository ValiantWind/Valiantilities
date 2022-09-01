require('dotenv').config;

const { InteractionType, SlashCommandBuilder } = require('discord.js');
const fetch = require('node-fetch');
const modstatsdb = require('quick.db');

const ownerId = process.env.valiantId

module.exports = {
	data: new SlashCommandBuilder()
		.setName('eval')
		.setDescription("This is an Owner-Only command. Don't bother trying to use, as it will not work.")
  .addUserOption((option) => option
    .setName('user')
    .setDescription("Ignore this command. It won't work for you")
  ),
  cooldown: 5000,
  category: 'Information',
  usage: '/eval',
	async execute(interaction) {

    if(interaction.type != InteractionType.ApplicationCommand) return;

    const member = interaction.options.getMember('user');

    // let totalModstats = modstatsdb.fetch(`totalModstats_${member.id}`)
    // let kickModstats = modstatsdb.fetch(`kickModstats_${member.id}`)
    // let banModstats = modstatsdb.fetch(`banModstats_${member.id}`)
    // let warnModstats = modstatsdb.fetch(`warnModstats_${member.id}`)
    // let muteModstats = modstatsdb.fetch(`muteModstats_${member.id}`)

    if(interaction.user.id === ownerId) {
     interaction.reply('@everyone');
		
    } else {
       interaction.reply('Nice try lol. Only the developer can use this command.');
    }
    
	},
};