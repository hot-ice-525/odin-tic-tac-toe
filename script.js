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
    r1c1: "", r1c2: "", r1c3: "",
    r2c1: "", r2c2: "", r2c3: "",
    r3c1: "", r3c2: "", r3c3: "",
  }

  let firstTime = true;

  console.log("%c Welcome to Tic Tac Toe ", "background-color: red; color: white; font-size: 24px;");
  // showBoard(gameBoard);
  addToDOM(gameBoard, undefined, firstTime);

  // Start the game when user clicks the button
  const allLi = document.querySelectorAll(".gameBoard > li > button");
  const gameStartBtn = document.querySelector(".startGameBtn");
  gameStartBtn.addEventListener("click", () => {
    allLi.forEach((btn) => {
      btn.classList.add("gameStarted");
    });
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

function fillGameBoard(board, playerSymbol, position) {
  const allCells = Object.keys(board);
  if (board[allCells[position]] === "") {
    board[allCells[position]] = playerSymbol;
    return true;
  }
  else {
    alert("Please don't target already filled up cells");
    return false;
  }
}


function playGame(players, gameBoard) {
  let turn = 0;
  let currPlayerSym, currCellPos, allLi, winner;
  const ul = document.querySelector(".gameBoard");

  ul.addEventListener("click", (e) => {
    if (turn % 2 === 0) {
      currPlayerSym = players["player1"];
    }
    else {
      currPlayerSym = players["player2"];
    }

    // Know the position of cell being clicked
    allLi = ul.children;
    for (let i = 0; i < allLi.length; i++) {
      if (allLi[i] === e.target.parentNode) {
        currCellPos = i;
      }
    }
    
    if (fillGameBoard(gameBoard, currPlayerSym, currCellPos)) {
      addToDOM(gameBoard, currCellPos, false);

      // For styling purposes
      if (turn % 2 === 0) {
        e.target.classList.add("player1");
        if (e.target.classList.contains("gameStarted")) {
          e.target.classList.remove("gameStarted");
        }
      }
      else {
        e.target.classList.add("player2");
        if (e.target.classList.contains("gameStarted")) {
          e.target.classList.remove("gameStarted");
        }
      }

      winner = gameLogic(gameBoard);
      if (winner !== false) {
        showResults(winner, players, gameBoard);
        return;
      }
      turn++;
    }
  });
}


// making the game logic
function gameLogic(board) {
  let allKeys = Object.keys(board);
  // match along rows
  if (board["r1c1"] !== "" && board["r1c1"] === board["r1c2"] && board["r1c2"] === board["r1c3"]) {
    return [board["r1c1"]];
  }
  else if (board["r2c1"] !== "" && board["r2c1"] === board["r2c2"] && board["r2c2"] === board["r2c3"]) {
    return [board["r2c1"]];
  }
  else if (board["r3c1"] !== "" && board["r3c1"] === board["r3c2"] && board["r3c2"] === board["r3c3"]) {
    return [board["r3c1"]];
  }
  // match along columns
  else if (board["r1c1"] !== "" && board["r1c1"] === board["r2c1"] && board["r2c1"] === board["r3c1"]) {
    return [board["r1c1"]];
  }
  else if (board["r1c2"] !== "" && board["r1c2"] === board["r2c2"] && board["r2c2"] === board["r3c2"]) {
    return [board["r1c2"]];
  }
  else if (board["r1c3"] !== "" && board["r1c3"] === board["r2c3"] && board["r2c3"] === board["r3c3"]) {
    return [board["r1c3"]];
  }
  // match along diagonals
  else if (board["r1c1"] !== "" && board["r1c1"] === board["r2c2"] && board["r2c2"] === board["r3c3"]) {
    return [board["r1c1"]];
  }
  else if (board["r1c3"] !== "" && board["r1c3"] === board["r2c2"] && board["r2c2"] === board["r3c1"]) {
    return [board["r1c3"]];
  }
  // if all the cells are filled but still no matches, it means it is a draw
  else {
    let counter = 0;
    for (let i = 0; i < allKeys.length; i++) {
      if (board[allKeys[i]] === "") {
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
function showResults(player, allPlayers, board) {
  const ul = document.querySelector(".gameBoard");
  const allLi = ul.children;
  if (player.length === 2) {
    // console.log("%c DRAW!!!", "color: orange; font-size: 24px;");
    gameOver(board);
    ul.classList.add("draw");
    // Color the entire ul with draw's color
    for (let i = 0; i < allLi.length; i++) {
      allLi[i].children[0].classList.add("winnerNone");
    }
  }
  else {
    if (player[0] === allPlayers["player1"]) {
      // console.log("%c Player1 WON!!!", "color: blue; font-size: 24px;");
      gameOver(board);
      ul.classList.add("player1won");
      // Color the entire ul with player1's color
      for (let i = 0; i < allLi.length; i++) {
        allLi[i].children[0].classList.add("winnerPlayer1");
      }
      
    }
    else if (player[0] === allPlayers["player2"]) {
      // console.log("%c Player2 WON!!!", "color: green; font-size: 24px;");
      gameOver(board);
      ul.classList.add("player2won");
      // Color the entire ul with player2's color
      for (let i = 0; i < allLi.length; i++) {
        allLi[i].children[0].classList.add("winnerPlayer2");
      }
    }
  }
}

// Add gameBoard to DOM
function addToDOM(gameBoard, cellIndex, firstTime) {
  const ul = document.querySelector(".gameBoard");
  const allCells = Object.keys(gameBoard);
  if (firstTime) {
    let cell, button;
    for (let i = 0; i < allCells.length; i++) {
      cell = document.createElement("li");
      cell.classList.add("cell" + i);
      button = document.createElement("button");
      console.log(gameBoard[allCells[i]]);
      button.innerText = gameBoard[allCells[i]];
      cell.appendChild(button);
      ul.appendChild(cell);
    }
  }
  else {
    ul.children[cellIndex].children[0].innerText = gameBoard[allCells[cellIndex]];
  }
}


// When game is over, reset everything
function gameOver(board) {
  // Empty the gameBoard array
  const allCells = Object.keys(board);
  for (let i = 0; i < allCells.length; i++) {
    board[allCells[i]] = "";
  }

  // Empty the gamboard in DOM
  const ul = document.querySelector(".gameBoard");
  const allLi = ul.children;
  for (let i = 0; i < allLi.length; i++) {
    allLi[i].children[0].innerText = "";
    allLi[i].children[0].classList = "";
  }
}