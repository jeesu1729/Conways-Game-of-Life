let start = false;

function make2DArray(cols, rows) {
  let arr = new Array(cols);
  for (let i = 0; i < arr.length; i++) {
    arr[i] = new Array(rows);
  }
  return arr;
}

let grid;
let cols;
let rows;
let resolution = 20;
let prevx = -1;
let prevy = -1;
let speed = 1;

function setup() {
  canvas = createCanvas(1400, 560);
  cols = width / resolution;
  rows = height / resolution;

  grid = make2DArray(cols, rows);
  randome();
  canvas.parent("cont");
}
let cnt = 0;
function draw() {
    //console.log(speed);
  background(40);

  for (let i = 0; i < cols; i++) {
    for (let j = 0; j < rows; j++) {
      let x = i * resolution;
      let y = j * resolution;
      if (grid[i][j] == 1) {
        fill(255);
        noStroke();
        rect(x, y, resolution - 2, resolution - 2);
      }
    }
  }
  if (mouseIsPressed) {
    let x = round(mouseX / resolution);
    let y = round(mouseY / resolution);
    console.log(mouseX, mouseY, x, y);
    if (x != prevx || y != prevy) {
      if (x >= 0 && y >= 0) {
        grid[x][y] = 1 - grid[x][y];
        prevx = x;
        prevy = y;
      }
    }
  }
  if (start && cnt == speed) {
    let next = make2DArray(cols, rows);

    // Compute next based on grid
    for (let i = 0; i < cols; i++) {
      for (let j = 0; j < rows; j++) {
        let state = grid[i][j];
        // Count live neighbors!
        let sum = 0;
        let neighbors = countNeighbors(grid, i, j);

        if (state == 0 && neighbors == 3) {
          next[i][j] = 1;
        } else if (state == 1 && (neighbors < 2 || neighbors > 3)) {
          next[i][j] = 0;
        } else {
          next[i][j] = state;
        }
      }
    }

    grid = next;
  }
  cnt = (cnt + 1) % (speed+1);
}

function countNeighbors(grid, x, y) {
  let sum = 0;
  for (let i = -1; i < 2; i++) {
    for (let j = -1; j < 2; j++) {
      let col = (x + i + cols) % cols;
      let row = (y + j + rows) % rows;
      sum += grid[col][row];
    }
  }
  sum -= grid[x][y];
  return sum;
}

function mousePressed() {
  let x = round(mouseX / resolution);
  let y = round(mouseY / resolution);
  console.log(mouseX, mouseY, x, y);
  if (x >= 0 && y >= 0) grid[x][y] = 1 - grid[x][y];
}

document.getElementById("start").onclick = function () {
  start = !start;
  console.log("hh");
};

document.getElementById("reset").onclick = function () {
  for (let i = 0; i < cols; i++) {
    for (let j = 0; j < rows; j++) {
      grid[i][j] = 0;
    }
  }
};

document.getElementById("random").onclick = function () {
  randome();
  console.log("oo");
};

function randome() {
  console.log("ll");
  for (let i = 0; i < cols; i++) {
    for (let j = 0; j < rows; j++) {
      grid[i][j] = 0;
      let t = floor(random(6));
      if (t == 1) grid[i][j] = 1;
    }
  }
}

var slider = document.getElementById("myRange");
var output = document.getElementById("demo");
output.innerHTML = slider.value;

slider.oninput = function() {
  output.innerHTML = this.value;
  speed = 11-this.value;
}

