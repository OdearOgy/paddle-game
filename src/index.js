// importing the Game module
import Game from "/src/game.js";

// getting the canvas and it's context
let canvas = document.getElementById("game-screen");
let ctx = canvas.getContext("2d");

// defining canvas sizes
const Game_Width = 800;
const Game_Height = 600;

// creating Game class instance, to draw on a canvas
let game = new Game(Game_Width, Game_Height);
// a var to do an update
let lastTime = 0;
// defining a gameLoop function to draw and update the canvas
function gameLoop(timestamp) {
  // defining timing variable
  let deltaTime = timestamp - lastTime;
  lastTime = timestamp;

  // clearing the canvas after each change
  ctx.clearRect(0, 0, Game_Width, Game_Height);

  // drawing and updating the canvas
  game.update(deltaTime);
  game.draw(ctx);

  // calling the gameloop within itself
  requestAnimationFrame(gameLoop);
}

// calling the gameloop
requestAnimationFrame(gameLoop);
