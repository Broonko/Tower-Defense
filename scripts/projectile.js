function Projectile(towerX, towerY) {
  //   this.x;
  //   this.y;
  this.projectileHtml;
  //this.towerHtml;
  this.towerX = towerX;
  this.towerY = towerY;
  this.speed = 200;
  this.top = 6;
  this.left = 6;
  this.timerId;
  this.distanceDone = 0;

  /*this.moveDown = function() {
    this.top += 20;
  }*/

  this.printProjectile = function () {
    this.projectileHtml = document.createElement('div');
    this.projectileHtml.classList.add('projectile');
    this.towerHtml = document.querySelector(`tr.row${this.towerY} > td.cell${this.towerX}`);
    //console.log(this.towerHtml);
    this.towerHtml.appendChild(this.projectileHtml);
  };

  // this.moveProjectile = function (projectile, enemies, enemyToKill, towerX, towerY) {
  this.moveProjectile = function (enemy, position) {
    // enemy: x y
    // projectily: this.projectileHTML.x this.projectileHTML.y
    // time: 1s

    let distX = this.towerX - enemy.x;
    let distY = this.towerY - enemy.y;
    var distanceToEnemy = Math.sqrt((distX ** 2) + (distY ** 2));
    let angle = Math.atan(distX / distY);
    //console.log(distX);
    incX = Math.abs((1/2)*Math.sin(angle));
    incY = Math.abs((1/2)*Math.cos(angle));
    //console.log(incX);
    if (this.towerX > enemy.x) incX = -incX;
    if (this.towerY > enemy.y) incY = -incY;
    //console.log(incX)
    this.timerId = setInterval(this.moveProjectile2.bind(this), 43, incX, incY, distanceToEnemy, position);
  };

  this.moveProjectile2 = function(incX, incY, distanceToEnemy, position) {
    //console.log(incX);
    this.top += incY*20;
    this.left += incX*20;
    console.log("esto es el inc de x: " + incX);
    console.log("esto es el inc de y: " + incY);

    this.projectileHtml.style.top = this.top + "px";
    this.projectileHtml.style.left = this.left + "px";
    this.distanceDone += Math.sqrt((incX ** 2) + (incY ** 2));
    console.log("esto es distanceDone: " + this.distanceDone); 
    if (this.distanceDone >= distanceToEnemy) {
      console.log("distanceToEnemy vale: " + distanceToEnemy);
      console.log("this.distanceDone vale: " + this.distanceDone);
      game.deleteEnemy(position);
      delete this;
      clearInterval(this.timerId);
    }
      // this.killEnemy(enemy);
  }
    /*enemies.forEach((enemy, e) => {
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
  };*/

  // Mata al enemigo y lo hace desaparecer del mapa.    
}