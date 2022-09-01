const { InteractionType, SlashCommandBuilder } = require('discord.js');
const ms = require('ms');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('hack')
		.setDescription('"Hack" a random user.')
    .addUserOption((option) => option
        .setName('user')
        .setDescription('User you want to "hack"')
        .setRequired(true)
    ),
  cooldown: 10000,
  category: 'Fun',
  usage: '/hack <user>',
	async execute(interaction) {
    
     if(interaction.type != InteractionType.ApplicationCommand) return;
    if (!interaction.isChatInputCommand()) return;
    
    await interaction.deferReply()
	 const tohack = interaction.options.getMember("user");
    let msg = await interaction.editReply(`Hacking ${tohack.displayName}....`);

    let time = "1s";
    setTimeout(function () {
      interaction.editReply(`Finding ${tohack.displayName}'s Email and Password.....`);
    }, ms(time));

    let time1 = "6s";
    setTimeout(function () {
      interaction.editReply(`E-Mail: ${tohack.displayName}@gmail.com \nPassword: ********`);
    }, ms(time1));

    let time2 = "9s";
    setTimeout(function () {
      interaction.editReply("Finding Other Accounts.....");
    }, ms(time2));

    let time3 = "15s";
    setTimeout(function () {
      interaction.editReply("Hacking Bank Account......");
    }, ms(time3));

    let time4 = "21s";
    setTimeout(function () {
      interaction.editReply(`"Hacked" ${tohack.displayName}'s Bank Account and "stole" all their personal info!`);
    }, ms(time4));

    let time5 = "28s";
    setTimeout(function () {
      interaction.editReply("Hacking Epic Games Account......");
    }, ms(time5));

    let time6 = "31s";
    setTimeout(function () {
      interaction.editReply("Hacked Epic Games Account! ");
    }, ms(time6));

    let time7 = "38s";
    setTimeout(function () {
      interaction.editReply("Collecting all the info and selling it to the FBI.....");
    }, ms(time7));

    let time8 = "41s";
    setTimeout(function () {
      interaction.editReply(`Finished "Hacking" ${tohack.displayName}`);
    }, ms(time8));
	},
};