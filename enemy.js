const FireXMove_width = 5;


class Enemy extends Rectangle {
  constructor(startX, startY, onBumpedEdge, onReachedEnd, image) {
    super(startX, startY, EnemyWidth, EnemyHeight);
    this.onBumpedEdge = onBumpedEdge;
    this.onReachedEnd = onReachedEnd;
    // this.color = 'blue';
    
    this.xVelocity = FireXMove_width;

    this.alive = true;
    this.img = new Image();
    this.img.src = "./images/imageedit_4_2121429937.png";
    
  }

  
  advanceY() {

    // Reverse direction.
    this.xVelocity *= -1;

    // Attempt to advance the row.
    const newY = this.y + EnemyRowMargin;
    const bound = canvasHeight - EnemyHeight * 2;
    if (newY >= bound) {
      this.onReachedEnd();
    } else {
      this.y = newY;
    }
  }

  //////////////////////////////////
  
  advanceX(advance) {

    const leftBound = EnemyColumnMargin;
    const rightBound = canvasWidth - this.width //- EnemyColumnMargin;

    const newX = this.x + this.xVelocity;
    const nextX = this.x + 2 * this.xVelocity;

    // Notify fleet if it's bumped into the edge.

    if (nextX > rightBound || nextX < leftBound) {
      this.onBumpedEdge();
    }
    this.x = newX;
  }

  render(ctx) {
    //ctx.fillStyle = this.color;
    app.ctx.drawImage(this.img, this.x, this.y, this.width, this.height);
    //ctx.fillRect(this.x, this.y, this.width, this.height);
  }

  //ctx.fillRect(this.x +30, this.y -50, 10, 10);
    
  // ctx.drawImage(this.img, this.x -10, this.y -50, 50, 75);
    

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