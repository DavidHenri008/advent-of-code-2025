const { loadInput } = require('../utils');

const input = loadInput(6).filter((n) => n !== '');

/**** Part ONE ****/
const part1 = () => {
  let numbers = [];
  for (let i = 0; i < input.length - 1; i++) {
    let rowNumbers = input[i]
      .split(' ')
      .filter((n) => n !== '')
      .map(Number);
    numbers.push(rowNumbers);
  }
  let operations = input[input.length - 1].split(' ').filter((n) => n !== '');

  let result = 0;
  for (let i = 0; i < numbers[0].length; i++) {
    let columnResult = numbers[0][i];
    for (let j = 1; j < numbers.length; j++) {
      let operation = operations[i];
      let number = numbers[j][i];
      if (operation === '*') {
        columnResult *= number;
      } else if (operation === '+') {
        columnResult += number;
      }
    }
    result += columnResult;
  }

  console.log(result);
};

/**** Part TWO ****/
const part2 = () => {
  let result = 0;
  let operationsRow = input[input.length - 1];
  let operations = [];
  let currentCalc = 0;
  for (let char = 0; char < operationsRow.length; char++) {
    let currentChar = operationsRow[char];
    if (currentChar === '*' || currentChar === '+') {
      operations.push(currentChar);
    }
    let currentNumber = '';
    for (let j = 0; j < input.length - 1; j++) {
      let numberChar = input[j][char];
      if (numberChar !== ' ' && numberChar !== undefined) {
        currentNumber += numberChar;
      }
    }

    if (currentNumber !== '') {
      currentNumber = Number(currentNumber);
      if (currentChar === operations[operations.length - 1]) {
        currentCalc = currentNumber;
      } else {
        if (operations[operations.length - 1] === '*') {
          currentCalc *= currentNumber;
        } else if (operations[operations.length - 1] === '+') {
          currentCalc += currentNumber;
        }
      }
    } else {
      result += currentCalc;
    }
  }
  result += currentCalc;
  console.log(result);
};

// part1();
part2();
