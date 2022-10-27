/* eslint-disable no-case-declarations */
const prompt = require('prompt-sync')();

const inventory = {
  water: 400,
  milk: 540,
  beans: 120,
  cups: 9,
  money: 550
}

const resetInventory = () => {
  inventory.water = 400;
  inventory.milk = 540;
  inventory.beans = 120;
  inventory.cups = 9;
  inventory.money = 550;
  return inventory;
}

const ASK = {
  DEFAULT: "Write action (buy, fill, take): ",
  BUY : {
    OPTIONS: "What do you want to buy? 1 - espresso, 2 - latte, 3 - cappuccino: ",
  },
  FILL: {
    WATER: "Write how many ml of water you want to add: ",
    MILK: "Write how many ml of milk you want to add: ",
    BEANS: "Write how many grams of coffee beans you want to add: ",
    CUPS: "Write how many disposable cups you want to add: "
  },
  TAKE_QUESTION: "I gave you $"
}

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
  }
}

const getInventory = () => {
  return inventory;
}

function arrangeInventory(inputs) {
  const { water, milk, beans, cups, money } = inputs;
  return `The coffee machine has:
${water} ml of water
${milk} ml of milk
${beans} g of coffee beans
${cups} disposable cups
$${money} of money`;
}

const buyCoffee = (coffee) => {
  const {water, milk, beans, price} = coffee;
  inventory.water -= water;
  inventory.milk -= milk;
  inventory.beans -= beans;
  inventory.money += price;
  inventory.cups--;
  return inventory;
}

const arrangeTakeMoney = (money) => {
  return ASK.TAKE_QUESTION + money; 
}

const takeMoney = () => {
  const profit = inventory.money;
  inventory.money = 0;
  return profit;
}

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
}

const print = (updatedInventory) => {
  console.log('\n' + arrangeInventory(updatedInventory));
}

const askAction = () => {
  const answer = prompt(ASK.DEFAULT);
  let updatedInventory;
  switch (answer) {
    case "buy":
      const typeCoffee = Number(prompt(ASK.BUY.OPTIONS));
      updatedInventory = buyCoffee(COFFEE[typeCoffee]);
      print(updatedInventory);
      break;
    case "fill":
      updatedInventory = fillMachine();
      print(updatedInventory);
      break;
    case "take":
      console.log(arrangeTakeMoney(takeMoney()));
      print(getInventory());
      break;
    default:
      console.log("some error!");
      break;
  }
}

// console.log(arrangeInventory(getInventory()) + '\n');
// askAction();

module.exports = {
  getInventory, 
  arrangeInventory,
  buyCoffee,
  takeMoney,
  resetInventory,
  COFFEE
};