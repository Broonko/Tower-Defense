function Tower() {
    this.x;
    this.y;
    this.range = 4;
    this.projectiles = [];
    this.distanceToAllEnemies = [];
    this.projectileTimer;

    this.addProjectiles = function() {
        this.projectiles.push(new Projectile());
    }

    // Calcula la distancia de cada torre a todos los enemigos.
    this.calculateEnemiesDistance = function(enemies) {
        this.distanceToAllEnemies = [];
        enemies.forEach(enemy => {
            let xIncrement = Math.abs(enemy.x - this.x);
            let yIncrement = Math.abs(enemy.y - this.y);
            let distanceEnemy = Math.sqrt((xIncrement**2) + (yIncrement**2));
            this.distanceToAllEnemies.push(distanceEnemy);
        });
    }

    // Si hay un enemigo en rango, la torre dispara.
    this.checkIfEnemiesInRange = function(enemies) {
        Array.min = function( array ){
            return Math.min.apply( Math, array );
        };
        let minDistance = Array.min(this.distanceToAllEnemies);
        for (let i = 0; i < this.distanceToAllEnemies.length; i++) {
            if (this.distanceToAllEnemies[i] === minDistance) {
                var enemyToShoot = i;
            }
        }
        // this.distanceToAllEnemies.sort(function(a, b) {
        //     return a - b
        // });
        if (minDistance < this.range) {
            this.shootProyectile(enemies, enemyToShoot);
        }
    }

    // Dispara el proyectil.
    this.shootProyectile = function(enemies, enemyToShoot) {
        let projectile = new Projectile();
        projectile.printProjectile(this.y, this.x);
        //console.log(projectile.projectileHtml);
        this.projectileTimer = setInterval(projectile.moveProjectile, 245, projectile, enemies, this.x, this.y);        
        this.killEnemy(enemies, enemyToShoot);
    }

    // Mata al enemigo y lo hace desaparecer del mapa.
    this.killEnemy = function(enemies, enemyTokill) {
        let enemyX = enemies[enemyTokill].x;
        let enemyY = enemies[enemyTokill].y;
        let enemy = document.querySelector(`tr.row${enemyY} > td.cell${enemyX}`);
        enemy.classList.remove('enemy');
        delete enemies[enemyTokill];
        enemies.splice(enemyTokill, 1);
        console.log(enemies);
    }
}