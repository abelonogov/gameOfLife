'use strict';

class GameOfLife {
  constructor(x, y, timeOut ) {
    this.height = x;
    this.width = y;
    this.timeOut = timeOut;
    this.generateGrid();
    this.nextGeneration();
  }
  generateGrid() {
    var table, row, tr, cell, td;
    table = document.createElement('table');
    for (row = 0; row < this.height; row++) {
      var tr = document.createElement('tr');
      for (cell = 0; cell < this.width; cell++) {
        td = document.createElement('td');
        tr.appendChild(td);
        td.id = [row, cell].join('_');
        td.className = Math.random() < 0.25 ? 'alive' : '';
      }
      table.appendChild(tr);
    }
    document.getElementById('grid').appendChild(table);
  }
  countLiveNeighbors(x, y) {
    var neighbours = 0,
        row,
        cell,
        iMax = Math.min(x + 1, this.height - 1),
        jMax = Math.min(y + 1, this.width - 1);

    for (row = Math.max(x - 1, 0); row <= iMax; row++) {
      for (cell = Math.max(y - 1, 0); cell <= jMax; cell++) {
        if (row !== x && cell !== y) {
          if (document.querySelector('td[id="' + [row, cell].join('_') + '"][class="alive"]')) {
            neighbours++;
          }
        }
      }
    }
    return neighbours;
  }
  nextGeneration() {
    var row, cell, id, neighbours, table, tr, td;
    var table = document.createElement('table');
    if (!document.querySelector('td:not([class="alive"])')) {
      return;
    }
    for (row = 0; row < this.height; row++) {
      tr = document.createElement('tr');
      for (cell = 0; cell < this.width; cell++) {
        neighbours = this.countLiveNeighbors(row, cell);
        td = document.createElement('td');
        tr.appendChild(td);
        id = [row, cell].join('_');
        td.id = id;
        if (!document.querySelector('td[id="' + id + '"]:not([class="alive"])')) {
          if (neighbours === 3) {
            td.className = 'alive';
          }
        } else {
          if (neighbours === 3 || neighbours === 2) {
            td.className = 'alive';
          }
        }
      }
      table.appendChild(tr);
    }
    var oldTable = document.getElementById('grid');
    if (oldTable == table) {
      return;
    }
    oldTable.replaceChild(table, oldTable.childNodes[0]);
    var _this = this;
    setTimeout(function(){ _this.nextGeneration(); }, this.timeOut);
  }
}
