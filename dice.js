let readMessage = (message) => {
  if (!message.includes("!") || !message.startsWith("!d")) {
    return;
  }

  let arguments = [];

  arguments = message.split(" ");
  arguments.shift();
  arguments.map((e) => +e);

  if (arguments.length === 1) {
    return responeMessage(1, arguments[0]);
  }

  if (arguments.length === 2) {
    return responeMessage(arguments[0], arguments[1]);
  }

  console.error(`Invalid message: ${message}`);
};

let responeMessage = (times, sides) => {
  let rolls = [];

  for (let i = 0; i < times; i++) {
    rolls.push(getRandomNumber(sides));
  }

  if (rolls.length > 1) {
    rolls.sort((a, b) => b - a);
  }

  return formatMessage(rolls);
};

let getRandomNumber = (sides) => Math.floor(Math.random() * sides) + 1;

let formatMessage = (rolls) => {
  let message = `rolled a ${rolls[0]}`;

  if (rolls.length > 1) {
    for (let i = 1; i < rolls.length; i++) {
      message += `${i === rolls.length - 1 ? " and " : ", "}${rolls[i]}`;
    }
  }

  return message;
};

exports.readMessage = readMessage;
