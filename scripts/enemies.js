function Enemy(size) {
    // Coordenadas iniciales del enemigo.
    this.x = -1,
    this.y = 7,
    this.health = 6;
    this.previousX = -1;
    this.previousY = -1;


    // Imprime el enemigo en su posición actual. (game.js - line XXX)
    this.printEnemy = function () {
        // Avisa al juego que ha llegado al final de la partida.
        if (this.x < size) {
            let cell = document.querySelector(`tr.row${this.y} > td.cell${this.x}`);
            cell.classList.add('enemy');
        };
    };

    //El enemigo revisa a donde puede ir y avanza por el camino. (game.js - line XXX)
    this.moveEnemy = function (map) {
        //¿Porque con los else if funciona y sin ellos no. Sin else if, entra en 2 if en una iteracion y previousX pierde el valor del primer if al que ha entrado, asi que solo borra la celda del segundo if. 
        if (map[this.y-1][this.x] === 1
            && this.previousY !== this.y-1) {
            this.previousX = this.x;
            this.previousY = this.y;
            this.y--;
        } else if ((map[this.y][this.x+1] === 1
            && this.previousX !== this.x+1)
            || this.x+1 >= size) {
            this.previousX = this.x;
            this.previousY = this.y;
            this.x++;
        } else if (map[this.y+1][this.x] === 1
            && this.previousY !== this.y+1) {
            this.previousX = this.x;
            this.previousY = this.y;
            this.y++;
        } else if (map[this.y][this.x-1] === 1
            && this.previousX !== this.x-1) {
            this.previousX = this.x;
            this.previousY = this.y;
            this.x--;
        };

        if (this.previousX > -1) {
            let cell = document.querySelector(`tr.row${this.previousY} > td.cell${this.previousX}`);
            cell.classList.remove('enemy');
        };
    };
};