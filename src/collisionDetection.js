// defining collisionDetection function, which returns boolean values
export function detectCollision(ball, gameObject) {
  // getting a bottom of the ball
  let bottomOfBall = ball.position.y + ball.size;
  // gettin a top of the ball
  let topOfBall = ball.position.y;

  // getting sides of the object(s)
  let topOfObject = gameObject.position.y;
  let leftSideOfObject = gameObject.position.x;
  let rightSideOfObject = gameObject.position.x + gameObject.width;
  let bottomOfObject = gameObject.position.y + gameObject.height;

  // checking touch(collision) with comparison, comparing values
  if (
    bottomOfBall >= topOfObject &&
    topOfBall <= bottomOfObject &&
    ball.position.x >= leftSideOfObject &&
    ball.position.x + ball.size <= rightSideOfObject
  ) {
    return true; // returns after detecting collision
  } else {
    return false; // if no collision has occured then false :)
  }
}
