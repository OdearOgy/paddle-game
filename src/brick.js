// importing detectCollision function to check collision
import { detectCollision } from "./collisionDetection.js";

// creating brick class
export default class Brick {
  constructor(game, position) {
    this.image = document.getElementById("img-brick");
    this.game = game;
    this.position = position;
    this.width = 80;
    this.height = 60;
    this.markedForDeletion = false;
  }

  update() {
    // updating brick, when ball touchess it. Deleting brick(s)
    if (detectCollision(this.game.ball, this)) {
      this.game.ball.speed.y = -this.game.ball.speed.y;
      this.markedForDeletion = true;
    }
  }

  // brick draw function, which takes 5 arguments
  draw(ctx) {
    ctx.drawImage(
      this.image,
      this.position.x,
      this.position.y,
      this.width,
      this.height
    );
  }
}
