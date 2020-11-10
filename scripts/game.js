function Game(size) {
    self = this;
    this.size = size,
    this.animateTimer,
    this.moveTimer,
    this.health = 3,
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
        var map = this.generateTable(this.size);
        map.splice(10, 1, Array(this.size).fill(2));
        return map;
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
            self.looseHealth();
            if (self.health === 0) {
                self.gameOver();
            }
            self.enemies.forEach(enemy => {
                enemy.moveEnemy();
                enemy.printEnemy();
            });
        }
    }

        // let i = 0;
        // function myLoop() {
        //     setTimeout(function(){
        //         if (i < self.enemies.length) {
        //             self.enemies[i].moveEnemy();
        //             self.enemies[i].printEnemy();
        //             // console.log(i);
        //             i++;
        //             myLoop();
        //         }  
        //     }, 1000);           
        // }
        // myLoop();      

    
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

    // Inicia el juego.
    this.startLevel = function () {

        this.storeEnemies();
        this.moveTimer = setInterval(this.addEnemiesToMap, 800);
        this.animateTimer = setInterval(this.animateEnemies, 300);
    }

    // Quita salud al jugador.
    this.looseHealth = function() {
        if (self.enemies[0].x === self.size) {
            self.health--;
            self.enemies.shift();
        }
    }
}

var game = new Game(20);
game.generateTableHtml(game.size);
console.log(game);
game.printPathLevel1();
game.startLevel();



