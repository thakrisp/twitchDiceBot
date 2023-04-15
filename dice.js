let readMessage = (message) => {
  if (!message.includes("!")) {
    return;
  }

  let args = [];

  args = message.split(" ");
  args.shift();
  args.forEach((e, i) => (args[i] = e.split("d")));
  args = args.flat();
  args = args.filter((e) => e !== "");

  if (args.length === 1) {
    return responeMessage(1, args[0]);
  }

  if (args.length === 2) {
    return responeMessage(args[0], args[1]);
  }

  console.error(`Invalid message: ${message}`);
};

let responeMessage = (times, sides) => {
  let rolls = [];

  if (times <= 0 || sides <= 0) {
    return;
  }

  if (!diceSides.includes(+sides) || sides > 100) {
    return;
  }

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
      message += `${i === rolls.length - 1 ? " and " : ", "}
      ${i === rolls.length - 1 ? "a" : ""} ${rolls[i]}`;
    }
  }

  return message;
};

let diceSides = [4, 6, 8, 10, 12, 20, 100];

exports.readMessage = readMessage;
