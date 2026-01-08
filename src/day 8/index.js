const { loadInput } = require('../utils');

const input = loadInput(8)
  .filter((line) => line.length > 0)
  .map((line) => line.split(',').map(Number));
// console.log(input);

/**** Part ONE ****/
const part1 = () => {
  let distances = [];
  function distance3D([x1, y1, z1], [x2, y2, z2]) {
    return (x2 - x1) ** 2 + (y2 - y1) ** 2 + (z2 - z1) ** 2;
    // return Math.sqrt((x2 - x1) ** 2 + (y2 - y1) ** 2 + (z2 - z1) ** 2);
  }

  for (let i = 0; i < input.length; i++) {
    for (let j = i + 1; j < input.length; j++) {
      if (i !== j) {
        distances.push({ i, j, d: distance3D(input[i], input[j]) });
      }
    }
  }

  let sortDistances = distances.sort((a, b) => a.d - b.d);
  let partialDistances = sortDistances.slice(0, 1000);
  let circuits = [];
  for (let k = 0; k < partialDistances.length; k++) {
    let pair = partialDistances[k];
    if (circuits.length === 0) {
      circuits.push(new Set([pair.i, pair.j]));
    } else {
      let iCircuit = -1;
      let jCircuit = -1;
      for (let c = 0; c < circuits.length; c++) {
        let circuit = circuits[c];
        if (circuit.has(pair.i)) {
          iCircuit = c;
        }
        if (circuit.has(pair.j)) {
          jCircuit = c;
        }
      }
      if (iCircuit === -1 && jCircuit === -1) {
        circuits.push(new Set([pair.i, pair.j]));
      } else if (iCircuit !== -1 && jCircuit === -1) {
        circuits[iCircuit].add(pair.j);
      } else if (iCircuit === -1 && jCircuit !== -1) {
        circuits[jCircuit].add(pair.i);
      } else if (iCircuit !== jCircuit) {
        // merge circuits
        let merged = new Set([...circuits[iCircuit], ...circuits[jCircuit]]);
        circuits.splice(Math.max(iCircuit, jCircuit), 1);
        circuits.splice(Math.min(iCircuit, jCircuit), 1);
        circuits.push(merged);
      }
    }
  }

  let sortedCircuits = circuits.sort((a, b) => b.size - a.size);
  let result = 1;
  for (let c = 0; c < 3; c++) {
    result *= sortedCircuits[c].size;
  }
  console.log(result);
};

/**** Part TWO ****/
const part2 = () => {
  let distances = [];
  function distance3D([x1, y1, z1], [x2, y2, z2]) {
    return (x2 - x1) ** 2 + (y2 - y1) ** 2 + (z2 - z1) ** 2;
    // return Math.sqrt((x2 - x1) ** 2 + (y2 - y1) ** 2 + (z2 - z1) ** 2);
  }

  for (let i = 0; i < input.length; i++) {
    for (let j = i + 1; j < input.length; j++) {
      if (i !== j) {
        distances.push({ i, j, d: distance3D(input[i], input[j]) });
      }
    }
  }

  let sortDistances = distances.sort((a, b) => a.d - b.d);
  let circuits = [];
  let lastPair = null;
  for (let k = 0; k < sortDistances.length; k++) {
    let pair = sortDistances[k];
    if (circuits.length === 0) {
      circuits.push(new Set([pair.i, pair.j]));
    } else {
      let iCircuit = -1;
      let jCircuit = -1;
      for (let c = 0; c < circuits.length; c++) {
        let circuit = circuits[c];
        if (circuit.has(pair.i)) {
          iCircuit = c;
        }
        if (circuit.has(pair.j)) {
          jCircuit = c;
        }
      }
      if (iCircuit === -1 && jCircuit === -1) {
        circuits.push(new Set([pair.i, pair.j]));
      } else if (iCircuit !== -1 && jCircuit === -1) {
        circuits[iCircuit].add(pair.j);
      } else if (iCircuit === -1 && jCircuit !== -1) {
        circuits[jCircuit].add(pair.i);
      } else if (iCircuit !== jCircuit) {
        // merge circuits
        let merged = new Set([...circuits[iCircuit], ...circuits[jCircuit]]);
        circuits.splice(Math.max(iCircuit, jCircuit), 1);
        circuits.splice(Math.min(iCircuit, jCircuit), 1);
        circuits.push(merged);
      }
    }
    if (circuits[0].size === input.length) {
      lastPair = pair;
      break;
    }
  }

  console.log(input[lastPair.i][0] * input[lastPair.j][0]);
};

// part1();
part2();
