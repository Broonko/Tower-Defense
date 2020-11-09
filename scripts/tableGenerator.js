function Game(size) {
    this.size = size,
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
    this.generateTable = function(size) {
        return Array(size).fill(Array(size).fill(0));
    }
    this.printPathLevel1 = function() {
        var level1Path = document.getElementsByClassName("row10")[0];
        level1Path.classList.add("path");
    }
    this.level1 = function() {
        var map = this.generateTable(this.size);
        map.splice(10, 1, Array(this.size).fill(2));
        return map;
    }
}
var game = new Game(20);
game.generateTableHtml(game.size);
console.log(game);
game.printPathLevel1();

