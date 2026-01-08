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
  let minX = Math.min(...input.map((p) => p[0]));
  let maxX = Math.max(...input.map((p) => p[0]));
  let minY = Math.min(...input.map((p) => p[1]));
  let maxY = Math.max(...input.map((p) => p[1]));
  let validPoints = new Set();
  let sortedPointsY = input.sort((a, b) => a[1] - b[1] || a[0] - b[0]);
  // Add points in X between points with same Y
  for (let i = 0; i < sortedPointsY.length - 1; i++) {
    validPoints.add(`${sortedPointsY[i][0]},${sortedPointsY[i][1]}`);
    for (let j = i + 1; j < sortedPointsY.length; j++) {
      if (sortedPointsY[i][1] !== sortedPointsY[j][1]) {
        break;
      }
      for (let x = sortedPointsY[i][0] + 1; x < sortedPointsY[j][0]; x++) {
        validPoints.add(`${x},${sortedPointsY[i][1]}`);
      }
    }
  }
  // Add points in Y between points with same X
  let sortedPointsX = input.sort((a, b) => a[0] - b[0] || a[1] - b[1]);
  for (let i = 0; i < sortedPointsX.length - 1; i++) {
    validPoints.add(`${sortedPointsX[i][0]},${sortedPointsX[i][1]}`);
    for (let j = i + 1; j < sortedPointsX.length; j++) {
      if (sortedPointsX[i][0] !== sortedPointsX[j][0]) {
        break;
      }
      for (let y = sortedPointsX[i][1] + 1; y < sortedPointsX[j][1]; y++) {
        validPoints.add(`${sortedPointsX[i][0]},${y}`);
      }
    }
  }

  // console.log(sortedPointsY);
  // console.log(validPoints);

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
        let p2Str = `${p2[0]},${p2[1]}`;
        let isP2Valid = validPoints.has(p2Str);
        let p3 = input[j];
        let p4 = [input[i][0], input[j][1]];
        let p4Str = `${p4[0]},${p4[1]}`;
        let isP4Valid = validPoints.has(p4Str);
        let addedValidPoints = [];
        // check if all four points are in validPoints
        // p1 and p3 are always valid
        // to validate p2 and p4, we check if they are between valid points
        // p1 .  p2
        // .  .  .
        // p4 .  p3
        if (!isP2Valid && !isP4Valid && p1[0] <= p3[0] && p1[1] <= p3[1]) {
          if (!isP2Valid) {
            for (let x = p2[0]; x <= maxX; x++) {
              let checkP2 = `${x},${p2[1]}`;
              addedValidPoints.push(checkP2);
              if (validPoints.has(checkP2)) {
                isP2Valid = true;
                break;
              }
            }
          }
          if (!isP4Valid) {
            for (let y = p4[1]; y <= maxY; y++) {
              let checkP4 = `${p4[0]},${y}`;
              addedValidPoints.push(checkP4);
              if (validPoints.has(checkP4)) {
                isP4Valid = true;
                break;
              }
            }
          }
        }
        // p2 .  p1
        // .  .  .
        // p3 .  p4
        else if (!isP2Valid && !isP4Valid && p1[0] >= p3[0] && p1[1] <= p3[1]) {
          if (!isP2Valid) {
            for (let x = p2[0]; x >= minX; x--) {
              let checkP2 = `${x},${p2[1]}`;
              addedValidPoints.push(checkP2);
              if (validPoints.has(checkP2)) {
                isP2Valid = true;
                break;
              }
            }
          }
          if (!isP4Valid) {
            for (let y = p4[1]; y <= maxY; y++) {
              let checkP4 = `${p4[0]},${y}`;
              addedValidPoints.push(checkP4);
              if (validPoints.has(checkP4)) {
                isP4Valid = true;
                break;
              }
            }
          }
        }
        // p3 .  p4
        // .  .  .
        // p2 .  p1
        else if (!isP2Valid && !isP4Valid && p1[0] >= p3[0] && p1[1] >= p3[1]) {
          if (!isP2Valid) {
            for (let x = p2[0]; x >= minX; x--) {
              let checkP2 = `${x},${p2[1]}`;
              addedValidPoints.push(checkP2);
              if (validPoints.has(checkP2)) {
                isP2Valid = true;
                break;
              }
            }
          }
          if (!isP4Valid) {
            for (let y = p4[1]; y >= minY; y--) {
              let checkP4 = `${p4[0]},${y}`;
              addedValidPoints.push(checkP4);
              if (validPoints.has(checkP4)) {
                isP4Valid = true;
                break;
              }
            }
          }
        }
        // p4 .  p3
        // .  .  .
        // p1 .  p2
        else if (!isP2Valid && !isP4Valid && p1[0] <= p3[0] && p1[1] >= p3[1]) {
          if (!isP2Valid) {
            for (let x = p2[0]; x <= maxX; x++) {
              let checkP2 = `${x},${p2[1]}`;
              addedValidPoints.push(checkP2);
              if (validPoints.has(checkP2)) {
                isP2Valid = true;
                break;
              }
            }
          }
          if (!isP4Valid) {
            for (let y = p4[1]; y >= minY; y--) {
              let checkP4 = `${p4[0]},${y}`;
              addedValidPoints.push(checkP4);
              if (validPoints.has(checkP4)) {
                isP4Valid = true;
                break;
              }
            }
          }
        }

        if (isP2Valid && isP4Valid) {
          areas.push({ i, j, d: area(input[i], input[j]) });
          addedValidPoints.forEach((p) => validPoints.add(p));
        }
      }
    }
  }

  console.log(Math.max(...areas.map((a) => a.d)));
};

// part1();
part2();
