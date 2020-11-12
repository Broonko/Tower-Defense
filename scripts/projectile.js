function Projectile() {
  //   this.x;
  //   this.y;
  this.projectileHtml = document.querySelector('.projectile');
  this.speed = 200;
  this.top = 6;
  this.left = 6;

  /*this.moveDown = function() {
    this.top += 20;
  }*/

  this.printProjectile = function (y, x) {
    let cell = document.querySelector(`tr.row${y} > td.cell${x}`);
    let projectile = document.createElement('div');
    projectile.classList.add('projectile');
    cell.appendChild(projectile);
    //console.log(this.projectileHtml);
  }

  this.moveProjectile = function (projectile, enemies, enemyToKill, towerX, towerY) {
    enemies.forEach((enemy, e) => {
      console.log(projectile.top);
      let xIncrement = (towerX - enemy.x);
      let yIncrement = (towerY - enemy.y);
      let angle = Math.atan(yIncrement / xIncrement);
      let moveProjectileX = 10 * Math.cos(angle);
      let moveProjectileY = 10 * Math.sin(angle);
      console.log(moveProjectileY);
      projectile.top -= moveProjectileY;
      console.log(projectile.projectileHtml);
      projectile.left -= moveProjectileX;
      projectile.projectileHtml.style.top = projectile.top + "px";
      projectile.projectileHtml.style.left = projectile.left + "px";
      console.log(projectile.top);
      //console.log(projectile.left);
      let distanceDone = 0;
      distanceDone += Math.sqrt((moveProjectileX ** 2) + (moveProjectileY ** 2));
      if (distanceDone >= distanceToAllEnemies[e]) {
        this.killEnemy(enemies, enemyToKill);
      }; 
    });
  };

  // Mata al enemigo y lo hace desaparecer del mapa.
  this.killEnemy = function(enemies, enemyTokill) {
    let enemyX = enemies[enemyTokill].x;
    let enemyY = enemies[enemyTokill].y;
    let enemy = document.querySelector(`tr.row${enemyY} > td.cell${enemyX}`);
    enemy.classList.remove('enemy');
    delete enemies[enemyTokill];
    enemies.splice(enemyTokill, 1);
    console.log(enemies);
  };
};