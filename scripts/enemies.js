function Enemy(size) {
    // Coordenadas iniciales del enemigo.
    this.x = -1,
    this.y = 10,

    // Imprime el enemigo en su posición actual.
    this.printEnemy = function() {  
        let cell = document.querySelector(`tr.row${this.y} > td.cell${this.x}`);
        cell.classList.add('enemy');
    }

    // Mueve la posición del enemigo.
    this.moveEnemy = function() {
        let previousX = this.x;
        let previousY = this.y;
        let map = game.level1();

        // Mueve al enemigo.    
        if (map[this.y][this.x] === 2 || previousX === -1) {
            this.x++;
        }
        // Borra el enemigo de la posición anterior sólo si está dentro del tablero.
        if ( previousX > -1) {
        let cell = document.querySelector(`tr.row${previousY} > td.cell${previousX}`);
        cell.classList.remove('enemy');
        }
        // Condición fin de juego.
        if (this.x === size) {
            alert ("GAME OVER");
            return;
        }    
    }
}