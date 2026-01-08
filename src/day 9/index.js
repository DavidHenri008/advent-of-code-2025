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
  const addedPoints = new Set(); // Track added points to avoid duplicates

  function addValidPoint(x, y) {
    const key = `${x},${y}`;
    if (addedPoints.has(key)) return; // Skip duplicates
    addedPoints.add(key);

    if (!validByX.has(x)) validByX.set(x, []);
    if (!validByY.has(y)) validByY.set(y, []);
    validByX.get(x).push(y);
    validByY.get(y).push(x);
  }

  // Build polygon from consecutive input points + store edges
  const verticalEdges = []; // { x, minY, maxY }
  const horizontalEdges = []; // { y, minX, maxX }

  for (let i = 0; i < input.length; i++) {
    const curr = input[i];
    const next = input[(i + 1) % input.length];

    addValidPoint(curr[0], curr[1]);

    // If consecutive points share X (vertical edge)
    if (curr[0] === next[0]) {
      const minY = Math.min(curr[1], next[1]);
      const maxY = Math.max(curr[1], next[1]);
      verticalEdges.push({ x: curr[0], minY, maxY });
      for (let y = minY + 1; y < maxY; y++) {
        addValidPoint(curr[0], y);
      }
    }
    // If consecutive points share Y (horizontal edge)
    else if (curr[1] === next[1]) {
      const minX = Math.min(curr[0], next[0]);
      const maxX = Math.max(curr[0], next[0]);
      horizontalEdges.push({ y: curr[1], minX, maxX });
      for (let x = minX + 1; x < maxX; x++) {
        addValidPoint(x, curr[1]);
      }
    }
  }

  // Check if any polygon edge cuts through rectangle interior
  function edgeCutsRectangle(minX, maxX, minY, maxY) {
    // Check vertical edges: if edge.x is strictly inside (minX, maxX),
    // and edge overlaps with (minY, maxY), it cuts through
    for (const edge of verticalEdges) {
      if (edge.x > minX && edge.x < maxX) {
        // Edge is inside x-range, check y overlap
        if (edge.minY < maxY && edge.maxY > minY) {
          return true;
        }
      }
    }
    // Check horizontal edges: if edge.y is strictly inside (minY, maxY),
    // and edge overlaps with (minX, maxX), it cuts through
    for (const edge of horizontalEdges) {
      if (edge.y > minY && edge.y < maxY) {
        // Edge is inside y-range, check x overlap
        if (edge.minX < maxX && edge.maxX > minX) {
          return true;
        }
      }
    }
    return false;
  }

  // console.log(validByX, validByY);

  function area([x1, y1], [x2, y2]) {
    return (Math.abs(x2 - x1) + 1) * (Math.abs(y2 - y1) + 1);
  }

  let areas = [];
  for (let i = 0; i < input.length; i++) {
    for (let j = i + 1; j < input.length; j++) {
      if (i !== j) {
        // get the four point of the rectangle
        let p2 = [input[j][0], input[i][1]];
        let isP2Valid = false;
        let p4 = [input[i][0], input[j][1]];
        let isP4Valid = false;
        // check if all four points are in validPoints
        // p1 and p3 are always valid
        // to validate p2 and p4, we use ray casting in BOTH directions

        // Check p2: if on boundary it's valid, otherwise use ray casting
        if (addedPoints.has(`${p2[0]},${p2[1]}`)) {
          isP2Valid = true;
        } else {
          // Horizontal ray: count vertical edges crossed (use <= on minY for consistent corner handling)
          let countLeft = verticalEdges.filter(
            (e) => e.x < p2[0] && e.minY <= p2[1] && p2[1] < e.maxY
          ).length;
          let countRight = verticalEdges.filter(
            (e) => e.x > p2[0] && e.minY <= p2[1] && p2[1] < e.maxY
          ).length;
          // Vertical ray: count horizontal edges crossed (use <= on minX for consistent corner handling)
          let countAbove = horizontalEdges.filter(
            (e) => e.y < p2[1] && e.minX <= p2[0] && p2[0] < e.maxX
          ).length;
          let countBelow = horizontalEdges.filter(
            (e) => e.y > p2[1] && e.minX <= p2[0] && p2[0] < e.maxX
          ).length;
          isP2Valid =
            countLeft % 2 === 1 &&
            countRight % 2 === 1 &&
            countAbove % 2 === 1 &&
            countBelow % 2 === 1;
        }

        // Check p4: if on boundary it's valid, otherwise use ray casting
        if (addedPoints.has(`${p4[0]},${p4[1]}`)) {
          isP4Valid = true;
        } else {
          // Horizontal ray: count vertical edges crossed (use <= on minY for consistent corner handling)
          let countLeft = verticalEdges.filter(
            (e) => e.x < p4[0] && e.minY <= p4[1] && p4[1] < e.maxY
          ).length;
          let countRight = verticalEdges.filter(
            (e) => e.x > p4[0] && e.minY <= p4[1] && p4[1] < e.maxY
          ).length;
          // Vertical ray: count horizontal edges crossed (use <= on minX for consistent corner handling)
          let countAbove = horizontalEdges.filter(
            (e) => e.y < p4[1] && e.minX <= p4[0] && p4[0] < e.maxX
          ).length;
          let countBelow = horizontalEdges.filter(
            (e) => e.y > p4[1] && e.minX <= p4[0] && p4[0] < e.maxX
          ).length;
          isP4Valid =
            countLeft % 2 === 1 &&
            countRight % 2 === 1 &&
            countAbove % 2 === 1 &&
            countBelow % 2 === 1;
        }

        if (isP2Valid && isP4Valid) {
          // Also check that no polygon edge cuts through the rectangle interior
          const minX = Math.min(input[i][0], input[j][0]);
          const maxX = Math.max(input[i][0], input[j][0]);
          const minY = Math.min(input[i][1], input[j][1]);
          const maxY = Math.max(input[i][1], input[j][1]);

          if (!edgeCutsRectangle(minX, maxX, minY, maxY)) {
            areas.push({ i, j, d: area(input[i], input[j]) });
          }
        }
      }
    }
  }

  console.log(Math.max(...areas.map((a) => a.d)));
};

// part1();
part2();
