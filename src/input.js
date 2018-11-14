// defining the keyboard  inputs handler

export default class InputHandler {
  constructor(paddle, game) {
    document.addEventListener("keydown", event => {
      switch (event.keyCode) {
        case 37:  // when left arrow key is pressed
          event.preventDefault();  // prevents the default behavior of the pressed key
          paddle.moveLeft(); // binds the actual behavior(move left) to the key
          break;
        case 39:
          event.preventDefault();  // prevents the default behavior of the pressed key
          paddle.moveRight();  // binds the actual behavior(move right) to the key
          break;
        case 27:
          event.preventDefault();  // prevents the default behavior of the pressed key
          game.togglePause();  // toggling the pause state when ESC key is pressed
          break;
        case 32:
          event.preventDefault();  // prevents the default behavior of the pressed key
          game.start();  // starting the game after pressing the SPACEBAR
          break;
      }
    });

    document.addEventListener("keyup", event => {
      switch (event.keyCode) {
        case 37:
          event.preventDefault();  // prevents the default behavior of the pressed key
          if (paddle.speed < 0) {
            return paddle.stop();  // stoping the object when the key is up
          }

          break;
        case 39:
          event.preventDefault();  // prevents the default behavior of the pressed key
          if (paddle.speed > 0) {
            return paddle.stop();  // stoping the object when the key is up
          }
          break;
      }
    });
  }
}
