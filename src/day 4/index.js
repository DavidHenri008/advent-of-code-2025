const { loadInput } = require('../utils');

const input = loadInput(4).filter((line) => line !== '');

/**** Part ONE ****/
const part1 = () => {
  let nbMovableRolls = 0;
  // For each position validate how many adjacent roll (@) are present.
  for (let y = 0; y < input.length; y++) {
    for (let x = 0; x < input[y].length; x++) {
      if (input[y][x] === '@') {
        let nbAdjacentRolls = 0;
        // Check all 8 directions.
        if (y > 0 && x > 0 && input[y - 1][x - 1] === '@') {
          nbAdjacentRolls++;
        }
        if (y > 0 && input[y - 1][x] === '@') {
          nbAdjacentRolls++;
        }
        if (y > 0 && x < input[y].length - 1 && input[y - 1][x + 1] === '@') {
          nbAdjacentRolls++;
        }
        if (x > 0 && input[y][x - 1] === '@') {
          nbAdjacentRolls++;
        }
        if (x < input[y].length - 1 && input[y][x + 1] === '@') {
          nbAdjacentRolls++;
        }
        if (y < input.length - 1 && x > 0 && input[y + 1][x - 1] === '@') {
          nbAdjacentRolls++;
        }
        if (y < input.length - 1 && input[y + 1][x] === '@') {
          nbAdjacentRolls++;
        }
        if (y < input.length - 1 && x < input[y].length - 1 && input[y + 1][x + 1] === '@') {
          nbAdjacentRolls++;
        }
        if (nbAdjacentRolls < 4) {
          nbMovableRolls++;
          // console.log(x, y, nbAdjacentRolls, nbMovableRolls);
        }
      }
    }
  }
  console.log(nbMovableRolls);
};

/**** Part TWO ****/
const part2 = () => {
  let nbRemovedRolls = 0;
  let letRemoveRolls = true;
  while (letRemoveRolls) {
    let removableRolls = [];
    // For each position validate how many adjacent roll (@) are present.
    for (let y = 0; y < input.length; y++) {
      for (let x = 0; x < input[y].length; x++) {
        if (input[y][x] === '@') {
          let nbAdjacentRolls = 0;
          // Check all 8 directions.
          if (y > 0 && x > 0 && input[y - 1][x - 1] === '@') {
            nbAdjacentRolls++;
          }
          if (y > 0 && input[y - 1][x] === '@') {
            nbAdjacentRolls++;
          }
          if (y > 0 && x < input[y].length - 1 && input[y - 1][x + 1] === '@') {
            nbAdjacentRolls++;
          }
          if (x > 0 && input[y][x - 1] === '@') {
            nbAdjacentRolls++;
          }
          if (x < input[y].length - 1 && input[y][x + 1] === '@') {
            nbAdjacentRolls++;
          }
          if (y < input.length - 1 && x > 0 && input[y + 1][x - 1] === '@') {
            nbAdjacentRolls++;
          }
          if (y < input.length - 1 && input[y + 1][x] === '@') {
            nbAdjacentRolls++;
          }
          if (y < input.length - 1 && x < input[y].length - 1 && input[y + 1][x + 1] === '@') {
            nbAdjacentRolls++;
          }
          if (nbAdjacentRolls < 4) {
            removableRolls.push([x, y]);
            // console.log(x, y, nbAdjacentRolls, nbMovableRolls);
          }
        }
      }
    }
    nbRemovedRolls += removableRolls.length;
    // Remove all removable rolls.
    removableRolls.forEach((roll) => {
      const x = roll[0];
      const y = roll[1];
      input[y] = input[y].substring(0, x) + '.' + input[y].substring(x + 1);
    });
    if (removableRolls.length === 0) {
      letRemoveRolls = false;
    }
  }
  console.log(nbRemovedRolls);
};

part1();
part2();
