// game.js run the game, and connects all classes into one
import Paddle from "/src/paddle.js"; // the paddle
import InputHandler from "/src/input.js"; // keyboard inputs
import Ball from "/src/ball.js"; // the ball
import Brick from "/src/brick.js"; // the brick(s)
import { buildLevel, level1, level2 } from "/src/levels.js"; // levels


// gamestates, basic menu, play, pause, gameover etc.
const GAMESTATE = {
  PAUSED: 0,
  RUNNING: 1,
  MENU: 2,
  GAMEOVER: 3,
  NEXTLEVEL: 4
};


// creating game class
export default class Game {
  constructor(gameWidth, gameHeight) {
    this.gameWidth = gameWidth;
    this.gameHeight = gameHeight;


    this.gamestate = GAMESTATE.MENU;  // defining default state of the game
    this.paddle = new Paddle(this);  // declaring new instance of the Paddle class
    this.ball = new Ball(this);  // declaring new instance of the Ball class
    this.gameObjects = [];  // initializing an empty array to store game gameObjects
    this.bricks = [];  // initializing an empty array to store bricks
    this.levels = [level1, level2];  // initializing array of levels
    this.currentLevel = 0;  // the index f the levels array which will increment to change the level
    this.lives = 1; // lives for the player
    new InputHandler(this.paddle, this); // passing the paddle and game to the control handler
  }


  start() {
    // checking the gamestate
    if (
      this.gamestate !== GAMESTATE.MENU &&
      this.gamestate !== GAMESTATE.NEXTLEVEL
    ) {
      return;
    }
    // reseting ball's position when the next level is reached
    this.ball.reset();
    // passing arguments to level builder class
    this.bricks = buildLevel(this, this.levels[this.currentLevel]);
    this.gameObjects = [this.ball, this.paddle]; // defining game objects
    this.gamestate = GAMESTATE.RUNNING; // defining gamestate
  }

  update(deltaTime) {
    if (this.lives === 0) this.gamestate = GAMESTATE.GAMEOVER; // checking player lives if 0 then gameover

    // checking the gamestate
    if (
      this.gamestate === GAMESTATE.PAUSED ||
      this.gamestate === GAMESTATE.MENU ||
      this.gamestate === GAMESTATE.GAMEOVER
    ) {
      return;
    }


    // proceeding to the next level when all the brick are cleared at the currentLevel
    if (this.bricks.length === 0) {
      this.currentLevel++; // changing level
      this.gamestate = GAMESTATE.NEXTLEVEL;
      this.start(); // recall of the start function
    }

    // updating each component
    [...this.gameObjects, ...this.bricks].forEach(object =>
      object.update(deltaTime)
    );


    // rerendering bricks that aren't touched yet
    this.bricks = this.bricks.filter(brick => !brick.markedForDeletion);
  }

  draw(ctx) {
    // drawing components
    [...this.gameObjects, ...this.bricks].forEach(object => object.draw(ctx));
    // drawing gamestates (pause state)
    if (this.gamestate === GAMESTATE.PAUSED) {
      ctx.rect(0, 0, this.gameWidth, this.gameHeight);
      ctx.fillStyle = "rgba(0, 0, 0, 0.4)";
      ctx.fill();

      // text when games is paused
      ctx.font = "30px Arial";
      ctx.fillStyle = "#fff";
      ctx.textAlign = "center";
      ctx.fillText("Paused", this.gameWidth / 2, this.gameHeight / 2);
    }

    // drawing gamestates (menu or starting state)
    if (this.gamestate === GAMESTATE.MENU) {
      ctx.rect(0, 0, this.gameWidth, this.gameHeight);
      ctx.fillStyle = "rgba(0, 0, 0, 1)";
      ctx.fill();

      // text when games is about to start
      ctx.font = "30px Arial";
      ctx.fillStyle = "#fff";
      ctx.textAlign = "center";
      ctx.fillText(
        "Press SPACEBAR to start",
        this.gameWidth / 2,
        this.gameHeight / 2
      );
    }

    // drawing gamestates (game over state)
    if (this.gamestate === GAMESTATE.GAMEOVER) {
      ctx.rect(0, 0, this.gameWidth, this.gameHeight);
      ctx.fillStyle = "rgba(0, 0, 0, 1)";
      ctx.fill();

      // text when game is over
      ctx.font = "30px Arial";
      ctx.fillStyle = "#fff";
      ctx.textAlign = "center";
      ctx.fillText("Game Over", this.gameWidth / 2, this.gameHeight / 2);
    }
  }


  // the function to toggle pause and play states of the game
  togglePause() {
    if (this.gamestate === GAMESTATE.PAUSED) {
      this.gamestate = GAMESTATE.RUNNING;
    } else {
      this.gamestate = GAMESTATE.PAUSED;
    }
  }
}
