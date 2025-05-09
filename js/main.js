const { Client, GatewayIntentBits, Events } = require('discord.js');
const client = new Client({
    intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildMessages, GatewayIntentBits.MessageContent],
});

const PREFIX = '!';

client.once(Events.ClientReady, () => {
    console.log(`user: ${client.user.tag}`);
});

client.on(Events.MessageCreate, async (message) => {
    if (message.author.bot) return;

    if (message.content.startsWith(PREFIX + 'start')) {
        const modChannel = message.guild.channels.cache.find(channel => channel.name === 'modmail');
        if (!modChannel) return message.reply('i was unable to find the modmail channel');

        const userMessage = message.content.slice(PREFIX.length + 6).trim();
        const modMailMessage = `${message.author.tag}: ${userMessage}`;
        await modChannel.send(modMailMessage);
        message.reply('sent the message to the mods');
    }
});

client.login('YOUR_BOT_TOKEN');
