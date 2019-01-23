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
      // Call function to check the rule for White pons

      var matrix = board.matrix(); // full board
      var currentCell = board.cell(this).where(); // place where the player wants to play
      // TEST CASES TO RESOLVE GAME RULES
      // var nextCell = board.cell(this, 1).get(); // works
      // var previousCell = board.cell(this, -1).get(); // works
      // board.cell(currentCell).DOM().classList.add("w-active"); // works (add a class to the clicked cell)

      // SHIFT OF POSITION
      var leftCell = Array(currentCell[0], currentCell[1] - 1);
      var rightCell = Array(currentCell[0], currentCell[1] + 1);
      var upCell = Array(currentCell[0] - 1, currentCell[1]);
      var downCell = Array(currentCell[0] + 1, currentCell[1]);
      var upRightCell = Array(currentCell[0] - 1, currentCell[1] + 1);
      var upLeftCell = Array(currentCell[0] - 1, currentCell[1] - 1);
      var downRightCell = Array(currentCell[0] + 1, currentCell[1] - 1);
      var downLeftCell = Array(currentCell[0] + 1, currentCell[1] + 1);
      // CONTENT OF THE POSITION BESIDE
      var leftContent = board.cell(leftCell).get();
      var rightContent = board.cell(rightCell).get();
      var upContent = board.cell(upCell).get();
      var downContent = board.cell(downCell).get();
      var upRightContent = board.cell(upRightCell).get();
      var upLeftContent = board.cell(upLeftCell).get();
      var downRightContent = board.cell(downRightCell).get();
      var downLeftContent = board.cell(downLeftCell).get();

      // RULES :
      // PLAYER CAN PLAY IF :
      // 1 - (DONE)THERE IS A PON OF THE OPPOSITE COLOR RIGHT BESIDE THE CHOOSEN CELL
      // 2 - THERE IS A PON OF THE SAME COLOR AT THE OPPOSITE POSITION OF THE CHOOSEN CELL

      // (DONE)CHECK THE PON COLOR RIGHT NEXT TO THE CHOOSEN CELL
      // TODO SECOND CHECK CAN BE DONE WITH EACH ONES OF THE FIRST CHECK
      if (
        leftContent == "B" ||
        rightContent == "B" ||
        upContent == "B" ||
        downContent == "B" ||
        upLeftContent == "B" ||
        upRightContent == "B" ||
        downLeftContent == "B" ||
        downRightContent == "B"
      ) {
        // TODO : CHECK THE OPPOSITE PON COLOR OF THE CHOOSEN CELL
        board.cell(this).place(white.clone());
      }

      for (i = 0; i < matrix.length; i++) {
        for (j = 0; j < matrix[i].length; j++) {}
      }
    } else {
      // Call function to check the rule
      var matrix = board.matrix();
      var currentCell = board.cell(this).where();
      // console.log(matrix);
      // console.log(currentCell);
      board.cell(this).place(black.clone());
    }
    console.log(matrix);
    turn = !turn;
  }
});

// +1 et -1 dans les directions N/S/E/O dans une double boucle i and j.
// Function is check if the player can put the pon where is choose to
// if not, cell will be denied : UI/UX to be defined (first will be red)
// if ok, play a little chim sound
function checkAllPossibilities(currentCell) {
}

function gameInit() {
  board.cell([3, 3]).place(white.clone());
  board.cell([3, 4]).place(black.clone());
  board.cell([4, 3]).place(black.clone());
  board.cell([4, 4]).place(white.clone());
}
