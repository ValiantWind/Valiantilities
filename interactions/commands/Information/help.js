const { EmbedBuilder, InteractionType, SlashCommandBuilder } = require('discord.js');
const { readdirSync } = require('fs');

module.exports = {
    data: new SlashCommandBuilder()
    .setName('help')
    .setDescription(' Displays all the Commands in each category, or the details of a specific command.')
    .addStringOption((option) =>
			option
				.setName("command")
				.setDescription("The specific command to see the info of.")
		),
    category: "Information",
    cooldown: 5000,
    usage: '/help <command (optional)>',
    async execute(interaction, client){
      
      if(interaction.type != InteractionType.ApplicationCommand) return;

        const commandInt = interaction.options.getString("command");
        if (!commandInt) {

            // Get the slash commands of a Bot category
            const infoCommandsList = [];
            readdirSync(`./interactions/commands/Information`).forEach((file) => {
                const filen = require(`../../commands/Information/${file}`);
                const name = `\`${filen.data.name}\``
                infoCommandsList.push(name);
            });

            // Get the slash commands of a Utility category
            const modCommandsList = [];
            readdirSync(`./interactions/commands/Moderation`).forEach((file) => {
                const filen = require(`../../commands/Moderation/${file}`);
                const name = `\`${filen.data.name}\``
                modCommandsList.push(name);
            });


          const funCommandsList = [];
            readdirSync(`./interactions/commands/Fun`).forEach((file) => {
                const filen = require(`../../commands/Fun/${file}`);
                const name = `\`${filen.data.name}\``
                funCommandsList.push(name);
            });
          const robloxCommandsList = [];
            readdirSync(`./interactions/commands/Roblox`).forEach((file) => {
                const filen = require(`../../commands/Roblox/${file}`);
                const name = `\`${filen.data.name}\``
                robloxCommandsList.push(name);
            });

          
            // This is what it commands when using the command without arguments
            const helpEmbed = new EmbedBuilder()
                .setTitle(`Help Menu`)
                .setDescription(`\n**Total Slash Commands:** ${client.commands.size}`)
                .addFields(
                  {name: 'Information Slash Commands', value: infoCommandsList.map((data) => `${data}`).join(", "), inline: true},
                  {name: 'Moderation Slash Commands', value: modCommandsList.map((data) => `${data}`).join(", "), inline: true},
                  {name: 'Fun Slash Commands', value: funCommandsList.map((data) => `${data}`).join(", "), inline: true},
                  {name: 'Roblox Slash Commands', value: robloxCommandsList.map((data) => `${data}`).join(", "), inline: true})
                 
                .setColor('BLURPLE')
                .setTimestamp()

            interaction.reply({ embeds: [helpEmbed] });
        } else {
            let command = client.commands.get(commandInt.toLowerCase());

            
            if (!command) {
                interaction.reply({ content: `There aren't any Slash Commands named "${commandInt}"` });
            } else {

                let name = command.data.name;
                let description = command.data.description || "No description provided."
                let cooldown = command.cooldown || 'No cooldown'
                let category = command.category || 'No category provided.'
              let usage = command.usage || 'No Usage Provided';

                let helpCmdEmbed = new EmbedBuilder()
                    .setTitle(`\`${(name.toLocaleString())}\` Slash Command Info`)
                    .addFields(
                        { name: "Description", value: `${description}` },
                      { name: 'Category', value: `${category}` },
                        { name: 'Cooldown (in seconds)', value: `${cooldown / 1000}` },
                      { name: 'Usage', value: `${usage}` }
                    )
                    .setColor('BLURPLE')
                    .setTimestamp()

                interaction.reply({ embeds: [helpCmdEmbed] });
            }
        }
    },
};