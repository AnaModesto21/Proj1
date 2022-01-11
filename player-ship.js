const PLAYER_SHIP_HEIGHT = 40;
const PLAYER_SHIP_WIDTH = 30;
const PLAYER_SHIP_UPDATE_PIXELS_PER_TICK = 4;
const PLAYER_SHIP_RIGHT_BOUND = canvasWidth - PLAYER_SHIP_WIDTH;
const PLAYER_SHIP_LEFT_BOUND = 0;
const PLAYER_MAX_HEALTH = 3;

class PlayerShip extends Rectangle {
  constructor(onNewBullet, img) {
    const startX = (canvasWidth - PLAYER_SHIP_WIDTH) /2;
    const startY = canvasHeight - PLAYER_SHIP_HEIGHT;
    super(startX, startY, PLAYER_SHIP_WIDTH, PLAYER_SHIP_HEIGHT)

    this.onNewBullet = onNewBullet;
    this.onKeyDown = this.onKeyDown.bind(this);
    this.onKeyUp = this.onKeyUp.bind(this);
    this.lastBullet = null;
    this.img = new Image();
    this.img.src = "./images/lovepik-punching-muscle-santa-png-image_1330601.jpg_wh300.png";
    this.deer1 = new Image();
    this.deer1.src = "./images/1.png";
    this.deer2 = new Image();
    this.deer2.src = "./images/2.png";
    this.deer3 = new Image();
    this.deer3.src = "./images/3.png";
  }

  drawPlayer() {
    //app.ctx.drawImage(this.img, this.x, this.y, 100, 100);
    app.ctx.drawImage(this.img, this.x, this.y, 100, 100);
  }
  
  start() {
    this.restart();
    this.health = PLAYER_MAX_HEALTH;
    document.addEventListener('keyup', this.onKeyUp);
    document.addEventListener('keydown', this.onKeyDown);
  }

  restart() {
    this.health = Math.min(this.health + 1, PLAYER_MAX_HEALTH);
    this.xVelocity = 0;
    this.arrowsPressed = [];
  }

  stop() {
    document.removeEventListener('keyup', this.onKeyUp);
    document.removeEventListener('keydown', this.onKeyDown);
  }
  update(dt) {
    const newX = Math.max(
      Math.min(this.x + this.xVelocity, PLAYER_SHIP_RIGHT_BOUND), PLAYER_SHIP_LEFT_BOUND);
    this.x = newX;

    // "Reload" if last bullet has collided with something.
    if (this.lastBullet && !this.lastBullet.isAlive()) {
      this.lastBullet = null;
    }
  }


  //Health lowers down due to shot
  resolveCollisions(enemyBullets) {
    if (enemyBullets.length === 0) {
      return;
    }
    enemyBullets.forEach(bullet => {
      if (this.detectCollision(bullet)) {
        this.health--;
        bullet.kill();
      }
    });
  }

  render(ctx) {
    if (this.health >= PLAYER_MAX_HEALTH) {
      app.ctx.drawImage(this.deer1, 720, 520, 70, 70);
    } else if (this.health === 2) {
      app.ctx.drawImage(this.deer2, 720, 520, 70, 70);
    } else {
      app.ctx.drawImage(this.deer3, 720, 520, 70, 70);
    }
    //ctx.fillRect(this.x +30, this.y -50, 10, 10);
   
    //santa's img
   ctx.drawImage(this.img, this.x -10, this.y -27, 70, 75);
    

  }

  isAlive() {
    return this.health > 0;
  }

  shootBullet() {
    if (this.lastBullet) {
      return;
    }
    const bulletX = this.x + this.width + 13 ;
    
    const bulletY = this.y + this.height - 30;
    const bullet = new PlayerBullet(bulletX, bulletY);
    this.lastBullet = bullet;
    this.onNewBullet(bullet);
  }


  onKeyDown(event) {
    const key = event.key;
    if (key === 'ArrowLeft') {
      this.xVelocity = -PLAYER_SHIP_UPDATE_PIXELS_PER_TICK;
      this.arrowsPressed.push(key);
    } else if (key === 'ArrowRight') {
      this.xVelocity = PLAYER_SHIP_UPDATE_PIXELS_PER_TICK;
      this.arrowsPressed.push(key);
    } else if (key === ' ') {
      this.shootBullet();
    }
  }

  onKeyUp(event) {
    const key = event.key;
    this.arrowsPressed = this.arrowsPressed.filter(element => element !== key);
    if (this.arrowsPressed.length === 0) {
      this.xVelocity = 0;
    }
  }
}