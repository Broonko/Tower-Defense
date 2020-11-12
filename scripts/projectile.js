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

  this.moveProjectile = function (projectile, enemies, towerX, towerY) {
    enemies.forEach(enemy => {
      console.log(projectile.top);
      let xIncrement = (towerX - enemy.x);
      let yIncrement = (towerY - enemy.y);
      let angle = Math.atan(yIncrement / xIncrement);
      let moveProjectileX = 10 * Math.cos(angle);
      let moveProjectileY = 10 * Math.sin(angle);
      console.log(moveProjectileY);
      projectile.top += moveProjectileY;
      console.log(projectile.projectileHtml);
      projectile.left += moveProjectileX;
      projectile.projectileHtml.style.top = projectile.top + "px";
      projectile.projectileHtml.style.left = projectile.left + "px";
      console.log(projectile.top);
      //console.log(projectile.left);
    });
  }
}