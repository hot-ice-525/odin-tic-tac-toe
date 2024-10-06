/*
1) divide the entire game in rows and grids, name each cell with their respective row and column location, e.g., r1c1, r2c3, etc..
For starting just make them all empty.

2) assign both the players their respective symbol, namely X and O.

3) ask the player for the cell they want to fill with their symbol.

4) turns should be alterante between players.

5) after each player's turn, show the entire grid with current status of the game.

5) cover all the cases for 3 in a row, 3 in a column and 3 in a diagonal to decide the final winner.
*/

console.log("Welcome to Tic Tac Toe");

const players = {};

let gameBoard = {
  "r1c1": "_", "r1c2": "_", "r1c3": "_",
  "r2c1": "_", "r2c2": "_", "r2c3": "_",
  "r3c1": "_", "r3c2": "_", "r3c3": "_",
}

function showBoard(board) {
  const allCells = Object.keys(board);
  for (let i = 0; i < 3; i++) {
    let a = (3 * i);
    console.log(`${board[allCells[a]]}   ${board[allCells[a + 1]]}   ${board[allCells[a + 2]]}`);
    console.log("");
  }
}

showBoard(gameBoard);
