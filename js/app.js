/*-------------------------------- Constants --------------------------------*/
const winningCombos = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
];
/*---------------------------- Variables (state) ----------------------------*/

let board;
let turn;
let winner;
let tie;

/*------------------------ Cached Element References ------------------------*/

const squareEls = document.querySelectorAll(".sqr");
const messageEl = document.getElementById("message");
const resetBtnEl = document.getElementById("reset");
/*-------------------------------- Functions --------------------------------*/
function init() {
  console.log("function init is work");
  board = ["", "", "", "", "", "", "", "", ""];
  turn = "X";
  winner = false;
  tie = false;
  render();
}

function render() {
  updateBoard();
  updateMessage();
}

function updateBoard() {
  for (let i = 0; i < board.length; i++) {
    const sqr = squareEls[i];
    if (board[i] === "O") {
      sqr.innerHTML = "O";
    } else if (board[i] === "X") {
      sqr.innerHTML = "X";
    } else {
      sqr.innerHTML = "";
    }
  }
}

function updateMessage() {
  if (!winner && !tie) {
    messageEl.innerHTML = "Turn: " + turn;
  } else if (winner === false && tie === true) {
    messageEl.innerHTML = "game is tie";
  } else {
    messageEl.innerHTML = "congratulation palayer " + turn + " you win";
  }
}

const placePiece = (index) => {
  board[index] = turn;
  console.log(board);
};

const checkForWinner = () => {
  for (let i = 0; i < winningCombos.length; i++) {
    const winningIndexes = winningCombos[i];
    if (
      board[winningIndexes[0]] !== "" &&
      board[winningIndexes[0]] === board[winningIndexes[1]] &&
      board[winningIndexes[0]] === board[winningIndexes[2]]
    ) {
      winner = true;
      break;
    }
  }
};

const checkForTie = () => {
  if (winner === true) {
    return;
  }
  if (!board.includes("")) {
    tie = true;
  }
};

const switchPlayerTurn = () => {
  if (winner === true) {
    return;
  }
  if (turn === "X") {
    turn = "O";
  } else {
    turn = "X";
  }
};
init();

/*----------------------------- Event Listeners -----------------------------*/

const handleClick = (event) => {
  const squareIndex = event.target.id;
  if (
    board[squareIndex] === "O" ||
    board[squareIndex] === "X" ||
    winner === true
  ) {
    return;
  }
  placePiece(squareIndex);
  checkForWinner();
  checkForTie();
  switchPlayerTurn();
  render();
};

squareEls.forEach((sqrEl) => {
  sqrEl.addEventListener("click", handleClick);
});

resetBtnEl.addEventListener("click", init);
