const { InteractionType } = require('discord.js');
const ms = require('ms-prettify').default;


module.exports = {
	name: "interactionCreate",

	async execute(interaction) {

		

		const { client } = interaction;

		const command = client.commands.get(interaction.commandName);


		if (!command) return;

		try {
      const t = client.cooldowns.get(`${interaction.user.id}_${command.name}`) || 0;
     if (Date.now() - t < 0) return interaction.reply({ content: `You are on a cooldown of ${ms(t - Date.now(), { till: 'second' })}`, ephemeral: true });

        client.cooldowns.set(`${interaction.user.id}_${command.name}`, Date.now() + (command.cooldown || 0));
  
			await command.execute(interaction, client);
		} catch (err) {
			console.error(err);
			await interaction.reply({
				content: "There was an issue while executing that command! Make sure you have the sufficient permissions to do so.",
				ephemeral: true,
			});
		}
	},
};