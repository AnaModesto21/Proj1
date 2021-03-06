const BARRIER_HEIGHT = 40;
const BARRIER_WIDTH = 50;
const BARRIER_MAX_HEALTH = 10;

class Barrier extends Rectangle {
  constructor(startX, startY) {
    super(startX, startY, BARRIER_WIDTH, BARRIER_HEIGHT)
    this.health = BARRIER_MAX_HEALTH;
    this.imgr = new Image();
    this.imgr.src = "./images/chimney-with-snow-hi.png";
  }

  resolveEnemyCollisions(bullets) {
    if (bullets.length === 0) {
      return;
    }
    bullets.forEach(bullet => {

      // Collides when bullet is touching or if it's moved below us

      if (this.detectCollision(bullet) ||
          this.intersectsX(bullet) && bullet.isBelow(this)) {
        this.health--;
        const height = Math.ceil((this.health / BARRIER_MAX_HEALTH) * BARRIER_HEIGHT);
        const diff = this.height - height;
        this.y += diff;
        this.height = height;
        bullet.kill();
      }
    });
  }

  resolvePlayerCollisions(bullet) {
    if (!bullet) {
      return;
    }
    
    // Collides when bullet is touching or if it's moved above us

    if (this.detectCollision(bullet) ||
        this.intersectsX(bullet) && bullet.isAbove(this)) {
      this.health--;
      const height = Math.floor((this.health / BARRIER_MAX_HEALTH) * BARRIER_HEIGHT);
      this.height = height;
      bullet.kill();
    }
  }


  isAlive() {
    return this.health > 0;
  }

  //barrier color

  render(ctx) {

    //ctx.fillStyle = 'darkred';
    //ctx.fillRect(this.x, this.y, this.width, this.height);
    app.ctx.drawImage(this.imgr, this.x, this.y, this.width, this.height);
    

  }
}