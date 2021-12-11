const FireXMove_width = 5;

class Enemy extends Rectangle {
  constructor(startX, startY, onBumpedEdge, onReachedEnd) {
    super(startX, startY, EnemyWidth, EnemyHeight);
    this.onBumpedEdge = onBumpedEdge;
    this.onReachedEnd = onReachedEnd;
    this.color = 'white';

    this.xVelocity = FireXMove_width;

    this.alive = true;
  }

  advanceY() {
    console.log(this.alive);

    // Reverse direction.
    this.xVelocity *= -1.02;

    // Attempt to advance the row.
    const newY = this.y + EnemyRowMargin;
    const bound = canvasHeight - EnemyHeight * 5;
    if (newY >= bound) {
      this.onReachedEnd();
    } else {
      this.y = newY;
    }
  }

  //////////////////////////////////
  
  advanceX(advance) {
    console.log(this.alive);

    const leftBound = EnemyColumnMargin;
    const rightBound = canvasWidth - this.width //- EnemyColumnMargin;

    const newX = this.x + this.xVelocity;
    const nextX = this.x + 2 * this.xVelocity;

    // Notify fleet if it's bumped into the edge.

    if (nextX > rightBound || nextX < leftBound) {
      this.onBumpedEdge();
    }
    console.log(newX >= leftBound);
    console.log(newX <= rightBound);
    this.x = newX;
  }

  render(ctx) {
    console.assert(this.alive);
    ctx.fillStyle = this.color;
    ctx.fillRect(this.x, this.y, this.width, this.height);
  }

  kill() {
    this.alive = false;
  }

  isAlive() {
    return this.alive;
  }

  createBullet() {
    const bulletX = this.x + this.width / 2;
    const bulletY = this.y + this.height / 2;
    return new Bullet(bulletX, bulletY);
  }
}