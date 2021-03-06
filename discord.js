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
  const channel = client.channels.cache.get(process.env.CHANNEL_ID);

  let pretty = ``;

  data.map(
    (d) =>
      (pretty += `
  > **Item Found!**
  **${d.productName}**
  Price: ${d.price}
  Keywords: ${d.keywords}
  ${d.imageURL}
  ${d.productURL}
  `)
  );

  channel.send(pretty);
});

client.on("failNotification", (data) => {
  const channel = client.channels.cache.get(process.env.CHANNEL_ID);

  channel.send(data);
});

client.login(process.env.TOKEN);
