// creating the Paddle class
export default class Paddle {
  constructor(game) {
    this.gameWidth = game.gameWidth;
    // defining the height and width of the paddle
    this.width = 150;
    this.height = 30;

    // paddle's speed
    this.maxSpeed = 8.4;
    this.speed = 0;

    // position of the paddle
    this.position = {
      x: game.gameWidth / 2 - this.width / 2,
      y: game.gameHeight - this.height - 10
    };
  }

  // controlling functions


  moveLeft() {
    this.speed = -this.maxSpeed; // moves paddle left
  }

  moveRight() {
    this.speed = this.maxSpeed; // moves paddle right
  }

  stop() {
    this.speed = 0; // stops paddle
  }

  // updating the paddle
  update(deltaTime) {
    this.position.x += this.speed;

    if (this.position.x < 0) {
      return (this.position.x = 0);
    }
    if (this.position.x + this.width > this.gameWidth) {
      return (this.position.x = this.gameWidth - this.width);
    }
  }

  // drawing the paddle
  draw(ctx) {
    ctx.fillStyle = "#0ff";
    ctx.fillRect(this.position.x, this.position.y, this.width, this.height);
  }
}
