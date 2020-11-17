function Projectile(towerX, towerY) {
  this.projectileHtml;
  this.towerX = towerX;
  this.towerY = towerY;
  this.top = 4;
  this.left = 4;
  this.timerId;
  this.distanceDone = 0;
  this.damage = 1;

  // Imprime el proyectil en la celda de la torre. (towers.js - line 35)
  this.printProjectile = function () {
    this.projectileHtml = document.createElement('div');
    this.projectileHtml.classList.add('projectile');
    this.towerHtml = document.querySelector(`tr.row${this.towerY} > td.cell${this.towerX}`);
    this.towerHtml.appendChild(this.projectileHtml);
  };

  // Calcula los parámetros del movimiento del proyectil. (towers.js - line 36)
  this.calcProjectileDir = function (enemy, position) {
    let distX = this.towerX - enemy.x;
    let distY = this.towerY - enemy.y;
    var distanceToEnemy = Math.sqrt((distX ** 2) + (distY ** 2));
    let angle = Math.atan(distX / distY);
    incX = Math.abs((1 / 2) * Math.sin(angle));
    incY = Math.abs((1 / 2) * Math.cos(angle));
    if (this.towerX > enemy.x) incX = -incX;
    if (this.towerY > enemy.y) incY = -incY;
    this.timerId = setInterval(this.moveProjectile.bind(this), 40, incX, incY, distanceToEnemy, enemy, position);
  };

  // Mueve el proyectil.
  this.moveProjectile = function (incX, incY, distanceToEnemy, enemy, position) {
    this.top += incY * 40;
    this.left += incX * 40;
    this.projectileHtml.style.top = this.top + "px";
    this.projectileHtml.style.left = this.left + "px";
    this.distanceDone += Math.sqrt((incX ** 2) + (incY ** 2));
    if (this.distanceDone >= distanceToEnemy  || this.distanceDone > 4) {
      this.doDamage (enemy, position);
      delete this;
      this.projectileHtml.remove();
      clearInterval(this.timerId);
    };
  };
  
  // Daña al enemigo.
  this.doDamage = function (enemy, position) {
    enemy.health -= this.damage;
    if (enemy.health === 0) game.deleteEnemy(position);
  };
};