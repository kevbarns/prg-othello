
// Game Settings
var boardSize = "8x8";

var board = jsboard.board({attach: "game", size: boardSize});
var white = jsboard.piece({
  text: "",
  background: "url('./img/white-pon.png') no-repeat",
  width: "90px",
  height: "90px",
  margin: "0 auto"
});
var black = jsboard.piece({
  text: "",
  background: "url('./img/black-pon.png') no-repeat",
  width: "90px",
  height: "90px",
  margin: "0 auto"
});

// Styling
board.cell("each").style({width: "100px", height: "100px", background:"green"});

// Board behavoir
var turn = true;
board.cell("each").on("click", function() {
  if (board.cell(this).get() === null) {
    if (turn) {
      // IF nearby cells are not empty AND not white 
      var location = board.cell(this).where();
      console.log("pièce blanche : " + location);
      console.log(board.matrix);
      board.cell(this).place(white.clone());
    } else {
      // IF nearby cells are not empty AND not black
      var location = board.cell(this).where();
      console.log("pièce noir : " + location);
      console.log(board.matrix);
      
      board.cell(this).place(black.clone());
    }
    turn = !turn;
  }
});
