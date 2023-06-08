const Discord = require('discord.js');
const GyoDB = require('gyo.db');

const client = new Discord.Client();
const db = new GyoDB('database.json');

const prefix = '!';

client.on('ready', () => {
  console.log(`Bot is ready. Logged in as ${client.user.tag}`);
});

client.on('message', (message) => {
  if (!message.content.startsWith(prefix) || message.author.bot) return;

  const args = message.content.slice(prefix.length).trim().split(' ');
  const command = args.shift().toLowerCase();

  if (command === 'katıl') {
    const userID = message.author.id;
    db.set('joined', userID);
    message.channel.send(`Hoş geldin, ${message.author}!`);
  }
});

client.login('MTExMzQxODk1NTgzNTU3NjM1MQ.G_RES-.jS7ZbR1f5OsNDptda7rp2m5lOsiLdiU1Snz7eU');
