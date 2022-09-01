require('dotenv/config');

const fs = require('fs');
const { Client, Collection, GatewayIntentBits, Partials, ActivityType } = require('discord.js');
// const { REST } = require("@discordjs/rest");
// const { Routes } = require("discord-api-types/v9");
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
  GatewayIntentBits.GuildMessageTyping,
  GatewayIntentBits.DirectMessages,
  GatewayIntentBits.MessageContent
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
client.userPerms = new Collection();

const express = require('express')
const app = express();

app.all(`/`, (req, res) => {
    res.send(`The Bot is Online`);
});

function keepAlive() {
    app.listen(4000, () => {
        console.log(`The Server is now ready! | ` + Date.now());
    });
}
 
// app.get('/', (req, res) => res.send('The Bot is Online.'))
 
// app.listen(port, () =>
// console.log(`Your app is listening a http://localhost:${port}`)
// );

// const { GiveawaysManager } = require("discord-giveaways");
// client.giveawaysManager = new GiveawaysManager(client, {
//   storage: "./utils/giveaways.json",
//   default: {
//     botsCanWin: false,
//     embedColor: "BLURPLE",
//     reaction: "🎉",
//     lastChance: {
//       enabled: true,
//       content: `**Last chance to enter the giveaway!**`,
//       threshold: 5000,
//       embedColor: 'BLURPLE'
//     }
//   }
// });


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



// const rest = new REST({ version: "10" }).setToken(token);

// const commandJsonData = [
// 	...Array.from(client.commands.values()).map((c) => c.data.toJSON()),
// ];

// (async () => {
// 	try {
// 		console.log("Started refreshing application (/) commands.");

// 		await rest.put(

// 			Routes.applicationCommands(clientId),
// 			{ body: commandJsonData }
// 		);

// 		console.log("Successfully reloaded application (/) commands.");
// 	} catch (error) {
// 		console.error(error);
// 	}
// })();

client.on('ready', () => {
  client.user.setActivity('with other Chads', { type: ActivityType. Playing});
})

client.on('debug', console.debug)
client.on('error', (e) => console.error(e));
client.on('warning', (e) => console.warn(e));

client.on('shardError', error => {
	console.error('A websocket connection encountered an error:', error);
});
    
client.login(token);
keepAlive();


process.on('unhandledRejection', (reason, promise) => {
	console.error('Unhandled promise rejection:', reason, promise);
});
process.on('warning', (warning) => {
  console.warn(warning.name);    
  console.warn(warning.message);   console.warn(warning.stack);  
});

process.on('uncaughtException', (err, origin) => {
  console.log(`Uncaught Exception: `, err, origin);
})
process.on('uncaughtExceptionMonitor', (err, origin) => {
  console.log('Uncaught Exception Monitor', err, origin);
})