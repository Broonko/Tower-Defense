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
}
var game = new Game(20);
game.generateTableHtml(game.size);
console.log(game);