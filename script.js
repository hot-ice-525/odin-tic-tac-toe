/*
1) divide the entire game in rows and grids, name each cell with their respective row and column location, e.g., r1c1, r2c3, etc..
For starting just make them all empty.

2) assign both the players their respective symbol, namely X and O.

3) ask the player for the cell they want to fill with their symbol.

4) turns should be alterante between players.

5) after each player's turn, show the entire grid with current status of the game.

5) cover all the cases for 3 in a row, 3 in a column and 3 in a diagonal to decide the final winner.
*/

console.log("%c Welcome to Tic Tac Toe ", "background-color: red; color: white; font-size: 24px;");

const players = {
  player1: "X",
  player2: "O",
};

let gameBoard = {
  r1c1: "_", r1c2: "_", r1c3: "_",
  r2c1: "_", r2c2: "_", r2c3: "_",
  r3c1: "_", r3c2: "_", r3c3: "_",
}

function showBoard(board) {
  const allCells = Object.keys(board);
  console.log("<--------------------------->");
  for (let i = 0; i < 3; i++) {
    let a = (3 * i);
    console.log(`${board[allCells[a]]}   ${board[allCells[a + 1]]}   ${board[allCells[a + 2]]}`);
    console.log("");
  }
}

showBoard(gameBoard);

function fillCell(playerSymbol, position) {
  gameBoard[position] = playerSymbol;
}


function playGame() {
  // For development phase, run the game for 9 turns to fill up entire board
  let currPlayerSym, currPlayerCell;
  for (let i = 0; i < 9; i++) {
    if (i % 2 === 0) {
      console.log("Player1's turn:");
      currPlayerSym = players["player1"]
    }
    else {
      console.log("Player2's turn:");
      currPlayerSym = players["player2"];
    }
    currPlayerCell = prompt("Enter your target cell (e.g.- r2c3 target cell present in 2nd row at 3rd column):");
    fillCell(currPlayerSym, currPlayerCell);
    showBoard(gameBoard);
  }
}

playGame()