/* eslint-disable no-case-declarations */
const prompt = require('prompt-sync')();

const inventory = {
  water: 400,
  milk: 540,
  beans: 120,
  cups: 9,
  money: 550
};

const resetInventory = () => {
  inventory.water = 400;
  inventory.milk = 540;
  inventory.beans = 120;
  inventory.cups = 9;
  inventory.money = 550;
  return inventory;
};

const ASK = {
  DEFAULT: "Write action (buy, fill, take, remaining, exit): ",
  BUY : {
    OPTIONS: "What do you want to buy? 1 - espresso, 2 - latte, 3 - cappuccino, back - to main menu: ",
  },
  FILL: {
    WATER: "Write how many ml of water you want to add: ",
    MILK: "Write how many ml of milk you want to add: ",
    BEANS: "Write how many grams of coffee beans you want to add: ",
    CUPS: "Write how many disposable cups you want to add: "
  },
  TAKE_QUESTION: "I gave you $",
  RESOURCES: {
    ENOUGH : "I have enough resources, making you a coffee!",
    NOT_ENOUGH_WATER: "Sorry, not enough water!",
    NOT_ENOUGH_MILK: "Sorry, not enough milk!",
    NOT_ENOUGH_BEANS: "Sorry, not enough beans!",
    NOT_ENOUGH_CUPS: "Sorry, not enough cups!"
  }
};

const COFFEE = {
  1: { // espresso
    water: 250,
    milk: 0,
    beans: 16,
    price: 4
  },
  2: { // latte
    water: 350,
    milk: 75,
    beans: 20,
    price: 7
  },
  3: { // cappuccino
    water: 200,
    milk: 100,
    beans: 12,
    price: 6
  },
  back: 'back'
};

const getInventory = () => {
  return inventory;
};

function arrangeInventory(inputs) {
  const { water, milk, beans, cups, money } = inputs;
  return `The coffee machine has:
${water} ml of water
${milk} ml of milk
${beans} g of coffee beans
${cups} disposable cups
$${money} of money
`;
}

const buyOrBack = (option) => {
  if (option === 'back') {
    askAction();
  } else {
    console.log(canBuy(COFFEE[option]));
  }
};

const canBuy = (coffee) => {
  const hasWater = inventory.water >= coffee.water;
  const hasMilk = inventory.milk >= coffee.milk;
  const hasBeans = inventory.beans >= coffee.beans;
  const hasCups = inventory.cups > 0;
  // console.log(hasWater, hasMilk, hasBeans, hasCups)
  // console.log('INVENTORY: ',inventory.cups)
  if (!hasWater) {
    return ASK.RESOURCES.NOT_ENOUGH_WATER;
  }
  if (!hasMilk) {
    return ASK.RESOURCES.NOT_ENOUGH_MILK;
  }
  if (!hasBeans) {
    return ASK.RESOURCES.NOT_ENOUGH_BEANS;
  }
  if (!hasCups) {
    return ASK.RESOURCES.NOT_ENOUGH_CUPS;
  }
  buy(coffee);
  return ASK.RESOURCES.ENOUGH;
};

const buy = (coffee) => {
  const {water, milk, beans, price} = coffee;
  inventory.water -= water;
  inventory.milk -= milk;
  inventory.beans -= beans;
  inventory.money += price;
  inventory.cups--;
  return inventory;
};

const arrangeTakeMoney = (money) => {
  return ASK.TAKE_QUESTION + money; 
};

const takeMoney = () => {
  const profit = inventory.money;
  inventory.money = 0;
  return profit;
};

const fillMachine = () => {
  const fill = {};
  fill.water = Number(prompt(ASK.FILL.WATER));
  fill.milk = Number(prompt(ASK.FILL.MILK));
  fill.beans = Number(prompt(ASK.FILL.BEANS));
  fill.cups = Number(prompt(ASK.FILL.CUPS));

  inventory.water += fill.water;
  inventory.milk += fill.milk;
  inventory.beans += fill.beans;
  inventory.cups += fill.cups;

  return inventory;
};

const print = (updatedInventory) => {
  console.log('\n' + arrangeInventory(updatedInventory));
};

const askAction = () => {
  const answer = prompt(ASK.DEFAULT);
  switch (answer) {
    case "buy":
      const option = prompt(ASK.BUY.OPTIONS);
      buyOrBack(option);
      askAction();
      break;
    case "fill":
      fillMachine();
      askAction();
      break;
    case "take":
      console.log(arrangeTakeMoney(takeMoney()));
      askAction();
      break;
    case "remaining":
      print(getInventory());
      askAction();
      break;
    case "exit":
      break;
    default:
      console.log("Sorry, try again later =(");
      break;
  }
};

// askAction();

module.exports = {
  getInventory, 
  arrangeInventory,
  buy,
  takeMoney,
  resetInventory,
  canBuy,
  COFFEE
};