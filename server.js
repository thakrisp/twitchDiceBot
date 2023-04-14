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
  if (self) return; // Ignore messages from the bot

  if (msg === "!roll") {
    client.say(
      target,
      "To roll your dice follow the structure !d #Dice #Sides eg. !roll 2d20 or !roll 20 for a single dice."
    );
    return;
  }

  //(!roll) (\d)d(\d{1,3})
  if (msg.match(/(!roll) (\d)d(\d{1,3})/) !== null) {
    let responeMessage = dice.readMessage(msg);
    client.say(target, `@${context["display-name"]} rolled ${responeMessage}`);
    return;
  }
}

// Called every time the bot connects to Twitch chat
function onConnectedHandler(addr, port) {
  console.log(`* Connected to ${addr}:${port}`);
}
