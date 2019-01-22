// Game Settings
var boardSize = "8x8";

var board = jsboard.board({attach: "game", size: boardSize});
var white = jsboard.piece({
  text: "W",
  color: "transparent",
  background: "url('./img/white-pon.png') no-repeat",
  width: "90px",
  height: "90px",
  margin: "0 auto"
});
var black = jsboard.piece({
  text: "B",
  color: "transparent",
  background: "url('./img/black-pon.png') no-repeat",
  width: "90px",
  height: "90px",
  margin: "0 auto"
});

// Styling
board.cell("each").style({
  width: "100px",
  height: "100px",
  background: "green",
  backgroundImage: "url('./img/black-paper.png')",
  borderRadius: "3px"
});

// Game initialization
gameInit();

// Game click handler
var turn = true;
board.cell("each").on("click", function() {
  if (board.cell(this).get() === null) {
    if (turn) {
      // Call function to check the rule
      var matrix = board.matrix(); // full board
      var currentCell = board.cell(this).where(); // place where the player wants to play
      console.log(matrix);
      console.log(currentCell);
      board.cell(this).place(white.clone());
    } else {
      // Call function to check the rule
      var matrix = board.matrix();
      var currentCell = board.cell(this).where();
      console.log(matrix);
      console.log(currentCell);
      board.cell(this).place(black.clone());
    }
    turn = !turn;
  }
});

// +1 et -1 dans les directions N/S/E/O dans une double boucle i and j.
// Function is check if the player can put the pon where is choose to
// if not, cell will be denied : UI/UX to be defined (first will be red)
// if ok, play a little chim sound
function checkAllPossibilities(position, matrix) {
  // var matrix = board.matrix();
  // var currentCell = board.cell(this).where();
  // console.log(matrix);
  // console.log(currentCell);
}

function gameInit() {
  board.cell([3, 3]).place(white.clone());
  board.cell([3, 4]).place(black.clone());
  board.cell([4, 3]).place(black.clone());
  board.cell([4, 4]).place(white.clone());
}
