function Game(size) {
    self = this;
    this.size = size,
    // this.enemy = new Enemy(this.size),
    this.enemies = [],

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
        var map = this.generateTable(this.size);
        map.splice(10, 1, Array(this.size).fill(2));
        return map;
    }

    // Mueve e imprime el enemigo.
    this.animateEnemy = function(i) {
        self.enemies[i].moveEnemy();
        self.enemies[i].printEnemy();
       
    }

    this.animateEnemies = function() {
        for (var i = 0; i < self.enemies.length; i++) {
            clearInterval(self.gameTimer);
            setTimeout (self.animateEnemy, 500, i);
            
        }
    }
    
    // Mueve e imprime al enemigo cada cierto tiempo (crea efecto de movimiento).
    this.gameTimer = setInterval(this.animateEnemies, 500);

    this.addEnemies = function() {
        for (let i = 0; i < 2; i++) {
            this.enemies.push(new Enemy(this.size));
        }
    }
    this.addEnemies();
}


var game = new Game(20);
game.generateTableHtml(game.size);
console.log(game);
game.printPathLevel1();



