
const mysubmit = (e) => {
  e.preventDefault();
  return false;
}

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
    const reset_button = document.getElementById("r_button");
    const new_game_btt = document.getElementById("newg_btt");
    const gameground = document.querySelector(".gameground");
    const winnerwindow = document.querySelector(".winnerwindow");
    const startscreen = document.querySelector(".startscreen");
    


    const loadScreen = () => {
      startscreen.classList.add("hidden");
      gameground.classList.remove("hidden");
      updatePlayerText();
      new_game_btt.addEventListener("click", () => new_game());
    };

    // // if dom loaded change player text
    // document.addEventListener("DOMContentLoaded", () => {
    //   updatePlayerText();
    //   new_game_btt.addEventListener("click", () => new_game());
    // })

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

    const winnerText = (winner) =>{
      gameground.classList.add("hidden")
      winnerwindow.classList.remove("hidden")
      let winner_text = winner == "Tie" ?  "It´s a Tie, nobody wins !" : `${winner} is the winner !`
      document.getElementById("winner text").innerHTML = `${winner_text}`;
    };

    const new_game = () =>{
      gameBoard.resetBoard()
      gameControl.changeRound(0)
      winnerwindow.classList.add("hidden")
      gameground.classList.remove("hidden")

    }

    return{updateBoard, winnerText, loadScreen}

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

  let player1 = "";
  let player2 = "";
  let round = 0;

  const create_player = (n1, n2) => {
    player1 = Player(n1, "X");
    player2 = Player(n2, "O");
  }



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
    // check if 3 in a row
    // get the indexes of the symbols in a array on the board
    let x_array = gameBoard.returnBoard()[0]
    let o_array = gameBoard.returnBoard()[1]

    // for every winning combination check if it matches the X array and the O array, if match is bigger than 3 we have a winner
    for(let i = 0; i < w_combinations.length; i++){
      let difference_x = x_array.filter(element => w_combinations[i].includes(element))
      let difference_o = o_array.filter(element => w_combinations[i].includes(element))
      if (difference_x.length === 3){
        declareWinner(getCurrentPlayer().getName())
      }else if (difference_o.length === 3){
        declareWinner(getCurrentPlayer().getName())
      }
    }
    if (round === 8){
      declareWinner("Tie")
    }

  }

  // call the function to change the text
  const declareWinner = (player) =>{
    displayControl.winnerText(player);
  }

  return {playRound, getCurrentPlayer, changeRound, create_player}

})();


const Load_data = (()=>{

  let player1_name = document.getElementById("p1");
  let player2_name = document.getElementById("p2");
  const start_btt = document.getElementById("st_btt");
  const err_txt = document.getElementById("err_txt")

  start_btt.addEventListener("click", () =>{
    checkIfEmpty() ? startGame(player1_name.value, player2_name.value) : printError()
    
  })

  

  const startGame = (n1, n2) => {
    gameControl.create_player(n1, n2)
    displayControl.loadScreen()
  }

  const checkIfEmpty = () =>{
    if (player1_name.value.length > 3 || player2_name.value > 3){
      return true;
    }
    return false;
  }
  
  const printError = () => 
    err_txt.innerHTML = "Please put in names for the players"

})();