function Game(size) {
    self = this;
    this.size = size;
    this.animateTimer;
    this.moveTimer;
    this.projectileTimer;
    this.health = 3;
    this.towers = [];
    this.map;
    this.enemies = [];
    this.storage = [];
    this.sounds = new Sound();

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
                // console.log(cell)
                // this.generateBackground(cell);
            }
            table.appendChild(row);
            row.classList.add("row" + i);
        }
        canvas.appendChild(table);
    };

    // this.generateBackground = function(cell) {
    //     // console.log(cell)
    //     let zerOne = Math.random()*4;
    //     if (zerOne < 1) {
    //         console.log(cell)
    //         cell.classList.add('zeroSoft');
    //     }
    //     if (zerOne >= 1 && zerOne < 2) {
    //         console.log(cell)
    //         cell.classList.add('zeroHard');
    //     }
    //     if (zerOne >= 2 && zerOne < 3) {
    //         console.log(cell)
    //         cell.classList.add('oneSoft');
    //     }
    //     if (zerOne >= 3 && zerOne < 4) {
    //         console.log(cell)
    //         cell.classList.add('oneHard');
    //     }
    // }

    // Genera una matriz llena de 0 del tamaño "size".
    this.generateTable = function (size) {
        return Array(size).fill(Array(size).fill(0));
    };

    // Genera el camino en la fila indicada en HTML.
    this.printPathLevel1 = function () {
        var level1Path = document.getElementsByClassName("row10")[0];
        level1Path.classList.add("path");
        // for (let i = 0; i < level1Path.length; i++) {
        //     level1Path[i].classList.remove("zeroSoft");
        //     level1Path[i].classList.remove("zeroHard");
        //     level1Path[i].classList.remove("oneSoft");
        //     level1Path[i].classList.remove("oneHard");
        // }
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

            self.enemies.forEach(enemy => {
                if (self.map[enemy.y][enemy.x] === 1) enemy.moveUp();
                if (self.map[enemy.y][enemy.x] === 2 || enemy.x === -1) enemy.moveRight();
                if (self.map[enemy.y][enemy.x] === 3) enemy.moveDown();
                if (self.map[enemy.y][enemy.x] === 4) enemy.moveLeft();
                //console.log(enemy);
                enemy.printEnemy();
            });
        }
    };

    this.deleteEnemy = function (position) {
        if (this.enemies.length > 0) {
            let enemy = document.querySelector(`tr.row${this.enemies[position].y} > td.cell${this.enemies[position].x}`);
            enemy.classList.remove('enemy');
            delete this.enemies[position];
            this.enemies.splice(position, 1);
            this.sounds.enemyKilled.play();
        }
        console.log(this.enemies);
    };

    // Añade onclick en las celdas del mapa.
    this.addClickEvent = function () {
        this.map.forEach((row, r) => {
            row.forEach((cell, c) => {
                if (cell === 0) {
                    let cellHtml = document.querySelector(`tr.row${r} > td.cell${c}`)
                    cellHtml.onclick = function () {
                        self.sounds.towerBuilt.play();
                        self.addTowers(cellHtml, r, c);
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

    // Quita salud al jugador.
    this.looseHealth = function () {
        self.health--;
    };

    // Actualiza la vida del jugador.
    this.updateHealthDisplay = function () {
        let health = document.getElementById('health');
        health.innerText = `${self.health}`;
    };

    this.resetEnemies = function () {
        for (let i = 0; i < self.storage.length; i++) {
            delete self.storage[i];
        }
        for (let i = 0; i < self.enemies.length; i++) {
            delete self.enemies[i];
        }
        console.log(self.enemies)
        console.log(self.storage)
        self.storage = [];
        self.enemies = [];
    }

    // Fin de partida.
    this.gameOver = function () {
        clearInterval(self.moveTimer);
        clearInterval(self.animateTimer);
        self.resetEnemies();
        document.getElementById('gameOver').style.zIndex = 1;
        // alert("GAME OVER");
    };

    this.win = function () {
        clearInterval(this.moveTimer);
        clearInterval(this.animateTimer);
        this.sounds.winSound.play();
        this.resetEnemies();
        document.getElementById('victory').style.zIndex = 1;
        // alert("CONGRATULATIONS YOU WIN");
    }

    // Anima el juego.
    this.animateGame = function () {
        if (this.health === 0) {
            this.gameOver();
        }
        if (this.storage.length === 0 &&
            this.enemies.length === 0 &&
            this.health > 0) {
            this.win();
        }
        this.animateEnemies();
        this.animateTowers();
    }.bind(this);

    // Inicia el juego.
    this.startLevel = function () {
        let startButton = document.getElementById('startButton');
        // let canvas = document.getElementById('canvas');
        // canvas.onclick = function() {
        //     this.startMusic.loop = true;
        //     this.sounds.startMusic.volume = 0.2;
        //     this.sounds.startMusic.play();
        // }.bind(this);
        startButton.onclick = function () {
            // this.startMusic.pause();
            document.getElementById('start').style.display = 'none';
            document.getElementsByTagName('h1')[0].style.display = 'none';
            document.getElementById('health').style.zIndex = '1';
            document.getElementById('heart').style.zIndex = '1';
            document.getElementById('startScreen').style.backgroundImage = 'url("images/background2.jpg")';
            this.sounds.backgroundMusic.loop = true;
            this.sounds.backgroundMusic.play();
            this.generateTableHtml(game.size);
            this.map = this.level1();
            this.printPathLevel1();
            this.storeEnemies();
            this.addClickEvent();
            // this.displayHealth();
            this.moveTimer = setInterval(this.addEnemiesToMap, 1000);
            this.animateTimer = setInterval(this.animateGame, 350);
        }.bind(this);
    };
    this.startLevel();
}


var game = new Game(15);
// console.log(game);



