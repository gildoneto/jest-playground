
const rightAmountOf = {
    water: 200,
    milk: 50,
    beans: 15
}

function calculateAmount(type, amount) {
    let result = 0;
    switch (type) {
        case 'water':
        result = parseInt(amount / rightAmountOf.water)
            break;
        case 'milk':
        result = parseInt(amount / rightAmountOf.milk)
            break;
        case 'beans':
        result = parseInt(amount / rightAmountOf.beans)
            break;
        default:
            result = `${type} is not a type.`;
    }

    return result;
}

function calculateBeverage(inputAmountOf) {
    const amounts = [];
    amounts.push(calculateAmount('water', inputAmountOf.water));
    amounts.push(calculateAmount('milk', inputAmountOf.milk));
    amounts.push(calculateAmount('beans', inputAmountOf.beans));
    const cupsCanMake = Math.min(...amounts);
    return cupsCanMake;
}

function printResult(requestCups, cupsCanMake) {
    if(requestCups === cupsCanMake) {
        return 'Yes, I can make that amount of coffee';
    } else if (requestCups > cupsCanMake) {
        return `No, I can make only ${cupsCanMake} cups of coffee`;
    } else if (requestCups < cupsCanMake) {
        return `Yes, I can make that amount of coffee (and even ${cupsCanMake - requestCups} more than that)`;
    }
}

// inputAmountOf.water = 600;
// inputAmountOf.milk = 153;
// inputAmountOf.beans = 100;
// inputAmountOf.cups = 1;

// console.log(printResult(inputAmountOf.cups, calculateBeverage(inputAmountOf)));

module.exports = {calculateAmount, calculateBeverage, printResult};