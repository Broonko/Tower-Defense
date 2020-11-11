function Tower() {
    this.x;
    this.y;
    this.range = 4;
    this.projectiles = [];

    this.addProjectiles = function() {
        this.projectiles.push(new Projectile());
    }

    this.calculateEnemiesDistance = function() {

    }
}