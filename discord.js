const { Client, Intents } = require("discord.js");

const client = new Client({
  intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES]
});

client.on("ready", () => {
  console.log(`Logged in as ${client.user.tag}!`);
});

exports.sendSuccessNotification = (data) => {
  client.emit("successNotification", data);
};
exports.sendFailNotification = (data) => {
  client.emit("failNotification", data);
};

client.on("successNotification", (data) => {
  const channel = client.channels.cache.get("998227770247221278");

  const pretty = `
  > **Item Found!**
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

client.login(process.env.DISCORD_TOKEN);
