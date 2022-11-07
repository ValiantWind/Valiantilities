require('dotenv').config;
const fs = require('fs');
const { Routes, REST } = require('discord.js');

const token = process.env.token;
const clientId = process.env.clientId;
const guildId = process.env.guildId;

const commands = [];
//const commandsPath = path.join(__dirname, 'commands');

for (const module of commands){
  const commandFiles = fs
		.readdirSync(`./interactions/commands/${module}`)
		.filter((file) => file.endsWith(".js"));
  for (const file of commandFiles) {
	  const command = require(`./interactions/commands/${module}/${file}`);
	    commands.push(command.data.toJSON());
  }
}

const rest = new REST({ version: '10' }).setToken(token);

rest.put(Routes.applicationGuildCommands(clientId, guildId), { body: commands })
	.then(() => console.log('Successfully registered application commands.'))
	.catch(console.error);