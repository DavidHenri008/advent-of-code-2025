const { loadInput } = require('../utils');

const input = loadInput(7).filter((n) => n !== '');

/**** Part ONE ****/
const part1 = () => {
  let nbSplit = 0;
  for (let line = 0; line < input.length; line++) {
    for (let i = 0; i < input[line].length; i++) {
      if (input[line][i] === 'S') {
        input[line + 1] = input[line + 1].substring(0, i) + '|' + input[line + 1].substring(i + 1);
      }
      if (input[line][i] === '.' && line > 0) {
        if (input[line - 1][i] === '|') {
          input[line] = input[line].substring(0, i) + '|' + input[line].substring(i + 1);
        }
      }
      if (input[line][i] === '^' && input[line - 1][i] === '|') {
        input[line] =
          input[line].substring(0, i - 1) + '|' + '^' + '|' + input[line].substring(i + 2);
        nbSplit++;
      }
    }
    // console.log(input[line]);
  }
  console.log(nbSplit);
};

/**** Part TWO ****/
const part2 = () => {
  // Run part one to establish paths
  part1();
  const rows = input.length;
  const cols = input[0].length;
  const memo = new Map();
  let startCol = input[0].indexOf('S');
  function countPaths(row, col) {
    // Base case: reached the bottom
    if (row >= rows) return 1; // Using BigInt for large numbers

    // Out of bounds
    if (col < 0 || col >= cols) return 0;

    // Check memo
    const key = `${row},${col}`;
    if (memo.has(key)) return memo.get(key);

    const char = input[row][col];
    let paths = 0;

    if (char === 'S' || char === '|') {
      // Go straight down
      paths = countPaths(row + 1, col);
    } else if (char === '^') {
      // Branch: go down-left AND down-right
      paths = countPaths(row + 1, col - 1) + countPaths(row + 1, col + 1);
    }
    // '.' = empty space, returns 0

    memo.set(key, paths);
    return paths;
  }

  let nbPaths = countPaths(0, startCol);
  console.log(nbPaths);
};

// part1();
part2();
