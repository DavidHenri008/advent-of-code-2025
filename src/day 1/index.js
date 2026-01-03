const { loadInput } = require('../utils');

const input = loadInput(1).filter((line) => line !== '');

/**** Part ONE ****/
const part1 = () => {
  let password = 0;
  let position = 50;

  for (let i = 0; i < input.length; i++) {
    // Read action
    let action = input[i];
    // Extract direction and value
    let direction = action[0];
    let value = parseInt(action.slice(1), 10);
    // Calculate new position
    if (direction === 'R') {
      position = position + value;
    } else if (direction === 'L') {
      position = position - value;
    }

    // position = -201 = 99 -> password +0
    // position = -200 = 0  -> password +1
    // position = -101 = 99 -> password +0
    // position = -100 = 0  -> password +1
    // position = -1   = 99 -> password +0
    // position = 0         -> password +1
    // position = 1         -> password +0
    // position = 100  = 0  -> password +1
    // position = 101  = 1  -> password +0
    // position = 200  = 0  -> password +1
    // position = 201  = 1  -> password +0
    if (position < 0) {
      position = position % 100;
      if (position === 0) {
        password++;
      } else {
        position = position + 100;
      }
    } else if (position === 0) {
      password++;
    } else if (position > 99) {
      position = position % 100;
      if (position === 0) {
        password++;
      }
    }
  }

  console.log('Password: ', password);
};

/**** Part TWO ****/
const part2 = () => {
  let password = 0;
  let position = 50;

  for (let i = 0; i < input.length; i++) {
    // Read action
    let action = input[i];
    // Extract direction and value
    let direction = action[0];
    let value = parseInt(action.slice(1), 10);
    // Calculate new position
    let prevValue = position;
    if (direction === 'R') {
      position = position + value;
    } else if (direction === 'L') {
      position = position - value;
    }

    // position = -201 = 99 -> password +3
    // position = -200 = 0  -> password +3
    // position = -199 = 1  -> password +2
    // position = -101 = 99 -> password +2
    // position = -100 = 0  -> password +2
    // position = -99  = 1  -> password +1
    // position = -1   = 99 -> password +1
    // position = 0         -> password +1
    // position = 1         -> password +0
    // position = 99        -> password +0
    // position = 100  = 0  -> password +1
    // position = 101  = 1  -> password +1
    // position = 199  = 99 -> password +1
    // position = 200  = 0  -> password +2
    // position = 201  = 1  -> password +2
    if (position < 0) {
      let nbTurn = Math.abs(Math.ceil(position / 100));
      // When starting at 0, do not calculate a cross.
      if (prevValue === 0) {
        nbTurn--;
      }
      password += nbTurn + 1;
      position = position % 100;
      if (position !== 0) {
        position = position + 100;
      }
    } else if (position === 0) {
      password++;
    } else if (position > 99) {
      let nbTurn = Math.floor(position / 100);
      password += nbTurn;
      position = position % 100;
    }
  }

  console.log('Password: ', password);
};

part1();
part2();
