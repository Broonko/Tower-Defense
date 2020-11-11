function Projectile() {
//   this.x;
//   this.y;
  this.projectileHtml = document.querySelector('.projectile');
  this.speed = 200;
  this.top = 6;

  this.moveDown = function() {
    this.top += 20;
  }
}