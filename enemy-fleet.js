const EnemyRowMargin = 18;
const ColumnsNumber = 11;
const RowsNumber = 5;
const FireStartY = 100;
const EnemyHeight = 20;
const EnemyWidth = 30;
const EnemyColumnMargin = 7;
const FrequencyStart = 15;
const FrequencyMin = 5;
const FireShootProbability = 2;
const FireShootProbabilityFrequency= 50;
const FireWidth = (ColumnsNumber - 1) * EnemyColumnMargin + ColumnsNumber * EnemyWidth
const FireStartX = (FireWidth - 2 * EnemyColumnMargin) / 4;


class EnemyFleet {
  constructor(onNewBullet, onEnemyKilled) {
    this.onNewBullet = onNewBullet;
    this.onEnemyKilled = onEnemyKilled;

    this.onBumpedEdge = this.onBumpedEdge.bind(this);
    this.onReachedEnd = this.onReachedEnd.bind(this);
    
  }

  start() {
    this.restart();
  }

  restart() {

    // All living invaders in a list.

    this.enemies = [];


    
    // All enemies (living and dead) stored by position in grid

    this.enemiesByColRow = [];
    this.numberKilled = 0;
    this.ticksSoFar = 0;
    this.FireShotsSinceLastSpeedUp = 0;
    this.updateFrequency = FrequencyStart;
    this.needsNextRow = false;
    this.conquered = false;

    //creates enemies in new array

    for (let col = 0; col < ColumnsNumber; col++) {
      const startX = FireStartX + (EnemyWidth + EnemyColumnMargin) * col;
      this.enemiesByColRow[col] = [];
      for (let row = 0; row < RowsNumber; row++) {
        const startY = FireStartY + (EnemyHeight + EnemyRowMargin) * row;
        const enemy = new Enemy(startX, startY, this.onBumpedEdge, this.onReachedEnd);
        this.enemies.push(enemy);
        this.enemiesByColRow[col].push(enemy);
      }
    }
  }

  resolveCollisions(bullet) {
    if (!bullet) {
      return;
    }

    this.enemies.forEach((enemy) => {
      if (enemy.detectCollision(bullet)) {
        enemy.kill();
        bullet.kill();
        this.numberKilled++;
        this.onEnemyKilled();
      }
    });
    this.enemies = this.enemies.filter(enemy => enemy.isAlive());
  }
    //advance 
  update(advance) {
    this.ticksSoFar += advance;
    this.FireShotsSinceLastSpeedUp += advance;

    // Choose a random shooter.

    // enemy shots frequency

      if (this.ticksSoFar % (FireShootProbabilityFrequency) === 0) {
      const shotsFired = 3;
      for (let i = 0; i < shotsFired; i++) {
        const shouldShoot = Math.random() < FireShootProbability;
        if (shouldShoot) {
          const shooter = this.chooseRandomShooter();
          const bullet = shooter.createBullet();
          this.onNewBullet(bullet);
        }
      }
    }
        //starts speeding up depending on "killed" fires

    if (this.FireShotsSinceLastSpeedUp % this.updateFrequency === 0) {
      if (this.needsNextRow) {
        this.enemies.forEach(enemy => enemy.advanceY());
        this.needsNextRow = false;
      } else {
        this.enemies.forEach(enemy => enemy.advanceX(advance));
      }
      if (this.numberKilled > 0) {
        this.updateFrequency =
            Math.max(this.updateFrequency - this.numberKilled, FrequencyMin);
        this.FireShotsSinceLastSpeedUp = 0;
        this.numberKilled = 0;
      }
    }
  }

  render(ctx) {
    this.enemies.forEach(enemy => enemy.render(ctx));
  }

  hasConquered() {
    return this.conquered;
  }

  isDefeated() {
    return this.enemies.length === 0;
  }

  // Private methods

  onBumpedEdge() {
    this.needsNextRow = true;
  }

  onReachedEnd() {
    this.conquered = true;
  }
  //chooses fireshooter randomly

  chooseRandomShooter() {
    const potentialShooters = [];
    for (const row of this.enemiesByColRow) {
      for (let i = row.length - 1; i >= 0; i--) {
        const enemy = row[i];
        if (enemy.isAlive()) {
          potentialShooters.push(enemy);
          break;
        }
      }
    }
    const index = Math.floor(Math.random() * (potentialShooters.length));
    if (index !== -1) {
      return potentialShooters[index];
    } else {
      return null;
    }
  }
}