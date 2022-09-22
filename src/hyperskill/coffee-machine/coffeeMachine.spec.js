/* eslint-disable no-undef */
const { 
    calculateAmount, 
    calculateBeverage, 
    printResult 
} = require("./coffeeMachine.js");

const RIGHT_AMOUNT = 'Yes, I can make that amount of coffee';
const notEnough = (amount) => `No, I can make only ${amount} cups of coffee`;
const extraCups = (amount) => `Yes, I can make that amount of coffee (and even ${amount} more than that)`;

describe('A funcão calculateAmount', () => {

    it('deve retornar 2, se passar 400ml de água', () => {
        expect(calculateAmount('water', 400)).toBe(2);
    });
    it('deve retornar 10, se passar 500ml de leite', () => {
        expect(calculateAmount('milk', 500)).toBe(10);
    });
    it('deve retornar 4, se passar 60g de grãos', () => {
        expect(calculateAmount('beans', 60)).toBe(4);
    });
    it('deve retornar mensagem padrão se passado um type errado', () => {
        expect(calculateAmount('notAType', 0)).toBe('notAType is not a type.');
    });
});

describe('A funcão calculateBeverage', () => {

    it('deve retornar 1 se water:300, milk:65, e beans:111', () => {
        expect(calculateBeverage({water:300, milk:65, beans:111})).toBe(1);
    });
    // it('deve retornar 1 se water:200, milk:50, e beans:15', () => {
    //     expect(calculateBeverage(inputAmountOf1)).toBe(1)
    // });
});

describe('A função printResult', ()=> {
    
    it(`deve retornar ${RIGHT_AMOUNT} se water:300, milk:65, e beans:111` , ()=> {
        expect(printResult(1, calculateBeverage({water:300, milk:65, beans:111}))).toBe(RIGHT_AMOUNT);
    });

    it(`deve retornar ${extraCups(2)} se water:600, milk:153, beans:100` , ()=> {
        expect(printResult(1, calculateBeverage({water:600, milk:153, beans:100}))).toBe(extraCups(2));
    });

    it(`deve retornar ${notEnough(2)} se water:599, milk:250, beans:200` , ()=> {
        expect(printResult(10, 
            calculateBeverage({water:599, milk:250, beans:200})
            )
        ).toBe(notEnough(2));
    });
});