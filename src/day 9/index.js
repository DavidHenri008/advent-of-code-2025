const { loadInput } = require('../utils');

const input = loadInput(9)
  .filter((line) => line.length > 0)
  .map((line) => line.split(',').map(Number));

// console.log(input);

/**** Part ONE ****/
const part1 = () => {
  let areas = [];
  function area([x1, y1], [x2, y2]) {
    return (Math.abs(x2 - x1) + 1) * (Math.abs(y2 - y1) + 1);
  }

  for (let i = 0; i < input.length; i++) {
    for (let j = i + 1; j < input.length; j++) {
      if (i !== j) {
        areas.push({ i, j, d: area(input[i], input[j]) });
      }
    }
  }

  console.log(Math.max(...areas.map((a) => a.d)));
};

/**** Part TWO ****/
const part2 = () => {
  // Maps for O(log n) lookups instead of O(n) linear search
  const validByX = new Map(); // x -> sorted array of y values
  const validByY = new Map(); // y -> sorted array of x values

  function addValidPoint(x, y) {
    if (!validByX.has(x)) validByX.set(x, []);
    if (!validByY.has(y)) validByY.set(y, []);
    validByX.get(x).push(y);
    validByY.get(y).push(x);
  }

  function hasPoint(x, y) {
    return validByX.has(x) && validByX.get(x).includes(y);
  }

  let sortedPointsY = input.sort((a, b) => a[1] - b[1] || a[0] - b[0]);
  // Add points in X between points with same Y
  for (let i = 0; i < sortedPointsY.length - 1; i++) {
    addValidPoint(sortedPointsY[i][0], sortedPointsY[i][1]);
    for (let j = i + 1; j < sortedPointsY.length; j++) {
      if (sortedPointsY[i][1] !== sortedPointsY[j][1]) {
        break;
      }
      for (let x = sortedPointsY[i][0] + 1; x < sortedPointsY[j][0]; x++) {
        addValidPoint(x, sortedPointsY[i][1]);
      }
    }
  }
  // Add points in Y between points with same X
  let sortedPointsX = input.sort((a, b) => a[0] - b[0] || a[1] - b[1]);
  for (let i = 0; i < sortedPointsX.length - 1; i++) {
    addValidPoint(sortedPointsX[i][0], sortedPointsX[i][1]);
    for (let j = i + 1; j < sortedPointsX.length; j++) {
      if (sortedPointsX[i][0] !== sortedPointsX[j][0]) {
        break;
      }
      for (let y = sortedPointsX[i][1] + 1; y < sortedPointsX[j][1]; y++) {
        addValidPoint(sortedPointsX[i][0], y);
      }
    }
  }

  // console.log(sortedPointsY);
  // console.log(validByX, validByY);

  function area([x1, y1], [x2, y2]) {
    return (Math.abs(x2 - x1) + 1) * (Math.abs(y2 - y1) + 1);
  }

  let areas = [];
  for (let i = 0; i < input.length; i++) {
    for (let j = i + 1; j < input.length; j++) {
      if (i !== j) {
        // get the four point of the rectangle
        let p1 = input[i];
        let p2 = [input[j][0], input[i][1]];
        let isP2Valid = hasPoint(p2[0], p2[1]);
        let p3 = input[j];
        let p4 = [input[i][0], input[j][1]];
        let isP4Valid = hasPoint(p4[0], p4[1]);
        // check if all four points are in validPoints
        // p1 and p3 are always valid
        // to validate p2 and p4, we check if they are BETWEEN valid points (inside polygon)
        // A point is inside if there are valid points on BOTH sides of it on the same row/column
        
        // Check p2: needs valid point with x <= p2.x AND x >= p2.x on same row
        if (validByY.has(p2[1])) {
          let xsOnRow = validByY.get(p2[1]);
          let hasLeft = xsOnRow.some((x) => x <= p2[0]);
          let hasRight = xsOnRow.some((x) => x >= p2[0]);
          isP2Valid = hasLeft && hasRight;
        }
        
        // Check p4: needs valid point with y <= p4.y AND y >= p4.y on same column
        if (validByX.has(p4[0])) {
          let ysOnCol = validByX.get(p4[0]);
          let hasAbove = ysOnCol.some((y) => y <= p4[1]);
          let hasBelow = ysOnCol.some((y) => y >= p4[1]);
          isP4Valid = hasAbove && hasBelow;
        }

        if (isP2Valid && isP4Valid) {
          areas.push({ i, j, d: area(input[i], input[j]) });
        }
      }
    }
  }

  console.log(Math.max(...areas.map((a) => a.d)));
};

// part1();
part2();
