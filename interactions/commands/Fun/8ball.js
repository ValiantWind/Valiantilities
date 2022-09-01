const { InteractionType, SlashCommandBuilder } = require('discord.js');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('8ball')
    .setDescription(`Honestly just search up what a Magic 8-ball is lmao`)
    .addStringOption((option) => option
      .setName('question')
      .setDescription('The question you want to ask to the 100% reliable Magic 8-Ball.')
      .setRequired(true)
    ),
  cooldown: 3000,
  category: 'Fun',
  usage: "/8ball <Your Question>",
  async execute(interaction) {
    if(interaction.type != InteractionType.ApplicationCommand) return;
    if (!interaction.isChatInputCommand()) return;
        
    const question = interaction.options.getString('question');
    
        
    let replies = [
			"Yes, of course",
			"Perhaps not",
			"Definitely not",
      "Definitely",
			"Joe says yes. Blame Joe if something goes wrong",
      "The Karen say No. Try using this command again though since she says no to everything",
      "Reply hazy, try again later",
      "Maybe, maybe not",
      "Of course not dumbo",
      "Leave me alone",
		]
    let random = Math.floor(Math.random() * replies.length);
    
    return interaction.reply(`The Magic 8-Ball Says: ${replies[random]}, <@${interaction.member.id}>.`)  

  }
}