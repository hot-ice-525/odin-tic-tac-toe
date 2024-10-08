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
    if (gameLogic(gameBoard)) {
      break;
    }
  }
}



// making the game logic
function gameLogic(board) {
  let allKeys = Object.keys(board);
  // mathc along rows
  if (board["r1c1"] !== "_" && board["r1c1"] === board["r1c2"] && board["r1c2"] === board["r1c3"]) {
    if (board["r1c1"] === players["player1"]) {
      console.log("%c Player1 WON!!!", "color: blue; font-size: 24px;");
    }
    else if (board["r1c1"] === players["player2"]) {
      console.log("%c Player2 WON!!!", "color: green; font-size: 24px;");
    }
    return true;
  }
  else if (board["r2c1"] !== "_" && board["r2c1"] === board["r2c2"] && board["r2c2"] === board["r2c3"]) {
    if (board["r2c1"] === players["player1"]) {
      console.log("%c Player1 WON!!!", "color: blue; font-size: 24px;");
    }
    else if (board["r2c1"] === players["player2"]) {
      console.log("%c Player2 WON!!!", "color: green; font-size: 24px;");
    }
    return true;
  }
  else if (board["r3c1"] !== "_" && board["r3c1"] === board["r3c2"] && board["r3c2"] === board["r3c3"]) {
    if (board["r3c1"] === players["player1"]) {
      console.log("%c Player1 WON!!!", "color: blue; font-size: 24px;");
    }
    else if (board["r3c1"] === players["player2"]) {
      console.log("%c Player2 WON!!!", "color: green; font-size: 24px;");
    }
    return true;
  }
  // match along columns
  else if (board["r1c1"] !== "_" && board["r1c1"] === board["r2c1"] && board["r2c1"] === board["r3c1"]) {
    if (board["r1c1"] === players["player1"]) {
      console.log("%c Player1 WON!!!", "color: blue; font-size: 24px;");
    }
    else if (board["r1c1"] === players["player2"]) {
      console.log("%c Player2 WON!!!", "color: green; font-size: 24px;");
    }
    return true;
  }
  else if (board["r1c2"] !== "_" && board["r1c2"] === board["r2c2"] && board["r2c2"] === board["r3c2"]) {
    if (board["r1c2"] === players["player1"]) {
      console.log("%c Player1 WON!!!", "color: blue; font-size: 24px;");
    }
    else if (board["r1c2"] === players["player2"]) {
      console.log("%c Player2 WON!!!", "color: green; font-size: 24px;");
    }
    return true;
  }
  else if (board["r1c3"] !== "_" && board["r1c3"] === board["r2c3"] && board["r2c3"] === board["r3c3"]) {
    if (board["r1c3"] === players["player1"]) {
      console.log("%c Player1 WON!!!", "color: blue; font-size: 24px;");
    }
    else if (board["r1c3"] === players["player2"]) {
      console.log("%c Player2 WON!!!", "color: green; font-size: 24px;");
    }
    return true;
  }
  // match along diagonals
  else if (board["r1c1"] !== "_" && board["r1c1"] === board["r2c2"] && board["r2c2"] === board["r3c3"]) {
    if (board["r2c2"] === players["player1"]) {
      console.log("%c Player1 WON!!!", "color: blue; font-size: 24px;");
    }
    else if (board["r2c2"] === players["player2"]) {
      console.log("%c Player2 WON!!!", "color: green; font-size: 24px;");
    }
    return true;
  }
  else if (board["r1c3"] !== "_" && board["r1c3"] === board["r2c2"] && board["r2c2"] === board["r3c1"]) {
    if (board["r2c2"] === players["player1"]) {
      console.log("%c Player1 WON!!!", "color: blue; font-size: 24px;");
    }
    else if (board["r2c2"] === players["player2"]) {
      console.log("%c Player2 WON!!!", "color: green; font-size: 24px;");
    }
    return true;
  }
  // if all the cells are filled but still no matches, it means it is a draw
  else {
    let counter = 0;
    for (let i = 0; i < allKeys.length; i++) {
      if (board[allKeys[i]] === "_") {
        counter = 1;
        break;
      }
    }
    if (counter === 0) {
      console.log("%c DRAW!!!", "color: orange; font-size: 24px;")
      return true;
    }
  }
  return false;
}

playGame()