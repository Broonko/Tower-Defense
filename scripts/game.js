function Game(size) {
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
    this.enemiesInLvl;
    this.enemiesInLvlHtml = document.getElementById('enemiesLeft');
    this.towersLeft;
    this.towersLeftHtml = document.getElementById('towersLeft');
    this.maxTowers;
    this.lvl = 1;
    this.lvlHtml = document.getElementById('lvl');
    this.coins;
    this.enemiesPerLvl;

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
            };  
            table.appendChild(row);
            row.classList.add("row" + i);
        };
        canvas.appendChild(table);
    };

    // Genera una matriz llena de 0 del tamaño "size".
    this.generateTable = function (size) {
        return Array(size).fill(Array(size).fill(0));
    }; 

    // Sustituye los 0 de la fila indicada por 2.
    this.level1 = function () {
        let field = this.generateTable(this.size);
        field.splice(7, 1, Array(this.size).fill(1));
        this.towersLeft = 2;
        this.maxTowers = this.towersLeft;
        this.coins = 100;
        this.lvlHtml.style.zIndex = "1";
        this.lvlHtml.innerText = `Level: ${this.lvl}`;
        this.lvlHtml.style.display = 'inline-block';
        this.enemiesPerLvl = 10;
        this.map = field;
        document.getElementById('startScreen').style.backgroundImage = 'url("images/background.jpg")';
        return field;
    };

    this.level2 = function() {
        let field = [[0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                    [0, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                    [0, 1, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                    [0, 1, 0, 0, 1, 0, 0, 1, 1, 1, 1, 1, 0, 0, 0],
                    [0, 1, 0 ,0, 1, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0],
                    [0, 1, 0 ,0, 1, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0],
                    [0, 1, 0 ,0, 1, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0],
                    [1, 1, 0, 0, 1, 0, 0, 1, 0, 0, 0, 1, 1, 1, 1],
                    [0, 0, 0, 0, 1, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0],
                    [0, 0, 0, 0, 1, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0],
                    [0, 0, 0, 0, 1, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0],
                    [0, 0, 0, 0, 1, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0],
                    [0, 0, 0, 0, 1, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0],
                    [0, 0, 0, 0, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0],
                    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]];
        this.towersLeft = 100;
        this.maxTowers = this.towersLeft;
        this.lvlHtml.innerText = `Level: ${this.lvl}`;
        this.map = field;
        document.getElementById('startScreen').style.backgroundImage = 'url("images/background2.jpg")';
        return field
    }

    this.printPathLevel = function(field) {
        for(let i = 0; i < field.length; i++) {
            for(let j = 0; j < field[i].length; j++) {
                if (field[i][j] === 1) {
                    let cell = document.querySelector(`tr.row${i} > td.cell${j}`);
                    cell.classList.add('path');
                }
            }
        }
    }
    
    // Genera los enemigos y los guarda en un array(storage).
    this.storeEnemies = function () {
        for (let i = 0; i < this.enemiesPerLvl; i++) {
            this.storage.push(new Enemy(this.size));
        };
    };

    // Añade los enemigos al array mapa.
    this.addEnemiesToMap = function () {
        if (this.storage.length > 0) {
            this.enemies.push(this.storage.shift());
        };
    }.bind(this);

    // Mueve e imprime los enemigos.
    this.animateEnemies = function () {
        if (this.enemies.length > 0) {
            if (this.enemies[0].x === this.size) {
                delete this.enemies[0];
                this.enemies.shift();
                this.loseHealth();
                this.updateHealthDisplay();
            };
            this.enemies.forEach(enemy => {
                enemy.moveEnemy(this.map);
                enemy.printEnemy();
            });
        };
    }.bind(this);

    // Elimina a los enemigos y actualiza el diplay de enemigos restantes.
    this.deleteEnemy = function (position) {
        if (this.enemies.length > 0) {
            let enemy = document.querySelector(`tr.row${this.enemies[position].y} > td.cell${this.enemies[position].x}`);
            enemy.classList.remove('enemy');
            delete this.enemies[position];
            this.enemies.splice(position, 1);
            this.sounds.enemyKilled.play();
            this.enemiesInLvlHtml.innerText = `Enemies Left: ${this.storage.length + this.enemies.length}/${this.enemiesInLvl}`;
            this.coins += 25;
            this.updateCoins();
        };
    };

    // Añade onclick en las celdas del mapa.
    this.addClickEvent = function () {
        this.map.forEach((row, r) => {
            row.forEach((cell, c) => {
                if (cell === 0) {
                    let cellHtml = document.querySelector(`tr.row${r} > td.cell${c}`)
                    cellHtml.onclick = function () {
                        this.addTowers(cellHtml, r, c);
                    }.bind(this);
                };
            });
        });
    };

    // Añade torres y actualiza el display de torres restantes.
    this.addTowers = function (cell, y, x) {
        if (this.towers.length < 2 && this.coins >= 50) {
            cell.classList.add("towers");
            this.towers.push(new Tower());
            this.towers[this.towers.length - 1].y = y;
            this.towers[this.towers.length - 1].x = x;
            this.sounds.towerBuilt.play();
            this.towersLeft--;
            this.towersLeftHtml.innerText = `Towers Left: ${this.towersLeft}/${this.maxTowers}`
            this.coins -= 50;
            this.updateCoins();
        };
    };

    this.deleteTowers = function() {
        for (let i = 0; i < this.towers.length; i++) {
            delete this.towers[i];
        }
        this.towers = [];
    };

    // Anima las torres.
    this.animateTowers = function () {
        if (this.towers.length > 0) {
            for (let i = 0; i < this.towers.length; i++) {
                this.towers[i].calculateEnemiesDistance(this.enemies);
                this.towers[i].checkIfEnemiesInRange(this.enemies);
            };
        };
    }.bind(this);

    // Quita salud al jugador.
    this.loseHealth = function () {
        this.health--;
    }.bind(this);

    // Actualiza la vida del jugador.
    this.updateHealthDisplay = function () {
        document.getElementById('health').innerText = `${this.health}`; 
    }.bind(this);

    this.updateCoins = function () {
        document.getElementById('coins').innerText = `${this.coins}`;
    };

    // Elimina a los enemigos cuando ganas o pierdes (en memoria).
    this.resetEnemies = function () {
        for (let i = 0; i < this.storage.length; i++) {
            delete this.storage[i];
        };
        for (let i = 0; i < this.enemies.length; i++) {
            delete this.enemies[i];
        };
        this.storage = [];
        this.enemies = [];
    }.bind(this);

    // Perder la partida.
    this.gameOver = function () {
        clearInterval(this.moveTimer);
        clearInterval(this.animateTimer);
        this.sounds.gameOver.play();
        let gameOver = document.getElementById('gameOver');
        gameOver.style.zIndex = 2;
        console.log(gameOver)
        gameOver.onclick = function() {
            this.resetGame();
        }.bind(this);
    };

    // Ganar la partida.
    this.win = function () {
        clearInterval(this.moveTimer);
        clearInterval(this.animateTimer);
        this.sounds.winSound.play();
        let victory = document.getElementById('victory');
        victory.style.zIndex = 2;
        console.log(victory)
        victory.onclick = function() {
            this.nextLvl();
        }.bind(this);
    };

    this.nextLvl = function() {
        this.lvl++;
        this.enemiesPerLvl += 5;
        document.getElementsByTagName('table')[0].remove();
        document.getElementById('victory').style.zIndex = '-1';
        this.startLevel();
    }

    this.resetCanvas = function() {
        document.getElementById('start').style.display = 'inline-block';
        document.getElementsByTagName('h1')[0].style.display = 'block';
        document.getElementById('health').style.zIndex = '-1';
        document.getElementById('heart').style.zIndex = '-1';
        document.getElementById('coin').style.zIndex = '-1';
        document.getElementById('coins').style.zIndex = '-1';
        document.getElementById('startScreen').style.backgroundImage = 'url("images/startImage.png")';
        document.getElementById('server').style.zIndex = '-1';
        document.getElementsByTagName('table')[0].remove();
        this.enemiesInLvlHtml.style.zIndex = '-1';
        this.towersLeftHtml.style.zIndex = '-1';
        this.lvlHtml.style.zIndex = '-1';
        document.getElementById('gameOver').style.zIndex = '-1';
        document.getElementById('victory').style.zIndex = '-1';
    };

    this.resetGame = function() {
        this.resetEnemies();
        this.deleteTowers();
        this.health = 3;
        this.updateHealthDisplay();
        this.coins = 100;
        this.updateCoins();
        this.sounds.pauseAll();
        this.sounds.startMusic.loop = true;
        this.sounds.startMusic.play();
        this.resetCanvas();
        this.startLevel();
    }.bind(this);

    // Anima el juego.
    this.animateGame = function () {
        if (this.health === 0) {
            this.gameOver();
        };
        if (this.storage.length === 0 &&
            this.enemies.length === 0 &&
            this.health > 0) {
            this.win();
        };
        this.animateEnemies();
        this.animateTowers();
    }.bind(this);

    this.updateLvl = function() {
        switch (this.lvl) {
            case 1:
                this.level1();
                break;
            case 2:
                this.level2();
        }
    }

    this.pushStartButton = function() {
        let startButton = document.getElementById('startButton');
        startButton.onclick = function () {
            this.sounds.pauseAll();
            document.getElementById('start').style.display = 'none';
            document.getElementsByTagName('h1')[0].style.display = 'none';
            document.getElementById('health').style.zIndex = '1';
            document.getElementById('heart').style.zIndex = '1';
            document.getElementById('coin').style.zIndex = '1';
            document.getElementById('coins').style.zIndex = '1';
            document.getElementById('server').style.zIndex = '1';
            this.sounds.backgroundMusic.loop = true;
            this.sounds.backgroundMusic.play();
            this.generateTableHtml(game.size);
            this.updateLvl();
            this.updateCoins();
            this.printPathLevel(this.map);
            this.storeEnemies();
            this.addClickEvent();
            this.moveTimer = setInterval(this.addEnemiesToMap, 1000);
            this.animateTimer = setInterval(this.animateGame, 350);
            this.enemiesInLvl = this.storage.length;
            this.enemiesInLvlHtml.style.zIndex = "1";
            this.enemiesInLvlHtml.style.display = 'inline-block';
            this.enemiesInLvlHtml.innerText = `Enemies Left: ${this.enemiesInLvl}/${this.enemiesInLvl}`;
            this.towersLeftHtml.style.zIndex = "1";
            this.towersLeftHtml.style.display = 'inline-block';
            this.towersLeftHtml.innerText = `Towers Left: ${this.towersLeft}/${this.towersLeft}`;
        }.bind(this);
    };

    // Inicia el juego.
    this.startLevel = function () {
        let welcome = document.getElementById('welcome');
        welcome.onclick = function () {
            welcome.style.display = 'none';
            document.getElementById('canvas').style.display = 'block';
            this.sounds.startMusic.loop = true;
            this.sounds.startMusic.play();
        }.bind(this);
        this.pushStartButton();
    };
    this.startLevel();
};

var game = new Game(15);
