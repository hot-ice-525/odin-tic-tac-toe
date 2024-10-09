/*
1) divide the entire game in rows and grids, name each cell with their respective row and column location, e.g., r1c1, r2c3, etc..
For starting just make them all empty.

2) assign both the players their respective symbol, namely X and O.

3) ask the player for the cell they want to fill with their symbol.

4) turns should be alterante between players.

5) after each player's turn, show the entire grid with current status of the game.

6) cover all the cases for 3 in a row, 3 in a column and 3 in a diagonal to decide the final winner.

<---------Console Game Completed------------->

7) think of some method to display gameBoard in the DOM

8) Make the game to be played using clicks
*/


// Central unit of game that has all the global variables and gives their access to different function on demand
function gameController() {
  const players = {
    player1: "X",
    player2: "O",
  };

  let gameBoard = {
    r1c1: "_", r1c2: "_", r1c3: "_",
    r2c1: "_", r2c2: "_", r2c3: "_",
    r3c1: "_", r3c2: "_", r3c3: "_",
  }

  console.log("%c Welcome to Tic Tac Toe ", "background-color: red; color: white; font-size: 24px;");
  showBoard(gameBoard);
  addToDOM(gameBoard);

  // Start the game when user clicks the button
  const gameStartBtn = document.querySelector(".startGameBtn");
  gameStartBtn.addEventListener("click", () => {
    playGame(players, gameBoard);
  });
}


gameController();


function showBoard(board) {
  const allCells = Object.keys(board);
  console.log("<--------------------------->");
  for (let i = 0; i < 3; i++) {
    let a = (3 * i);
    console.log(`${board[allCells[a]]}   ${board[allCells[a + 1]]}   ${board[allCells[a + 2]]}`);
    console.log("");
  }
}

function fillCell(board, playerSymbol, position) {
  if (board[position] !== undefined) {
    if (board[position] === "_") {
      board[position] = playerSymbol;
      return true;
    }
    else {
      alert("Please don't target already filled up cells");
      return false;
    }
  }
  else {
    alert("Please choose valid empty cell only");
    return false;
  }
}


function playGame(players, gameBoard) {
  let currPlayerSym, currPlayerCell;
  let turn = 0;
  let repeater = 0;
  while (!gameLogic(gameBoard)) {
    // Show the inside info in console only once
    if (repeater === 0) {
      if (turn % 2 === 0) {
        console.log("Player1's turn:");
        currPlayerSym = players["player1"];
      }
      else {
        console.log("Player2's turn:");
        currPlayerSym = players["player2"];
      }
    }
  
    currPlayerCell = prompt("Enter your target cell (e.g.- r2c3 target cell present in 2nd row at 3rd column):");
    if (fillCell(gameBoard, currPlayerSym, currPlayerCell)) {
      turn++;
      repeater = 0;
      showBoard(gameBoard);
      addToDOM(gameBoard);
    }
    else {
      repeater = 1;
    }
  }
  showResults(gameLogic(gameBoard), players);
}


// making the game logic
function gameLogic(board) {
  let allKeys = Object.keys(board);
  // mathc along rows
  if (board["r1c1"] !== "_" && board["r1c1"] === board["r1c2"] && board["r1c2"] === board["r1c3"]) {
    return [board["r1c1"]];
  }
  else if (board["r2c1"] !== "_" && board["r2c1"] === board["r2c2"] && board["r2c2"] === board["r2c3"]) {
    return [board["r2c1"]];
  }
  else if (board["r3c1"] !== "_" && board["r3c1"] === board["r3c2"] && board["r3c2"] === board["r3c3"]) {
    return [board["r3c1"]];
  }
  // match along columns
  else if (board["r1c1"] !== "_" && board["r1c1"] === board["r2c1"] && board["r2c1"] === board["r3c1"]) {
    return [board["r1c1"]];
  }
  else if (board["r1c2"] !== "_" && board["r1c2"] === board["r2c2"] && board["r2c2"] === board["r3c2"]) {
    return [board["r1c2"]];
  }
  else if (board["r1c3"] !== "_" && board["r1c3"] === board["r2c3"] && board["r2c3"] === board["r3c3"]) {
    return [board["r1c3"]];
  }
  // match along diagonals
  else if (board["r1c1"] !== "_" && board["r1c1"] === board["r2c2"] && board["r2c2"] === board["r3c3"]) {
    return [board["r1c1"]];
  }
  else if (board["r1c3"] !== "_" && board["r1c3"] === board["r2c2"] && board["r2c2"] === board["r3c1"]) {
    return [board["r1c3"]];
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
      return ["player1", "player2"];
    }
  }
  return false;
}


// Declare results
function showResults(player, allPlayers) {
  if (player.length === 2) {
    console.log("%c DRAW!!!", "color: orange; font-size: 24px;");
  }
  else {
    if (player[0] === allPlayers["player1"]) {
      console.log("%c Player1 WON!!!", "color: blue; font-size: 24px;");
    }
    else if (player[0] === allPlayers["player2"]) {
      console.log("%c Player2 WON!!!", "color: green; font-size: 24px;");
    }
  }
}

// Add gameBoard to DOM
function addToDOM(gameBoard) {
  const ul = document.querySelector(".gameBoard");
  ul.innerHTML = "";
  const allCells = Object.keys(gameBoard);
  let cell, button;
  for (let i = 0; i < allCells.length; i++) {
    cell = document.createElement("li");
    button = document.createElement("button");
    button.innerText = gameBoard[allCells[i]];
    cell.appendChild(button);
    ul.appendChild(cell);
  }
}