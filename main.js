

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

    // return the Boards X and O positions
    // probably smarter way
    const returnBoard = () => {

    let x_arry = []
    let o_array = []
    
    for (let i = 0; i < board.length; i++){
      if (board[i] === "X"){
        x_arry.push(i);
      }else if (board[i] === "O"){
        o_array.push(i);
      }
    }

    return [x_arry, o_array]

    };




    const printBoard = () => console.log(board)

    return {changeBoard, boardLenght, boardSymbol, resetBoard, printBoard, returnBoard}
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
      // if the spot is empty play the move
      if (e.target.innerHTML === ""){
        // the sign to be puted in
        gameControl.playRound(position);
        // Update the board after a move was played
        updateBoard();
        // update the text who is playing next
        updatePlayerText();
      }
    }))

    // add a event listener to the reset button, if clicked game is reseted
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


  const w_combinations = [
    [0,1,2],
    [3,4,5],
    [6,7,8],
    [0,3,6],
    [1,4,7],
    [2,5,8],
    [0,4,8],
    [2,4,6],
  ]

  // X fängt immer an 

  const player1 = Player("aco", "X");
  const player2 = Player("jelena", "O");
  let round = 0;


  const playRound = (index_of_sign) =>{
    // Change the board and update it
    gameBoard.changeBoard(getCurrentPlayer().getSign(), index_of_sign);
    // check if a winner is on the board
    checkifWinner();
    // Add a round
    round++
  }

  // get the current player depening on the round that is being played
  const getCurrentPlayer = () => {
    current = round % 2 === 0 ? player1 : player2;
    return current
  }


  const changeRound = (num) => round = num; 

  const checkifWinner = () => {
    // smarter Way
    // check if 3 in a row
    // get the indexes of the symbols in a array on the board
    let x_array = gameBoard.returnBoard()[0]
    let o_array = gameBoard.returnBoard()[1]

    // for every winning combination check if it matches the X array and the O array, if match is bigger than 3 we have a winner
    for(let i = 0; i < w_combinations.length; i++){
      let difference_x = x_array.filter(element => w_combinations[i].includes(element))
      let difference_o = o_array.filter(element => w_combinations[i].includes(element))
      if (difference_x.length === 3){
        declareWinner(getCurrentPlayer())
      }else if (difference_o.length ===3){
        declareWinner(getCurrentPlayer())
      }
    }
    if (round === 8){
      declareWinner("Tie")
    }

  }

  const declareWinner = (x) =>{
    x === "Tie" ?  console.log(x) : console.log(x.getName()) 
  }

  return {playRound, getCurrentPlayer, changeRound}

})();
