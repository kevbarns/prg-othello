// Game Settings & variables
var boardSize = "8x8";
var turn = true;
// Board declaration
var board = jsboard.board({attach: "game", size: boardSize});
// White pon
var white = jsboard.piece({
  text: "W",
  color: "transparent",
  background: "url('./img/white-pon.png') no-repeat",
  width: "80px",
  height: "80px",
  margin: "0 auto"
});
// Black pon
var black = jsboard.piece({
  text: "B",
  color: "transparent",
  background: "url('./img/black-pon.png') no-repeat",
  width: "80px",
  height: "80px",
  margin: "0 auto"
});
// Styling
board.cell("each").style({
  width: "80px",
  height: "80px",
  background: "green",
  backgroundImage: "url('./img/black-paper.png')",
  borderRadius: "3px"
});

// Game initialization
gameInit();

board.cell("each").on("click", function() {
  var matrix = board.matrix(); // full board
  var currentCell = board.cell(this).where(); // place where the player wants to play
  var directions = [
    {r: 1, c: 0}, // down
    {r: -1, c: 0}, // up
    {r: 0, c: 1}, // right
    {r: 0, c: -1}, // left
    {r: -1, c: 1}, // upper right
    {r: -1, c: -1}, // upper left
    {r: 1, c: 1}, // down left
    {r: 1, c: -1} // down right
  ];
  if (board.cell(this).get() === null) {
    if (turn) {
      // VISUAL INDICATION BLACK PLAYER
      // Call function to check the rule for white pons
      directions.forEach(function(direction) {
        var toShift = [];
        for (
          var row = currentCell[0] + direction.r,
            col = currentCell[1] + direction.c;
          row < 7 && col < 7;
          row += direction.r, col += direction.c
        ) {
          // if empty or color matching we need to stop   board.cell([row, col])
          if (
            board.cell([row, col]).get() == null ||
            board.cell([row, col]).get() == "W"
          ) {
            break;
          } else {
            // else save the coordinates for MAYBE shifting
            toShift.push({row, col});
          }
        }
        // if cell is MATCHING time to shift    board.cell([row, col])
        if (board.cell([row, col]).get() == "W" && (row !== currentCell[0] + direction.r || col !== currentCell[1] + direction.c )) {
          toShift.forEach(function(coords) {
            board.cell([coords.row, coords.col]).rid();
            board.cell([coords.row, coords.col]).place(white.clone());
          });
          board.cell([currentCell[0], currentCell[1]]).place(white.clone());
        }
      });
    } else {
      // VISUAL INDICATION BLACK PLAYER
      // Call function to check the rule for black pons
      directions.forEach(function(direction) {
        var toShift = [];
        for (
          var row = currentCell[0] + direction.r,
            col = currentCell[1] + direction.c;
          row < 7 && col < 7;
          row += direction.r, col += direction.c
        ) {
          // if empty or color matching we need to stop   board.cell([row, col])
          if (
            board.cell([row, col]).get() == null ||
            board.cell([row, col]).get() == "B"
          ) {
            break;
          } else {
            // else save the coordinates for MAYBE shifting
            toShift.push({row, col});
          }
        }
        // if cell is MATCHING time to shift    board.cell([row, col])
        if (board.cell([row, col]).get() == "B" && (row !== currentCell[0] + direction.r || col !== currentCell[1] + direction.c )) {
          toShift.forEach(function(coords) {
            board.cell([coords.row, coords.col]).rid();
            board.cell([coords.row, coords.col]).place(black.clone());
          });
          board.cell([currentCell[0], currentCell[1]]).place(black.clone());
        }
      });
    }
    turn = !turn;
    // TODO : Check for the end of the game
  }
  // if(board.matrix.length)
});

function gameInit() {
  board.cell([3, 3]).place(white.clone());
  board.cell([3, 4]).place(black.clone());
  board.cell([4, 3]).place(black.clone());
  board.cell([4, 4]).place(white.clone());
}
