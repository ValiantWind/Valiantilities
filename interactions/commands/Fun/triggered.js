const { Attachment, InteractionType, SlashCommandBuilder } = require('discord.js');
const { Canvas } = require('canvacord');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('triggered')
		.setDescription("Why you so mad bro")
    .addUserOption((option) => option
      .setName('user')
      .setDescription('Person to trigger')
      ),
  cooldown: 3000,
  category: 'Fun',
  usage: '/triggered <optional member>',
	async execute(interaction) {

     if(interaction.type != InteractionType.ApplicationCommand) return;
    if (!interaction.isChatInputCommand()) return;
    
    const user = interaction.options.getMember('user') || interaction.user;
        const avatar = user.displayAvatarURL({ size: 2048, format: "png" });

        const image = await Canvas.trigger(avatar);

        const attachment = new Attachment(image, "xopbottriggered.gif");
        return interaction.reply({ files: [{ attachment: image }] });
	},  
};