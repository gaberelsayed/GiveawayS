const keepAlive = require('./server');
const Discord = require('discord.js');
const client = new Discord.Client({ intents: 7753 });
const { AutoPoster } = require('topgg-autoposter');
const ap = AutoPoster(process.env.TOPGG_TOKEN, client)
const fs = require('fs');
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

client.on('messageCreate', message => {
const channel = message.channel.id
    if (message.content === '<@!900628889452314674>') {
      if (message.guild.me.permissionsIn(channel).has(['SEND_MESSAGES', 'READ_MESSAGE_HISTORY'])) {
        message.channel.send(`Hi ${message.author}, my prefix is \`/\`\nIf you are new then start by doing \`/help\` for a list of commands!`);
    } else {
        return
    }
  }
});

keepAlive();
client.login(process.env.TOKEN);
