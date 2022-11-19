

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
     // Every time we reset the board we update the display
      displayControl.updateBoard()
    }

    const printBoard = () => console.log(board)

    return {changeBoard, boardLenght, boardSymbol, resetBoard, printBoard}
})();



const displayControl = (() => {
    // Get all the fields from the html
    let fields = document.querySelectorAll("[id^=square_]");
    let player_text = document.getElementById("playingtext");
    let reset_button = document.getElementById("r_button");

    // if dom loaded change player text
    document.addEventListener("DOMContentLoaded", () => {
      updatePlayerText();
    })
    // for each field add a eventlistener and print out the square
    fields.forEach((field) => field.addEventListener("click", (e) =>{
      // the position to change
      let position = e.target.dataset.num;
      let player = gameControl.getCurrentPlayer();
      // if the spot is empty play the move
      if (e.target.innerHTML === ""){

        // the sign to be puted in
        gameControl.playRound(position);
        // Change the board and update it
        gameBoard.changeBoard(player.getSign(), position);
        updateBoard();
        updatePlayerText();
      }
    }))

    reset_button.addEventListener("click", () =>{
      gameBoard.resetBoard()
      gameControl.changeRound(1)
      updatePlayerText();
    })


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
      let player = gameControl.getCurrentPlayer();
      player_text.innerHTML = `Player ${player.getName()} is playing`
    }



    return{updateBoard}

})();


const gameControl = (() => {

  // X fängt immer an 

  const player1 = Player("aco", "X");
  const player2 = Player("jelena", "O");
  let round = 0;


  const playRound = (index_of_sign) =>{
    checkIfTie();
    round++
    console.log(round)
  }

  // get the current player depening on the round that is being played
  const getCurrentPlayer = () => {
    current = round % 2 === 0 ? player1 : player2;
    return current
  }

  const checkIfTie  = () => {
    if (round === 9){
      round = 1;
    }
  }

  const changeRound = (num) => round = num; 

  const checkifWinner = () => {
    // check if 3 in a row
  }


  return {playRound, getCurrentPlayer, changeRound}

})();