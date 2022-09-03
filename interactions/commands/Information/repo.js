 const { EmbedBuilder, InteractionType, SlashCommandBuilder, ActionRowBuilder } = require('discord.js');
const fetch = require('node-fetch');

module.exports = {
  data: new SlashCommandBuilder()
    .setName("repo")
    .setDescription("Displays information about a specific GitHub Repository.")
    .addStringOption((option) => option
      .setName("name")
      .setDescription("The FULL GitHub Repository name you want to view info about. (i.e. 'ValiantWind/portfolio') ")
      .setRequired(true)
    ),
  cooldown: 3000,
  category: 'Information',
  usage: '/repo Username/RepoName (i.e. ValiantWind/Chad-Bot)',
  async execute(interaction, client) {

   if(interaction.type != InteractionType.ApplicationCommand) return;
    if (!interaction.isChatInputCommand()) return;
    
   
    const repository = interaction.options.getString("name");

    
    try {
      fetch(`https://api.github.com/repos/${repository}`)
        .then(response => response.json().then(data=>{

          let creationDate = new Date(data.created_at)
          let updateDate = new Date(data.updated_at)
          let id = data.owner.id
          let avatarUrl = `https://avatars.githubusercontent.com/u/${id}?v=4`

              const row = new ActionRowBuilder()
			.addComponents(
				new ButtonBuilder()
					.setLabel('Repository Link')
					.setStyle('Link')
          .setURL(`https://github.com/${repository}`)
			);
  const embed = new EmbedBuilder()
    .setColor('BLURPLE')
    .setTitle(`${repository} Repository Information`)
    .setURL(data.html_url)
    .setThumbnail(avatarUrl)
    .setDescription('**Description:** ' + data.description || 'No Description')
    .addFields(
      {name: 'Owner', value: data.owner.name},
      {name: 'Main Language Used', value: data.language || 'Not Available'},
      {name: 'Template?', value: data.is_template || 'No'},
      {name: 'Fork?', value: data.fork || 'No'},
      {name: 'Star Count', value: data.stargazers_count.toString(), inline: true},
      {name: 'Fork Count', value: data.forks_count.toString(), inline: true},
      {name: 'Watcher Count', value: data.watchers_count.toString(), inline: true},
      {name: 'Subscriber Count', value: data.sunscribers_count, inline: true},
      {name: 'Open Issues', value: data.open_issues_count.toString(), inline: true},
      {name: 'Default Branch', value: data.default_branch || 'Not Available'},
      {name: 'Template?', value: data.is_template || 'No', inline: true},
      {name: 'Archived?', value: data.archived || 'No', inline: true},
      {name: 'License', value: data.license || 'No License'},
      {name: 'Created At', value: creationDate.toDateString(), inline: true},
      {name: 'Last Updated At', value: updateDate.toDateString(), inline: true},
    )
    interaction.reply({embeds: [embed], components: [row]})
            }));
    } catch(error) {
      console.log(error)
      interaction.reply({content: 'An error occured. Make sure the repo name (Format: USERNAME/REPO-NAME) you typed in is valid and exists!'})
    }
  }
};