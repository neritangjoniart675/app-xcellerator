// Filename: complex_code.js
// Description: This complex JavaScript code generates a random maze using a recursive backtracking algorithm.
// The maze is then solved using the A* algorithm to find the shortest path from the start point to the end point.

// Function to generate a random integer between min (inclusive) and max (exclusive)
function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min)) + min;
}

// Function to initialize the maze grid
function initializeMazeGrid(rows, cols, value) {
  const grid = new Array(rows);
  for (let i = 0; i < rows; i++) {
    grid[i] = new Array(cols).fill(value);
  }
  return grid;
}

// Function to generate the maze using recursive backtracking
function generateMaze(rows, cols) {
  const maze = initializeMazeGrid(rows, cols, '#');
  const stack = [[0, 0]];
  while (stack.length) {
    const [x, y] = stack.pop();
    maze[y][x] = '.';
    const directions = [[1, 0], [-1, 0], [0, 1], [0, -1]];
    for (let i = 0; i < 4; i++) {
      const direction = directions.splice(getRandomInt(0, directions.length), 1)[0];
      const dx = direction[0], dy = direction[1];
      const nx = x + (dx * 2), ny = y + (dy * 2);
      if (nx >= 0 && ny >= 0 && nx < cols && ny < rows && maze[ny][nx] === '#') {
        maze[ny][nx] = '.';
        maze[y + dy][x + dx] = '.';
        stack.push([nx, ny]);
      }
    }
  }
  return maze;
}

// Function to print the maze
function printMaze(maze) {
  const rows = maze.length;
  const cols = maze[0].length;
  for (let i = 0; i < rows; i++) {
    console.log(maze[i].join(''));
  }
}

// Function to solve the maze using the A* algorithm
function solveMaze(maze) {
  const rows = maze.length;
  const cols = maze[0].length;
  const openSet = new Set();
  const closedSet = new Set();
  const start = { x: 0, y: 0, g: 0, h: 0 };
  const end = { x: cols - 1, y: rows - 1 };
  const cameFrom = initializeMazeGrid(rows, cols, null);
  const gScore = initializeMazeGrid(rows, cols, Infinity);
  const fScore = initializeMazeGrid(rows, cols, Infinity);

  gScore[start.y][start.x] = 0;
  fScore[start.y][start.x] = heuristic(start, end);

  openSet.add(start);
  
  while (openSet.size) {
    let current = null;
    for (const node of openSet) {
      if (!current || fScore[node.y][node.x] < fScore[current.y][current.x]) {
        current = node;
      }
    }

    if (current.x === end.x && current.y === end.y) {
      return reconstructPath(cameFrom, current);
    }

    openSet.delete(current);
    closedSet.add(current);

    const neighbors = getNeighbors(current);
    for (const neighbor of neighbors) {
      if (closedSet.has(neighbor)) continue;

      const tentativeGScore = gScore[current.y][current.x] + 1;
      if (!openSet.has(neighbor)) openSet.add(neighbor);
      else if (tentativeGScore >= gScore[neighbor.y][neighbor.x]) continue;

      cameFrom[neighbor.y][neighbor.x] = current;
      gScore[neighbor.y][neighbor.x] = tentativeGScore;
      fScore[neighbor.y][neighbor.x] = gScore[neighbor.y][neighbor.x] + heuristic(neighbor, end);
    }
  }

  return [];
}

// Function to calculate the heuristic (Manhattan distance) between two points
function heuristic(a, b) {
  return Math.abs(a.x - b.x) + Math.abs(a.y - b.y);
}

// Function to get the neighbors of a cell
function getNeighbors(cell) {
  const { x, y } = cell;
  const neighbors = [];
  if (x > 0) neighbors.push({ x: x - 1, y });
  if (x < cols - 1) neighbors.push({ x: x + 1, y });
  if (y > 0) neighbors.push({ x, y: y - 1 });
  if (y < rows - 1) neighbors.push({ x, y: y + 1 });
  return neighbors;
}

// Function to reconstruct the path from start to end
function reconstructPath(cameFrom, current) {
  const path = [current];
  while (cameFrom[current.y][current.x]) {
    current = cameFrom[current.y][current.x];
    path.unshift(current);
  }
  return path;
}

// Generate a 10x10 maze
const maze = generateMaze(10, 10);
console.log("Generated Maze:");
printMaze(maze);

// Solve the maze
const path = solveMaze(maze);
console.log("\nSolved Maze:");
for (const node of path) {
  maze[node.y][node.x] = '@';
}
printMaze(maze);