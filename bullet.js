const fireVelocitys = 5;
const fireShotSize = 5;
//Flames shot size

class Bullet extends Rectangle {
  constructor(startX, startY) {
    super(startX, startY, fireShotSize, fireShotSize);
    this.color = 'white';

    this.yVelocity = fireVelocitys;
    this.alive = true;
  }

  update(advance) {
    console.assert(this.alive);
    const yBound = canvasHeight - fireShotSize;
    const newY = this.y + this.yVelocity;

    if (newY > yBound) {
      this.kill();
    }
    this.y = newY;
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
}