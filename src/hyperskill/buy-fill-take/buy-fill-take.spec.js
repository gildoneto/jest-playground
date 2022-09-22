/* eslint-disable no-undef */
const {
  arrangeInventory, 
  getInventory, 
  buyCoffee,
  takeMoney, 
  COFFEE
} = require("./buy-fill-take.js");

const INITIAL_INVENTORY_TEXT = `The coffee machine has:
400 ml of water
540 ml of milk
120 g of coffee beans
9 disposable cups
$550 of money`;

const INITIAL_INVENTORY = {
  water: 400,
  milk: 540,
  beans: 120,
  cups: 9,
  money: 550
}

describe("Inventory", () => {
  it('should return the right text', () => {
    expect(arrangeInventory({water: 400,
      milk: 540,
      beans: 120,
      cups: 9,
      money: 550})).toEqual(INITIAL_INVENTORY_TEXT)
  });
  it('should return the default amount on init', () => {
    expect(getInventory()).toEqual(INITIAL_INVENTORY)
  });
});

describe('Cost and necessary inputs', () => {
  it('should be properly set for espresso', () => {
    expect(COFFEE[1]).toEqual({
      water: 250,
      milk: 0,
      beans: 16,
      price: 4
    })
  });
  it('should be properly set for latte', () => {
    expect(COFFEE[2]).toEqual({
      water: 350,
      milk: 75,
      beans: 20,
      price: 7
    })
  });
  it('should be properly set for cappuccino', () => {
    expect(COFFEE[3]).toEqual({
      water: 200,
      milk: 100,
      beans: 12,
      price: 6
    })
  });
});

describe('Inputs from machine', () => {
  beforeEach(() => {
    jest.resetModules();
  })
  it('should decrease correctly when user buys an espresso', () => {
    expect(buyCoffee(COFFEE[1])).toEqual({
      water: 150,
      milk: 540,
      beans: 104,
      cups: 8,
      money: 554
    })
  });
  it('should decrease when user buys a latte', () => {
    expect(buyCoffee(COFFEE[2])).toEqual({
      water: -200,
      milk: 465,
      beans: 84,
      cups: 7,
      money: 561
    })
  });
  it('should decrease when user buys a cappuccino', () => {
    expect(buyCoffee(COFFEE[3])).toEqual({
      water: -400,
      milk: 365,
      beans: 72,
      cups: 6,
      money: 567
    })
  });
  it('should have $567 of money', () => {
    expect(takeMoney()).toBe(567);
  });
  it('should have $0 of money', () => {
    expect(getInventory().money).toBe(0);
  });
});

