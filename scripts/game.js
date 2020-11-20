// Esta función contiene toda la lógica del juego.
function Game(size) {
    this.size = size;
    this.animateTimer;
    this.moveTimer;
    this.health = 3;
    this.towers = [];
    this.map;
    this.enemies = [];
    this.storage = [];
    this.sounds = new Sound();
    this.enemiesInLvlHtml = document.getElementById('enemiesLeft');
    this.towersLeft;
    this.towersLeftHtml = document.getElementById('towersLeft');
    this.maxTowers;
    this.lvl = 1;
    this.lvlHtml = document.getElementById('lvl');
    this.coins;
    this.enemiesPerLvl;
    this.enemySpawn;
    this.status = true;
    this.levels = new Level();
    this.tower = 1;

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

    // Selecciona el nivel.
    this.updateLevel = function () {
        switch (this.lvl) {
            case 1:
                this.level1();
                break;
            case 2:
                this.level2();
                break;
            case 3:
                this.level3();
                break;
            case 4:
                this.level4();
                break;
            default:
                this.resetCanvas();
                this.resetGame();
                this.lvl = 1;
                this.updateLevel();
        };
    };

    // Ejecuta el nivel 1.
    this.level1 = function () {
        this.enemiesPerLvl = 10;
        this.towersLeft = 2;
        this.maxTowers = this.towersLeft;
        this.coins = 100;
        this.enemySpawn = 1200;
        document.getElementById('startScreen').style.backgroundImage = 'url("images/background.jpg")';
        this.map = this.levels.one;
    };

    // Ejecuta el nivel 2.
    this.level2 = function () {
        this.towersLeft = 3;
        this.maxTowers = this.towersLeft;
        this.enemySpawn = 1000;
        document.getElementById('startScreen').style.backgroundImage = 'url("images/background2.png")';
        this.map = this.levels.two;
    };

    // Ejecuta el nivel 3.
    this.level3 = function() {
        this.towersLeft = 4;
        this.maxTowers = this.towersLeft;
        this.enemySpawn = 800;
        document.getElementById('startScreen').style.backgroundImage = 'url("images/background3.jpg")';
        this.map = this.levels.three;
    };

    // Ejecuta el nivel 4.
    this.level4 = function() {
        this.towersLeft = 4;
        this.maxTowers = this.towersLeft;
        this.enemySpawn = 600;
        document.getElementById('startScreen').style.backgroundImage = 'url("images/background4.jpg")';
        this.map = this.levels.four;
    };

    // Imprime el nivel en la tabla.
    this.printPathLevel = function (field) {
        for (let i = 0; i < field.length; i++) {
            for (let j = 0; j < field[i].length; j++) {
                if (field[i][j] === 1) {
                    let cell = document.querySelector(`tr.row${i} > td.cell${j}`);
                    cell.classList.add('path');
                };
            };
        };
    };

    // Imprime el canvas.
    this.printLevelCanvas = function () {
        document.getElementById('start').style.display = 'none';
        document.getElementsByTagName('h1')[0].style.display = 'none';
        document.getElementById('health').style.zIndex = '1';
        document.getElementById('heart').style.zIndex = '1';
        document.getElementById('coin').style.zIndex = '1';
        document.getElementById('coins').style.zIndex = '1';
        document.getElementById('server').style.zIndex = '1';
        document.getElementById('shop').style.zIndex = '1';
        this.enemiesInLvlHtml.style.zIndex = "1";
        this.enemiesInLvlHtml.style.display = 'inline-block';
        this.towersLeftHtml.style.zIndex = "1";
        this.towersLeftHtml.style.display = 'inline-block';
        this.lvlHtml.style.zIndex = "1";
        this.lvlHtml.innerText = `Level: ${this.lvl}`;
        this.lvlHtml.style.display = 'inline-block';
    };

    // Actualiza la vida del jugador.
    this.updateHealthDisplay = function () {
        document.getElementById('health').innerText = `${this.health}`;
    }.bind(this);

    // Actualiza las monedas.
    this.updateCoins = function () {
        document.getElementById('coins').innerText = `${this.coins}`;
    };

    // Actualiza los enemigos restantes.
    this.updateEnemies = function () {
        this.enemiesInLvlHtml.innerText = `Enemies Left: ${this.storage.length + this.enemies.length}/${this.enemiesPerLvl}`;
    };

    // Actualiza las torres restantes.
    this.updateTowers = function () {
        this.towersLeftHtml.innerText = `Towers Left: ${this.towersLeft}/${this.maxTowers}`;
    };

    // Genera los enemigos y los guarda en un array (storage).
    this.storeEnemies = function () {
        for (let i = 0; i < this.enemiesPerLvl; i++) {
            this.storage.push(new Enemy(this.size));
        };
    };

    // Añade los enemigos al array que se muestra en el mapa.
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
                this.health--;
                this.updateHealthDisplay();
            };
            this.enemies.forEach(enemy => {
                enemy.moveEnemy(this.map);
                enemy.printEnemy();
            });
        };
    }.bind(this);

    // Elimina a los enemigos y actualiza el display de enemigos restantes.
    this.deleteEnemy = function (position) {
        if (this.enemies.length > 0 && this.enemies[position].health <= 0) {
            let enemy = document.querySelector(`tr.row${this.enemies[position].y} > td.cell${this.enemies[position].x}`);
            enemy.classList.remove('enemy');
            delete this.enemies[position];
            this.enemies.splice(position, 1);
            if (!muted) this.sounds.enemyKilled.play();
            this.updateEnemies();
            this.coins += 10;
            this.updateCoins();
        };
    };

    // Añade onclick en las celdas del mapa para poner la torres.
    this.addClickEvent = function () {
        this.map.forEach((row, r) => {
            row.forEach((cell, c) => {
                let cellHtml = document.querySelector(`tr.row${r} > td.cell${c}`)
                cellHtml.onclick = function () {
                    if (cell === 0) {
                        if (this.map[r][c] !== 2) {
                            this.addTowers(cellHtml, r, c);
                        };
                    };
                }.bind(this);
            });
        });
    };

    // Añade torres y actualiza el display de torres restantes.
    this.addTowers = function (cell, y, x) {
        if (this.towersLeft > 0 
            && this.status) {
            this.map[y][x] = 2;
            if (this.tower === 1 && this.coins >= 50) {
                cell.classList.add("tower1");
                this.towers.push(new Tower1());
                this.coins -= 50;
                this.towers[this.towers.length - 1].y = y;
                this.towers[this.towers.length - 1].x = x;
                if (!muted) this.sounds.towerBuilt.play();
                this.towersLeft--;
            };
            if (this.tower === 2 && this.coins >= 100) {
                cell.classList.add("tower2");
                this.towers.push(new Tower2());
                this.coins -= 100;
                this.towers[this.towers.length - 1].y = y;
                this.towers[this.towers.length - 1].x = x;
                if (!muted) this.sounds.towerBuilt.play();
                this.towersLeft--;
            };
            if (this.tower === 3 && this.coins >= 150) {
                cell.classList.add("tower3");
                this.towers.push(new Tower3());
                this.coins -= 150;
                this.towers[this.towers.length - 1].y = y;
                this.towers[this.towers.length - 1].x = x;
                if (!muted) this.sounds.towerBuilt.play();
                this.towersLeft--;
            };
            this.updateTowers();
            this.updateCoins();
        };
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

    // Resetea el canvas a la pantalla de inicio.
    this.resetCanvas = function () {
        document.getElementById('startScreen').style.backgroundImage = 'url("images/startImage.png")';
        document.getElementById('start').style.display = 'inline-block';
        document.getElementsByTagName('h1')[0].style.display = 'block';
        this.enemiesInLvlHtml.style.zIndex = '-1';
        this.towersLeftHtml.style.zIndex = '-1';
        this.lvlHtml.style.zIndex = '-1';
        document.getElementById('health').style.zIndex = '-1';
        document.getElementById('heart').style.zIndex = '-1';
        document.getElementById('coin').style.zIndex = '-1';
        document.getElementById('coins').style.zIndex = '-1';
        document.getElementById('server').style.zIndex = '-1';
        document.getElementsByTagName('table')[0].remove();
        document.getElementById('gameOver').style.zIndex = '-1';
        document.getElementById('victory').style.zIndex = '-1';
        document.getElementById('shop').style.zIndex = '-1';
        this.sounds.pauseAll();
        this.sounds.startMusic.loop = true;
        if (!muted) this.sounds.startMusic.play();
    };

    // Elimina las torres que haya en la tabla.
    this.resetTowers = function () {
        for (let i = 0; i < this.towers.length; i++) {
            delete this.towers[i];
        };
        this.towers = [];
        for (let i = 0; i < this.map.length; i++) {
            this.map[i] = this.map[i].map(function(cell) {
                return cell === 2 ? cell = 0 : cell = cell;
            });
        };
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

    // Resetea los parámetros del juego.
    this.resetGame = function () {
        this.resetEnemies();
        this.resetTowers();
        this.health = 3;
        this.updateHealthDisplay();
        this.coins = 100;
        this.updateCoins();
        this.lvl = 1;
    }.bind(this);

    // Perder la partida.
    this.gameOver = function () {
        this.status = false;
        clearInterval(this.moveTimer);
        clearInterval(this.animateTimer);
         if (!muted) this.sounds.gameOver.play();
        let gameOver = document.getElementById('gameOver');
        gameOver.style.zIndex = 2;
        gameOver.onclick = function () {
            this.resetCanvas();
            this.resetGame();
            this.status = true;
        }.bind(this);
    };

    // Empieza el siguiente level.
    this.nextLevel = function () {
        this.lvl++;
        this.enemiesPerLvl += 5;
        document.getElementsByTagName('table')[0].remove();
        document.getElementById('victory').style.zIndex = '-1';
        this.startLevel();
    };
    
    //Ganar la partida.
    this.win = function () {
        let victory = document.getElementById('victory');
        this.status = false;
        clearInterval(this.moveTimer);
        clearInterval(this.animateTimer);
        this.sounds.winSound.play();
        victory.style.zIndex = 2;
        if (this.lvl < 4) {
            victory.onclick = function () {
                this.resetEnemies();
                this.resetTowers();
                this.nextLevel();
                this.status = true;
            }.bind(this);
        } else {
            victory.onclick = function () {
                this.resetCanvas();
                this.resetGame();
                this.status = true;
            }.bind(this);
        };
    };

    // Anima el juego.
    this.animateGame = function () {
        this.animateEnemies();
        this.animateTowers();
        if (this.health === 0) {
            this.gameOver();
        };
        if (this.storage.length === 0 &&
            this.enemies.length === 0 &&
            this.health > 0) {
            this.win();
        };
    }.bind(this);

    // Bucle principal del juego.
    this.startLevel = function () {
        this.generateTableHtml(size);
        this.updateLevel();
        this.printPathLevel(this.map);
        this.storeEnemies();
        this.addClickEvent();
        //--------------------------------------
        this.printLevelCanvas();
            //-------------------
        this.sounds.pauseAll();
        this.sounds.backgroundMusic.loop = true;
        if (!muted) this.sounds.backgroundMusic.play();
        //--------------------------------------------------
        this.updateEnemies();
        this.updateTowers();
        this.updateHealthDisplay();
        this.updateCoins();
        //----------------------------------------------------
        this.moveTimer = setInterval(this.addEnemiesToMap, this.enemySpawn);
        this.animateTimer = setInterval(this.animateGame, 350);
    };
};

var game = new Game(15);

var muted = false;

// Interacciones con el jugador
window.onload = function () {
    // Pantalla inicial del juego (Welcome to the game).
    let welcome = document.getElementById('welcome');
    welcome.onclick = function () {
        welcome.style.display = 'none';
        document.getElementById('canvas').style.display = 'block';
        game.sounds.startMusic.loop = true;
        if (!muted) game.sounds.startMusic.play();
    };
    // Botón que empieza el juego.
    let startButton = document.getElementById('startButton');
    startButton.onclick = function () {
        game.startLevel();
    };
    // Botón para mutear el juego.
    let muteSoundButton = document.getElementById('muteAllSound');
    muteSoundButton.onclick = function() {
        if (!muted) {
            muteSoundButton.style.backgroundImage = "url(images/turnOnSound.png)";
            game.sounds.mute();
            muted = true;
        } else {
            muteSoundButton.style.backgroundImage = "url(images/turnOffSound.png)";
            game.sounds.unMute();
            muted = false;
        };
    };

    // Seleccion de torres para comprar.
    document.addEventListener('keydown', function(event){
        if (event.key === "1") {
            game.tower = 1; 
            document.getElementById("tower1Price").style.backgroundColor = "rgba(255, 255, 255, 0.226)";
            document.getElementById("tower2Price").style.backgroundColor = "";
            document.getElementById("tower3Price").style.backgroundColor = "";
        };
        if (event.key === "2") {
            game.tower = 2; 
            document.getElementById("tower1Price").style.backgroundColor = "";
            document.getElementById("tower2Price").style.backgroundColor = "rgba(255, 255, 255, 0.226)";
            document.getElementById("tower3Price").style.backgroundColor = "";
        };
        if (event.key === "3") {
            game.tower = 3;
            document.getElementById("tower1Price").style.backgroundColor = "";
            document.getElementById("tower2Price").style.backgroundColor = "";
            document.getElementById("tower3Price").style.backgroundColor = "rgba(255, 255, 255, 0.226)";
        };
    });
}.bind(game);