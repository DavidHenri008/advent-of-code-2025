const { loadInput } = require('../utils');

const input = loadInput(2).filter((line) => line !== '');
// Format input into array of ranges composed of start and end.
const ranges = input[0].split(',').map((range) => {
  let parts = range.split('-').map(Number);
  return { start: parts[0], end: parts[1] };
});
// console.log(ranges);

/**** Part ONE ****/
const part1 = () => {
  let invalidSum = 0;
  ranges.forEach((range) => {
    // Validate if a pattern is duplicate within the range.
    for (let i = range.start; i <= range.end; i++) {
      let numStr = i.toString();
      // Only even length numbers can have duplicates.
      if(numStr.length % 2 === 0){
        let mid = numStr.length / 2;
        if(numStr.slice(0, mid) === numStr.slice(mid)){
          invalidSum += i;
        }
      }
    }
  });

  console.log(invalidSum);
};

/**** Part TWO ****/
const part2 = () => {
  let invalidSum = 0;
  ranges.forEach((range) => {
    // Validate if a pattern is duplicate within the range.
    for (let i = range.start; i <= range.end; i++) {
      let numStr = i.toString();
      for (let j = 2; j <= numStr.length; j++) {
        if (numStr.length % j === 0) {
          let segmentLength = numStr.length / j;
          let segment = numStr.slice(0, segmentLength);
          let isDuplicate = true;
          for (let k = 1; k < j; k++) {
            if (numStr.slice(k * segmentLength, (k + 1) * segmentLength) !== segment) {
              isDuplicate = false;
              break;
            }
          }
          if (isDuplicate) {
            invalidSum += i;
            break;
          }
        }
      }
    }
  });

  console.log(invalidSum);
};

part1();
part2();
