function Enemy(size) {
    // Coordenadas iniciales del enemigo.
    this.x = -1,
    this.y = 7,
    this.health = 6;
    this.previous = []


    // Imprime el enemigo en su posición actual.
    this.printEnemy = function () {
        // Avisa al juego que ha llegado al final de la partida.
        if (this.x < size) {
            // console.log(this.x);
            // console.log(this.y);
            let cell = document.querySelector(`tr.row${this.y} > td.cell${this.x}`);
            // console.log(cell);
            cell.classList.add('enemy');
        };
    };

    
    this.moveEnemy = function (map) {
        // console.log(map[this.y][this.x+1]);
        // console.log(this.x)
        // console.log(this.y)
        
        this.previous.push([this.y, this.x]); 
        
        if (map[this.y][this.x+1] === 1 && !this.previous.some(function(array) {
            return array[0] === this.y && array[1] === this.x+1;

         }) ) this.x++;

        else if (map[this.y+1][this.x] === 1 && !this.previous.some(function(array) {
            return array[0] === this.y+1 && array[1] === this.x;

         }) ) this.y++;
        else if (map[this.y][this.x-1] === 1 && !this.previous.some(function(array) {
            return array[0] === this.y && array[1] === this.x-1;

         }) ) this.x--;
        else if (map[this.y-1][this.x] === 1 && !this.previous.some(function(array) {
            return array[0] === this.y-1 && array[1] === this.x;

         }) ) this.y--;
        
        // console.log(this.previous)  
        
    };

    // // Mueve al enemigo a la derecha.
    // this.moveRight = function () {
    //     let previousX = this.x;
    //     this.x++;
        
    //     // Borra el enemigo de la posición anterior sólo si está dentro del tablero.
    //     if (previousX > -1) {
    //         let cell = document.querySelector(`tr.row${this.y} > td.cell${previousX}`);
    //         cell.classList.remove('enemy');
    //     };
    // };

    // // Mueve al enemigo arriba.
    // this.moveUp = function () {
    //     let previousY = this.y;
    //     this.y--;

    //     // Borra el enemigo de la posición anterior sólo si está dentro del tablero.
    //     if (previousY > -1) {
    //         let cell = document.querySelector(`tr.row${previousY} > td.cell${this.x}`);
    //         cell.classList.remove('enemy');
    //     };
    // };

    // // Mueve al enemigo abajo.
    // this.moveDown = function () {
    //     let previousY = this.y;
    //     this.y++;

    //     // Borra el enemigo de la posición anterior sólo si está dentro del tablero.
    //     if (previousY > -1) {
    //         let cell = document.querySelector(`tr.row${previousY} > td.cell${this.x}`);
    //         cell.classList.remove('enemy');
    //     };
    // };

    // // Mueve al enemigo a la izquierda.
    // this.moveLeft = function () {
    //     let previousX = this.x;
    //     this.x--;

    //     // Borra el enemigo de la posición anterior sólo si está dentro del tablero.
    //     if (previousX > -1) {
    //         let cell = document.querySelector(`tr.row${this.y} > td.cell${previousX}`);
    //         cell.classList.remove('enemy');
    //     };
    // };
};