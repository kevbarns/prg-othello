// Game Settings & variables
var boardSize = "8x8";
var arraySize = 64;
var turn = true;
var whiteCount = 0;
var blackCount = 0;

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

$(document).ready(function() {
  $(".fas-white").addClass("fas-blink");
});

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
      $(".fas-white").removeClass("fas-blink");
      // Call function to check the rule for white pons
      directions.forEach(function(direction) {
        var toShift = [];
        for (
          var row = currentCell[0] + direction.r,
            col = currentCell[1] + direction.c;
          row < 7 && col < 7;
          row += direction.r, col += direction.c
        ) {
          if (row < 0 || col < 0) {
            break;
          }
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
        if (
          board.cell([row, col]).get() == "W" &&
          (row !== currentCell[0] + direction.r ||
            col !== currentCell[1] + direction.c)
        ) {
          toShift.forEach(function(coords) {
            board.cell([coords.row, coords.col]).rid();
            board.cell([coords.row, coords.col]).place(white.clone());
          });
          board.cell([currentCell[0], currentCell[1]]).place(white.clone());
          $(".fas-black").addClass("fas-blink");
        }
      });
    } else {
      // VISUAL INDICATION BLACK PLAYER
      $(".fas-black").removeClass("fas-blink");
      // Call function to check the rule for black pons
      directions.forEach(function(direction) {
        var toShift = [];
        for (
          var row = currentCell[0] + direction.r,
            col = currentCell[1] + direction.c;
          row < 7 && col < 7;
          row += direction.r, col += direction.c
        ) {
          if (row < 0 || col < 0) {
            break;
          }
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
        if (
          board.cell([row, col]).get() == "B" &&
          (row !== currentCell[0] + direction.r ||
            col !== currentCell[1] + direction.c)
        ) {
          toShift.forEach(function(coords) {
            board.cell([coords.row, coords.col]).rid();
            board.cell([coords.row, coords.col]).place(black.clone());
          });
          board.cell([currentCell[0], currentCell[1]]).place(black.clone());
          $(".fas-white").addClass("fas-blink");
        }
      });
    }
    turn = !turn;
    // TODO : Check for the end of the game
    if (matrix.length == arraySize) {
    }

    var isFull = true;

    matrix.forEach(function(i) {
      // console.log(i.length);
      i.forEach(function(j) {
        console.log(matrix.length);
        if (j === null) {
          isFull = false;
        }
      });
    });

    if (isFull) {
      countPon(matrix);
    }

    console.log(matrix.length);

    // console.log(whiteCount, blackCount);
  }
});

function countPon(matrix) {
  console.log("coucou countPon");
  matrix.forEach(function(i) {
    i.forEach(function(j) {
      if (j == "W") {
        whiteCount++;
      } else {
        blackCount++;
      }
    });
  });
}

function gameInit() {
  board.cell([3, 3]).place(white.clone());
  board.cell([3, 4]).place(black.clone());
  board.cell([4, 3]).place(black.clone());
  board.cell([4, 4]).place(white.clone());
}
