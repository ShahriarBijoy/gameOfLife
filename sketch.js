var colors = ['#2a9d8f','#e9c46a','#f4a261','#e76f51','#c44569','#f7d794','#f78fb3','#63cdda'];
// var colors2 = ['#c44569','#f7d794','#f78fb3','#63cdda'];
let rows = 20, cols = 45;
let grid = createGrid();
let play = false;

function createGrid() {
  let result = [];
  for (let i = 0; i < rows; i++) {
    let row = [];
    for (let j = 0; j < cols; j++) {
      row.push(false);
    }
    result.push(row);
  }
  return result;
}


function nextGeneration() {
  let newGrid = createGrid();
  for (let i = 0; i < rows; i++) {
    for (let j = 0; j < cols; j++) {
      // Counts the number of alive neighbors
      let directions = [[1, 0], [1, -1], [0, -1], [-1, -1], [-1, 0], [-1, 1], [0, 1], [1, 1]];
      let aliveNeighbors = 0;
      for (d of directions) {
        let neighborRow = i + d[0];
        let neighborCol = j + d[1];
        if (neighborRow >= 0 && neighborCol >= 0 && neighborRow < rows && neighborCol < cols) {
          if (grid[neighborRow][neighborCol]) {
            aliveNeighbors++;
          }
        }
      }
      // Decide whether or not the new cell is alive or dead
      if (grid[i][j]) {
        newGrid[i][j] = aliveNeighbors == 2 || aliveNeighbors == 3;
      } else {
        newGrid[i][j] = aliveNeighbors == 3;
      }
    }
  }
  grid = newGrid;
}

// Called once at the beginning of the program
function setup() {
  let height = 780;
  createCanvas(height * cols/rows, height, SVG);
  // createCanvas(windowWidth *cols/rows, height);
  background ('#2d3436')
  noStroke();
  frameRate(3);
}

// Called over and over
function draw() {
  background('#2d3436');
  // Display the grid
  for (let i = 0; i < rows; i++) {
    for (let j = 0; j < cols; j++) {
      if (grid[i][j]) {
        let colorpicker = int(random(colors.length));
        // let colorpicker2 = int(random(colors2.length));
        fill(colors[colorpicker]);
        rect(j/cols * width, i/rows * height, width/cols, height/rows);
        // ellipseMode(RADIUS);
        // fill(colors2[colorpicker2]);
        // ellipse(j/cols * width+20, i/rows * height+20, width/cols-25, height/rows-25);
      }
    }
  }


  // //Horizontal grid lines
  // stroke('#e9c46a');
  // for (let i = 0; i <= rows; i++) {
  //   line(0, i/rows * height, width, i/rows * height);
  // }
  //
  // // Vertical grid lines
  // for (let i = 0; i <= cols; i++) {
  //   line(i/cols * width, 0, i/cols * width, width);
  // }
  if (play) {
    nextGeneration();
  }
}

function mouseClicked() {
  let row = Math.floor(mouseY/height * rows);
  let col = Math.floor(mouseX/width * cols);
  if (row >= 0 && col >= 0 && row < rows && col < cols) {
    grid[row][col] = !grid[row][col];
  }
}

function mouseDragged() {
  let row = Math.floor(mouseY/height * rows);
  let col = Math.floor(mouseX/width * cols);
  if (row >= 0 && col >= 0 && row < rows && col < cols) {
    grid[row][col] = !grid[row][col];
  }
}

function keyPressed(){
  if (keyCode == LEFT_ARROW){
    save("mySVG.svg");
    // noLoop();
  }
}


let playButton = document.querySelector(".play-button");
playButton.addEventListener("click", function() {
  play = !play;
  if (play) {
    playButton.textContent = "Pause";
  } else {
    playButton.textContent = "Play";
  }
});
let clearButton = document.querySelector(".clear-button");
clearButton.addEventListener("click", function() {
  grid = createGrid();
});
