// importing detectCollision function to check collision
import { detectCollision } from "./collisionDetection.js";

// initializing ball class with the necessary properties
export default class Ball {
  constructor(game) {
    this.image = document.getElementById("img-ball");
    this.gameWidth = game.gameWidth;
    this.gameHeight = game.gameHeight;
    this.game = game;
    this.size = 16;
    // reseting the ball
    this.reset();
  }

  // ball reset funciton
  reset() {
    this.position = { x: 10, y: 400 };
    this.speed = { x: 5, y: -2 };
  }

  // drawing the ball on canvas, function takes 5 arguments to draw
  draw(ctx) {
    ctx.drawImage(
      this.image,
      this.position.x,
      this.position.y,
      this.size,
      this.size
    );
  }


  // ball update function, it updates the state of the ball, position etc.
  update(deltaTime) {
    this.position.x += this.speed.x;
    this.position.y += this.speed.y;

    // checking ball touch then reflecting it
    if (this.position.x + this.size > this.gameWidth || this.position.x < 0) {
      this.speed.x = -this.speed.x;
    }

    // top of the ball
    if (this.position.y < 0) {
      this.speed.y = -this.speed.y;
    }


    // bottom of the ball
    if (this.position.y + this.size > this.gameHeight) {
      this.game.lives--;
      this.reset();
    }

    // calling collision detection function and if it returns true then ball reflects
    if (detectCollision(this, this.game.paddle)) {
      this.speed.y = -this.speed.y;
      this.position.y = this.game.paddle.position.y - this.size;
    }
  }
}
