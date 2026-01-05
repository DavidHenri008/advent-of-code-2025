const { loadInput } = require('../utils');

const input = loadInput(5);
let rangesIds = [];
let ids = [];
for (let i = 0; i < input.length; i++) {
  const line = input[i];
  if (line !== '' && line.includes('-')) {
    let values = line.split('-');
    rangesIds.push([Number(values[0]), Number(values[1])]);
  } else if (line !== '') {
    ids.push(Number(line));
  }
}
// console.log( rangesIds,ids);

/**** Part ONE ****/
const part1 = () => {
  let nbInRangeIds = 0;
  for (let i = 0; i < ids.length; i++) {
    const id = ids[i];
    let isInRange = false;
    for (let j = 0; j < rangesIds.length; j++) {
      const range = rangesIds[j];
      if (id >= range[0] && id <= range[1]) {
        isInRange = true;
        break;
      }
    }
    if (isInRange) {
      nbInRangeIds++;
    }
  }
  console.log(nbInRangeIds);
};

/**** Part TWO ****/
const part2 = () => {
  // Sort by start value
  const sortedRanges = [...rangesIds].sort((a, b) => a[0] - b[0]);
  const mergedRanges = [sortedRanges[0]];

  for (let i = 1; i < sortedRanges.length; i++) {
    const current = sortedRanges[i];
    const last = mergedRanges[mergedRanges.length - 1];
    // Check if overlapping or adjacent
    if (current[0] <= last[1] + 1) {
      // Merge by extending the end
      last[1] = Math.max(last[1], current[1]);
    } else {
      // No overlap, add new range
      mergedRanges.push(current);
    }
  }
  // Calculate total covered IDs
  let totalIds = 0;
  for (const range of mergedRanges) {
    totalIds += range[1] - range[0] + 1;
  }
  console.log(totalIds);
};

part1();
part2();
