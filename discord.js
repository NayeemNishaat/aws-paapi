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

exports.sendSuccessNotification = (data) => {
  client.emit("successNotification", data);
};
exports.sendFaildNotification = (data) => {
  client.emit("failNotification", data);
};

client.on("successNotification", (data) => {
  const channel = client.channels.cache.get("998227770247221278");

  const pretty = `
  > *Item Found!*
  **${data.productName}**
  Price: ${data.price}
  Keywords: ${data.keywords}
  ${data.imageURL}
  ${data.productURL}
  `;

  channel.send(pretty);
});

client.on("failNotification", (data) => {
  const channel = client.channels.cache.get("998227770247221278");

  channel.send(data);
});

// client.on("messageCreate", (msg) => {
//   if (msg.content === "ping") {
//     if (!msg.author.bot) msg.reply("pong");
//   }
// });

client.login(process.env.DISCORD_TOKEN);
