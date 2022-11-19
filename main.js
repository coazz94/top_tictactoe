

const Player = (name, sign) => {

    const getSign = () => sign;

    const getName = () => name;

    return{getSign, getName}
}


const gameBoard = (() => {

    let board = [
      "", "", "",
      "", "", "",
      "", "", "",
      ]

    const changeBoard = (sign, position) => {
      board[position] = sign;
    }

    const boardLenght = () => board.length;

    const boardSymbol = (x) => board[x];

    const resetBoard = () => {
      for(let i = 0; i < board.length; i++){
        board[i] = "";
     }
    }
    const printBoard = () => console.log(board)

    return {changeBoard, boardLenght, boardSymbol, resetBoard, printBoard}
})();



const displayControl = (() => {
    // Get all the fields from the html
    let fields = document.querySelectorAll("[id^=square_]");
    let player_text = document.getElementById("playingtext");

    // for each field add a eventlistener and print out the square
    fields.forEach((field) => field.addEventListener("click", (e) =>{

      // the position to change
      let position = e.target.dataset.num;

      // if the spot is empty play the move
      if (e.target.innerHTML === ""){
        updatePlayerText();
        // the sign to be puted in
        gameControl.playRound(position);
        // Change the board and update it
        gameBoard.changeBoard(gameControl.getCurrentPlayer(), position);
        updateBoard();
      }
    }))

    // Update the board display
    const updateBoard = () => {
      // for all the squares check if something is in the board
      for(let i = 0; i < gameBoard.boardLenght(); i++){
         if (gameBoard.boardSymbol(i) != ""){
          // console.log(i)
            fields[i].innerHTML = gameBoard.boardSymbol(i);
         } else{
          fields[i].innerHTML = "";
         }
      }
    } 
    // Update the text
    const updatePlayerText = () => {
      player_text.innerHTML = `Player ${gameControl.getCurrentPlayer()} is playing`
    }

    return{updateBoard}

})();


const gameControl = (() => {

  // X fängt immer an 

  const player1 = Player("aleks", "X");
  const player2 = Player("jelena", "O");
  let round = 1;


  const playRound = (index_of_sign) =>{
    checkIfTie();
    // console.log(getCurrentPlayer())
    round++
    
  }


  const getCurrentPlayer = () => {
    let current = round % 2 === 1 ? player1.getSign() : player2.getSign();
    return current
  }

  const checkIfTie  = () => {
    if (round === 10){
      console.log("Finished")
      // do whatever
      round = 1;
      gameBoard.resetBoard();
    }
  }


  const checkifWinner = () => {
    // check if 3 in a row
  }



  return {playRound, getCurrentPlayer}

})();