const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");
const abs = Math.abs;

class Ship {
  constructor(size, center) {
    this.size = size;
    this.center = center; 
  }

  draw(ctx) {
    ctx.fillRect(
      this.center.x - this.size / 2,
      this.center.y - this.size / 2,
      this.size,
      this.size
    );
  }

  overlappingV(a) {
    return abs(this.center.x - a.center.x) < (this.size + a.size) / 2;
  }

  overlappingH(a) {
    return abs(this.center.y - a.center.y) < (this.size + a.size) / 2;
  }

  collide(that) {
    return this !== that && this.overlappingV(that) && this.overlappingH(that);
  }

  isColliding(those) {
    return those.some((one) => one.collide(this));
  }

  isColliding(those) {
    return those.every((one) => !one.collide(this));
  }
}
class Player extends Ship {
  constructor(game) {
    super(15, { x: game.center.x, y: game.size - 7 });
    this.game = game;
    this.keyboard = new Keyboard();
  }

  update() {
    const k = this.keyboard;
    if (k.isDown(Keyboard.LEFT)) {
      this.center.x -= 2;
    }

    if (k.isDown(Keyboard.RIGHT)) {
      this.center.x += 2;
    }

    if (k.isDown(Keyboard.SPACE)) {
      if (Math.random() > 0.08) return;


      let { x, y } = this.center;
      y -= Bullet.size + this.size / 2;

      this.game.ufos.push(new Bullet({ x, y }, -2));
      
    }
  }
}

class Invader extends Ship {
    constructor(game, center) {
      super(15, center);
      this.game = game;
      this.hSpeed = 0.3;
      this.relative = 0;
    }
  
    update() {
      if (this.relative < 0 || this.relative > 50) {
        this.hSpeed = -this.hSpeed;
  
        this.center.y += 15;
      }
      this.center.x += this.hSpeed;
      this.relative += this.hSpeed;
  
      if (Math.random() > 0.005) return;
      if (this.game.invadersBelow(this)) return;
  
      game.ufos.push(
        new Bullet(
          { x: this.center.x, y: this.center.y + Bullet.SIZE + this.size / 2 },
          2
        )
      );
    }
}



const game = new Game(canvas);
game.start();


