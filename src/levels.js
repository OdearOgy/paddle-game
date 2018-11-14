// importing the brick object to design levels
import Brick from "/src/brick.js";
// defining level builder
export function buildLevel(game, level) {
  let bricks = [];   // the array which will hold the levels

// level generator
  level.forEach((row, rowIndex) => {
    row.forEach((brick, brickIndex) => {
      if (brick === 1) {
        let position = {
          x: 80 * brickIndex,  // defining the x  position of the brick
          y: 75 + 24 * rowIndex  // defining the y  position of the brick
        };
        // creating a new instance of the Brick class and pushing it into our brikcs array
        bricks.push(new Brick(game, position));
      }
    });
  });
  return bricks;
}

// zeroes are indicating the empty space or nonexistence of the brick
// ones are indicating the actual bricks
// level 1
export const level1 = [
  // [0, 1, 0, 1, 0, 1, 0, 1, 0, 1],
  // [1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
  [1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
  [1, 1, 1, 1, 1, 1, 1, 1, 1, 1]
];


// level 2
export const level2 = [
  [0, 1, 0, 1, 0, 1, 0, 1, 0, 1],
  [1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
  [1, 1, 1, 1, 1, 1, 1, 1, 1, 1]
];
