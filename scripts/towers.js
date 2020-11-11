function Tower() {
    this.x;
    this.y;
    this.range = 400;
    this.projectiles = [];

    this.addProjectiles = function() {
        this.projectiles.push(new Projectile());
    }
}