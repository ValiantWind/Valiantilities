require('dotenv').config;

const fs = require('fs');
const { Client, Collection, GatewayIntentBits, Partials, REST } = require('discord.js');
const { Routes } = require("discord-api-types/v10");
const token = process.env.token
const clientId = process.env.clientId

const client = new Client({
	intents: [
  GatewayIntentBits.Guilds,
  GatewayIntentBits.GuildMembers,
  GatewayIntentBits.GuildBans,
  GatewayIntentBits.GuildEmojisAndStickers,
  GatewayIntentBits.GuildVoiceStates,
  GatewayIntentBits.GuildPresences,
  GatewayIntentBits.GuildMessages,
  GatewayIntentBits.GuildMessageReactions,
  GatewayIntentBits.DirectMessages,
  ],
  partials: [
    Partials.User,
    Partials.Message,
    Partials.Channel,
  ],
});


module.exports = client;

require("./handler")(client);


client.commands = new Collection();
client.categories = new Collection();
client.usages = new Collection();
client.cooldowns = new Collection();

///////////////Slash Commands///////////////////

const commands = fs.readdirSync('./interactions/commands')

for (const module of commands) {
	const commandFiles = fs
		.readdirSync(`./interactions/commands/${module}`)
		.filter((file) => file.endsWith(".js"));

	for (const commandFile of commandFiles) {
		const command = require(`./interactions/commands/${module}/${commandFile}`);
		client.commands.set(command.data.name, command)
	}
}

const eventFiles = fs
	.readdirSync("./events")
	.filter((file) => file.endsWith(".js"));

for (const file of eventFiles) {
	const event = require(`./events/${file}`);
	if (event.once) {
		client.once(event.name, (...args) => event.execute(...args, client));
	} else {
		client.on(event.name, (...args) => event.execute(...args));
	}
};



const rest = new REST({ version: "10" }).setToken(token);

const commandJsonData = [
	...Array.from(client.commands.values()).map((c) => c.data.toJSON()),
];

(async () => {
	try {
		console.log("Started refreshing application (/) commands.");

		await rest.put(

			Routes.applicationCommands(clientId),
			{ body: commandJsonData }
		);

		console.log("Successfully reloaded application (/) commands.");
	} catch (error) {
		console.error(error);
	}
})();

// client.on('debug', console.log);
    
client.login(token);


process.on('unhandledRejection', error => {
	console.error('Unhandled promise rejection:', error);
});

process.on('uncaughtException', (err, origin) => {
  console.log(`Uncaught Exception: `, err, origin);
  })
process.on('uncaughtExceptionMonitor', (err, origin) => {
  console.log('Uncaught Exception Monitor', err, origin);
  })
