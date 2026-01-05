const { loadInput } = require('../utils');

const input = loadInput(3)
  .filter((line) => line !== '')
  .map((line) => [...line].map(Number));
//console.log(input);

/**** Part ONE ****/
const part1 = () => {
  let joltage = 0;
  // For each banks walkthrough to find the largest two digit.
  input.forEach((bank) => {
    let tens = bank[0];
    let ones = 0;
    for (let i = 1; i < bank.length - 1; i++) {
      if (bank[i] > tens) {
        tens = bank[i];
        ones = bank[i + 1];
      } else if (bank[i] === tens && bank[i] > ones) {
        ones = bank[i];
      } else if (bank[i] > ones) {
        ones = bank[i];
      }
    }
    if (bank[bank.length - 1] > ones) {
      ones = bank[bank.length - 1];
    }
    // console.log(`Bank: ${bank} => Tens: ${tens}, Ones: ${ones}`, Math.max(...bank));
    joltage += tens * 10 + ones;
  });

  console.log(joltage);
};

/**** Part TWO ****/
const part2 = () => {
  const NB_DIGITS = 12;
  let joltage = 0;
  input.forEach((bank) => {
    let digits = Array.from({ length: NB_DIGITS }, () => 0);
    // For each digit, find the largest available digit.
    let minIndex = 0
    let maxIndex = bank.length-(NB_DIGITS-1);
    for (let d = 0; d < NB_DIGITS; d++) {
      for (let i = minIndex; i < maxIndex; i++) {
        if (bank[i] > digits[d]) {
          digits[d] = bank[i];
          minIndex = i + 1;
        }
      }
      // Adjust maxIndex for next digit
      maxIndex = bank.length - (NB_DIGITS - 1) + (d + 1);
    }

    let bankJoltage = digits.reduce(
      (acc, val, idx) => acc + val * Math.pow(10, NB_DIGITS - idx - 1),
      0
    );
    joltage += bankJoltage;
  });
  console.log(joltage);
};
part1();
part2();
