module.exports = {
	name: 'ready',
	once: true,
	async execute(interaction, client) {
    
		console.log(`Ready! Logged in as ${client.user.tag}`);
	},
};