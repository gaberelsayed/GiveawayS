const keepAlive = require('./server');
const Discord = require('discord.js');
const client = new Discord.Client({ intents: 7753 });
const { AutoPoster } = require('topgg-autoposter');
const fs = require('fs');
const ap = AutoPoster(process.env.TOPGG_TOKEN, client);
const config = require('./config.json');
client.config = config;

const { GiveawaysManager } = require('discord-giveaways');
client.giveawaysManager = new GiveawaysManager(client, {
	storage: './storage/giveaways.json',
	default: {
		botsCanWin: false,
		embedColor: 'RANDOM',
		reaction: '🎉',
		lastChance: {
			enabled: true,
			content: `🛑 **Last chance to enter** 🛑`,
			threshold: 5000,
			embedColor: '#FF0000'
		}
	}
});

ap.on('posted', () => {
  console.log('Posted stats to Top.gg!')
})

fs.readdir('./events/discord', (_err, files) => {
	files.forEach(file => {
		if (!file.endsWith('.js')) return;
		const event = require(`./events/discord/${file}`);
		let eventName = file.split('.')[0];
		console.log(`[Event]   ✅  Loaded: ${eventName}`);
		client.on(eventName, event.bind(null, client));
		delete require.cache[require.resolve(`./events/discord/${file}`)];
	});
});

fs.readdir('./events/giveaways', (_err, files) => {
	files.forEach(file => {
		if (!file.endsWith('.js')) return;
		const event = require(`./events/giveaways/${file}`);
		let eventName = file.split('.')[0];
		console.log(`[Event]   🎉 Loaded: ${eventName}`);
		client.giveawaysManager.on(eventName, (...file) =>
			event.execute(...file, client)
		),
			delete require.cache[require.resolve(`./events/giveaways/${file}`)];
	});
});

client.commands = new Discord.Collection();

client.interactions = new Discord.Collection();

client.register_arr = [];
fs.readdir('./slash/', (_err, files) => {
	files.forEach(file => {
		if (!file.endsWith('.js')) return;
		let props = require(`./slash/${file}`);
		let commandName = file.split('.')[0];
		client.interactions.set(commandName, {
			name: commandName,
			...props
		});
		client.register_arr.push(props);
	});
});

client.on('ready', () => {
	client.user.setPresence({
		status: 'online'
	});
});

keepAlive();
client.login(process.env.TOKEN);
