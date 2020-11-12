function Game(size) {
    self = this;
    this.size = size;
    this.animateTimer;
    this.moveTimer;
    this.projectileTimer;
    this.health = 2;
    this.towers = [];
    this.map;
    this.enemies = [];
    this.storage = [];

    // Genera el tablero de juego en HTML.
    this.generateTableHtml = function (size) {
        var canvas = document.getElementById("canvas");
        var table = document.createElement("table");
        for (let i = 0; i < size; i++) {
            var row = document.createElement("tr");
            for (let j = 0; j < size; j++) {
                var cell = document.createElement("td");
                row.appendChild(cell);
                cell.classList.add("cell" + j);
            }
            table.appendChild(row);
            row.classList.add("row" + i);
        }
        canvas.appendChild(table);
    };

    // Genera una matriz llena de 0 del tamaño "size".
    this.generateTable = function (size) {
        return Array(size).fill(Array(size).fill(0));
    };

    // Genera el camino en la fila indicada en HTML.
    this.printPathLevel1 = function () {
        var level1Path = document.getElementsByClassName("row10")[0];
        level1Path.classList.add("path");
    };

    // Sustituye los 0 de la fila indicada por 2.
    this.level1 = function () {
        let field = this.generateTable(this.size);
        field.splice(10, 1, Array(this.size).fill(2));
        return field;
    };

    // Genera los enemigos y los guarda en un array(storage).
    this.storeEnemies = function () {
        for (let i = 0; i < 6; i++) {
            this.storage.push(new Enemy(this.size));
        }
    };

    // Añade los enemigos al array mapa.
    this.addEnemiesToMap = function () {
        if (self.storage.length > 0) {
            self.enemies.push(self.storage.shift());
        }
    };

    // Mueve e imprime los enemigos.
    this.animateEnemies = function () {
        if (self.enemies.length > 0) {
            if (self.enemies[0].x === self.size) {
                delete self.enemies[0];
                self.enemies.shift();
                self.looseHealth();
                self.updateHealthDisplay();
            }
            // Si lo hacemos con else if, funsciona siempre y cuando haya un espacio entre todos los enemigos.
            if (self.health === 0) {
                self.gameOver();
            }
            self.enemies.forEach(enemy => {
                if (self.map[enemy.y][enemy.x] === 2 || enemy.x === -1) {
                    enemy.moveRight();
                }
                //console.log(enemy);
                enemy.printEnemy();
            });
        }
    };

    this.deleteEnemy = function(position) {
        let enemy = document.querySelector(`tr.row${this.enemies[position].y} > td.cell${this.enemies[position].x}`);
        enemy.classList.remove('enemy');
        delete this.enemies[position];
        this.enemies.splice(position, 1);
        //console.log(enemies);
    };

    // Añade onclick en las celdas del mapa.
    this.addClickEvent = function () {
        this.map.forEach((row, r) => {
            row.forEach((cell, c) => {
                if (cell === 0) {
                    let cellHtml = document.querySelector(`tr.row${r} > td.cell${c}`)
                    cellHtml.onclick = function () {
                        self.addTowers(cellHtml, r, c);
                        //let projectile = document.createElement('div');
                        // let projectilee = new Projectile();
                        // self.printProjectile(y, x);
                        // self.projectileTimer = setInterval(self.animateProjectiles, 300, r, c, projectilee); //, self.towers[self.towers.length-1]
                        // self.printProjectile(r, c);
                        // self.moveProjectile();
                    }
                }
            });
        });
    };

    // Añade torres.
    this.addTowers = function (cell, y, x) {
        cell.classList.add("towers");
        this.towers.push(new Tower());
        this.towers[this.towers.length - 1].y = y;
        this.towers[this.towers.length - 1].x = x;
    };

    // Anima las torres.
    this.animateTowers = function () {
        if (self.towers.length > 0) {
            for (let i = 0; i < self.towers.length; i++) {
                self.towers[i].calculateEnemiesDistance(self.enemies);
                self.towers[i].checkIfEnemiesInRange(self.enemies);
            }
        }
    }

    // this.animateProjectiles = function(y, x, projectile, currentTower) {
    //     // currentTower.addProjectiles();
    //     self.moveProjectile(projectile);
    // }

    // this.printProjectile = function(y, x) {
    //     let cell = document.querySelector(`tr.row${y} > td.cell${x}`);
    //     projectile.classList.add('projectile');
    //     cell.appendChild(projectile);
    // }

    // this.moveProjectile = function(projectile) {
    //     console.log(projectile)
    //     projectile.moveDown();
    //     projectile.projectileHtml.style.top = projectile.top + 'px';
    //     console.log(projectile)
    // let projectilesArray = self.towers[self.towers.length-1].projectiles;
    // for (let i = 0; i < projectilesArray.length; i++) {
    //     projectilesArray[i].moveDown();
    // }
    //}

    // Quita salud al jugador.
    this.looseHealth = function () {
        self.health--;
    };

    // Muestra la salud del jugador.
    this.displayHealth = function () {
        let canvas = document.getElementById('canvas');
        let healthDisplay = document.createElement('section');
        healthDisplay.innerText = `HEALTH: ${self.health}`;
        healthDisplay.classList.add('healthDisplay');
        canvas.appendChild(healthDisplay);
    };

    // Actualiza la vida del jugador.
    this.updateHealthDisplay = function () {
        let healthDisplay = document.getElementsByClassName('healthDisplay')[0];
        healthDisplay.innerText = `HEALTH: ${self.health}`;
    };

    // Fin de partida.
    this.gameOver = function () {
        clearInterval(self.moveTimer);
        clearInterval(self.animateTimer);
        self.enemies = [];
        alert("GAME OVER");
    };

    // Anima el juego.
    this.animateGame = function () {
        self.animateEnemies();
        self.animateTowers();
    }

    // Inicia el juego.
    this.startLevel = function () {
        this.generateTableHtml(game.size);
        this.map = this.level1();
        this.printPathLevel1();
        this.storeEnemies();
        this.addClickEvent();
        this.displayHealth();
        this.moveTimer = setInterval(this.addEnemiesToMap, 1000);
        this.animateTimer = setInterval(this.animateGame, 350);
    };
}

var game = new Game(20);
console.log(game);
game.startLevel();