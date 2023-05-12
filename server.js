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

  msg = msg.toLowerCase();

  if (msg === "!dice") {
    client.say(
      target,
      `The dice to choose from are ${dice.diceSides.join(", ")}`
    );
    return;
  }

  if (msg === "!roll") {
    client.say(
      target,
      "To roll your dice follow the structure !roll #DiceD#Sides eg. !roll 2d20 or !roll d20 for a single dice."
    );
    return;
  }

  if (msg.startsWith("!roll")) {
    let messageMatch = msg.match(/\s([1-9]{0,1})d(\d{1,3})/);

    if (messageMatch !== null) {
      let responeMessage = dice.readMessage(messageMatch[0]);
      console.log("server: " + responeMessage);

      if (responeMessage !== undefined) {
        client.say(
          target,
          `@${context["display-name"]} rolled ${responeMessage}`
        );
      }
      return;
    } else {
      console.error(msg);
      return;
    }
  }
  return;
}

// Called every time the bot connects to Twitch chat
function onConnectedHandler(addr, port) {
  console.log(`* Connected to ${addr}:${port}`);
}
