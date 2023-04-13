require("dotenv").config();
const tmi = require("tmi.js");
const dice = require("./dice");

// Define configuration options
const opts = {
  identity: {
    username: process.env.BOT_USERNAME,
    password: process.env.OAUTH_TOKEN,
  },
  channels: [process.env.CHANNEL_NAME],
};

// Create a client with our options
const client = new tmi.client(opts);

// Register our event handlers (defined below)
client.on("message", onMessageHandler);
client.on("connected", onConnectedHandler);

// Connect to Twitch:
client.connect();

// Called every time a message comes in
function onMessageHandler(target, context, msg, self) {
  if (self || !msg.startsWith("!d")) {
    return;
  } // Ignore messages from the bot

  if (self && !msg.startsWith("!d")) return;

  let responeMessage = dice.readMessage(msg);
  client.reply(target, `@${context["display-name"]} rolled ${responeMessage}`);
}

// Called every time the bot connects to Twitch chat
function onConnectedHandler(addr, port) {
  console.log(`* Connected to ${addr}:${port}`);
}
