const { Client, Intents } = require("discord.js");

const client = new Client({
  intents: [
    Intents.FLAGS.GUILDS,
    Intents.FLAGS.GUILD_MESSAGES
    // Intents.FLAGS.DIRECT_MESSAGES
  ]
});

client.on("ready", () => {
  console.log(`Logged in as ${client.user.tag}!`);
});

exports.sendDiscordNotification = (data) => {
  client.emit("notification", data);
};

client.on("notification", (data) => {
  const channel = client.channels.cache.get("998227770247221278");
  console.log(data);
});

// client.on("messageCreate", (msg) => {
//   if (msg.content === "ping") {
//     if (!msg.author.bot) msg.reply("pong");
//   }
// });

client.login(process.env.DISCORD_TOKEN);
