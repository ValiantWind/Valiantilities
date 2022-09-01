 const { EmbedBuilder, InteractionType, SlashCommandBuilder } = require('discord.js');
const fetch = require('node-fetch');

module.exports = {
  data: new SlashCommandBuilder()
    .setName("githubinfo")
    .setDescription("Displays information about a specific GitHub User.")
    .addStringOption((option) => option
      .setName("user")
      .setDescription("The GitHub user you want to view info about.")
      .setRequired(true)
    ),
  cooldown: 3000,
  category: 'Information',
  usage: '/githubinfo <github username>',
  async execute(interaction) {

     if(interaction.type != InteractionType.ApplicationCommand) return;
    
    const username = interaction.options.getString("user");

    try {
      fetch(`https://api.github.com/users/${username}`)
        .then(response=>response.json().then(data=>{
            //console.log(data)

          let creationDate = new Date(data.created_at)
          let updateDate = new Date(data.updated_at)
          let id = data.id
          let avatarUrl = `https://avatars.githubusercontent.com/u/${id}?v=4`

          const row = new ActionRowBuilder()
			.addComponents(
				new ButtonBuilder()
					.setLabel('Profile Link')
					.setStyle('Link')
          .setURL(`https://github.com/${username}`)
			);
          
  const embed = new EmbedBuilder()
    .setColor('BLURPLE')
    .setTitle(`${username}'s GitHub Profile`)
    .setURL(data.html_url)
    .setThumbnail(avatarUrl)
    .setDescription('**Description:** ' + data.bio || 'No Description')
    .addFields(
      {name: "Follower Count", value: data.followers.toString(), inline: true},
      {name: "Following Count", value: data.following.toString(), inline: true},
      {name: 'Public Repo Count', value: data.public_repos.toString(), inline: true},
      {name: 'Blog', value: data.blog || 'N/A', inline: false},
      {name: 'Location', value: data.location || 'N/A', inline: true},
      {name: 'Company', value: data.company || 'N/A', inline: true},
      {name: 'Twitter', value: data.twitter_username || 'N/A', inline: true},
      {name: 'Created At', value: creationDate.toDateString(), inline: true},
      {name: 'Profile Last Updated At', value: updateDate.toDateString(), inline: true}
    )
    interaction.reply({embeds: [embed], components: [row]})
            }));
    } catch(error) {
      console.log(error)
      interaction.reply({content: 'An error occured. Make sure the username you typed in is valid and exists!'})
    }
  }
};