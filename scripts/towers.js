function Tower() {
    this.x;
    this.y;
    this.range = 4;
    this.distanceToAllEnemies = [];
    this.projectileTimer;
    this.sounds = new Sound();

    // Calcula la distancia de cada torre a todos los enemigos. (game.js - line XXX)
    this.calculateEnemiesDistance = function(enemies) {
        this.distanceToAllEnemies = [];
        enemies.forEach(enemy => {
            let xIncrement = Math.abs(enemy.x - this.x);
            let yIncrement = Math.abs(enemy.y - this.y);
            let distanceEnemy = Math.sqrt((xIncrement**2) + (yIncrement**2));
            this.distanceToAllEnemies.push(distanceEnemy);
        });
    };

    // Si hay un enemigo en rango, la torre dispara. (game.js - line XXX)
    this.checkIfEnemiesInRange = function(enemies) {
        Array.min = function( array ){                      
            return Math.min.apply( Math, array );
        };
        let minDistance = Array.min(this.distanceToAllEnemies);
        let enemyToShoot = this.distanceToAllEnemies.indexOf (minDistance);
        if (minDistance < this.range) {
            this.shootProyectile(enemies, enemyToShoot);
        };
    };

    // Dispara el proyectil.
    this.shootProyectile = function(enemies, enemyToShoot) {
        let projectile = new Projectile(this.x, this.y, this.damage);
        projectile.printProjectile();
        projectile.calcProjectileDir(enemies[enemyToShoot], enemyToShoot);
        if (!muted) this.sounds.shootSound.play();
    };
};

//
function Tower1() {
    Tower.call(this);
    this.damage = 1;
};
Tower1.prototype = Object.create(Tower.prototype);
Tower1.prototype.constructor = Tower1;

function Tower2() {
    Tower.call(this);
    this.damage = 2;
};
Tower2.prototype = Object.create(Tower.prototype);
Tower2.prototype.constructor = Tower2;

function Tower3() {
    Tower.call(this);
    this.damage = 3;
};
Tower3.prototype = Object.create(Tower.prototype);
Tower3.prototype.constructor = Tower3;

