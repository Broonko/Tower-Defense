function Game(size) {
    self = this;
    this.size = size,
    this.animateTimer,
    this.moveTimer,
    this.health = 3,
    // this.towers = new Tower(),
    this.map,
    this.enemies = [],
    this.storage = [],

    // Genera el tablero de juego en HTML.
    this.generateTableHtml = function(size) { 
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
    }

    // Genera una matriz llena de 0 del tamaño "size".
    this.generateTable = function(size) {     
        return Array(size).fill(Array(size).fill(0));
    }

    // Genera el camino en la fila indicada en HTML.
    this.printPathLevel1 = function() {
        var level1Path = document.getElementsByClassName("row10")[0];
        level1Path.classList.add("path");
    }

    // Sustituye los 0 de la fila indicada por 2.
    this.level1 = function() {
        let field = this.generateTable(this.size);
        field.splice(10, 1, Array(this.size).fill(2));
        return field;
    }

    // Añade torres.
    this.addTowers = function(cell) {
        cell.classList.add("towers");
    }

    // Añade onclick en las celdas del mapa.
    this.addClickEvent = function() {
        self.map.forEach((row, r) => {
            row.forEach((cell, c) => {
                if (cell === 0) {
                    let cellHtml = document.querySelector(`tr.row${r} > td.cell${c}`)
                    cellHtml.onclick = function() {
                        self.addTowers(cellHtml);   
                    }
                }
            });
        });
    }

    // Fin de partida.
    this.gameOver = function() {
        clearInterval(self.moveTimer);
        clearInterval(self.animateTimer);
        self.enemies = [];
        alert ("GAME OVER");
    }

    // Mueve e imprime los enemigos.
    this.animateEnemies = function() {
        if (self.enemies.length > 0) {
            if (self.enemies[0].x === self.size) {
                self.enemies.shift();
                self.looseHealth();
                self.updateHealthDisplay();
            } 
            if (self.health === 0) {
                self.gameOver();
            }
            self.enemies.forEach(enemy => {
                if (self.map[enemy.y][enemy.x] === 2 || enemy.x === -1) {
                    enemy.moveRight();
                }
                console.log(enemy);
                enemy.printEnemy();
            });
        }
    }
    
    // Genera los enemigos y los guarda en un array(storage).
    this.storeEnemies = function() {
        for (let i = 0; i < 5; i++) {
            this.storage.push(new Enemy(this.size));
        }
    }
    
    // Añade los enemigos al array mapa.
    this.addEnemiesToMap = function() {
        if (self.storage.length > 0) {
            self.enemies.push(self.storage.shift());
        }
    }  

    // Quita salud al jugador.
    this.looseHealth = function() {
        self.health--;   
    }

    // Muestra la salud del jugador.
    this.displayHealth = function() {
        let canvas = document.getElementById('canvas');
        let healthDisplay = document.createElement('section');
        healthDisplay.innerText = `HEALTH: ${self.health}`;
        healthDisplay.classList.add('healthDisplay');
        canvas.appendChild(healthDisplay);
    }

    // Actualiza la vida del jugador.
    this.updateHealthDisplay = function() {
        let healthDisplay = document.getElementsByClassName('healthDisplay')[0];
        healthDisplay.innerText = `HEALTH: ${self.health}`;
    }

    // Inicia el juego.
    this.startLevel = function () {
        this.generateTableHtml(game.size);
        this.map = this.level1();
        this.printPathLevel1();
        this.storeEnemies();
        this.addClickEvent();
        this.displayHealth();
        this.moveTimer = setInterval(this.addEnemiesToMap, 600);
        this.animateTimer = setInterval(this.animateEnemies, 350);
    }
}

var game = new Game(20);
console.log(game);
game.startLevel();