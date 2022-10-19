// Getting user Input through terminal
const prompt = require("prompt-sync")();
console.clear();

// variable declaration
let player;
let player1;
let player2;
let char;

//  constant variable for Winning combination
const winningCombination = [
  [1, 2, 3],
  [4, 5, 6],
  [7, 8, 9],
  [1, 4, 7],
  [2, 5, 8],
  [3, 6, 9],
  [1, 5, 9],
  [3, 5, 7],
];

// Introduction message for the Game
const introMessage = () => {
  console.log(`   
                                         Tic-Tac-Toe   
                                                              
                   Game starts by just enter the position(from 1 to 9) as a Input 

                                  First Player starts as Player 1
                                              And
                                  Second Player as Player 2
                               `);
};
let intId;

const anim = function () {
  const p = "Restart!!!";
  let index = 0;

  return (intId = setInterval(function () {
    console.log("                                     " + p.split("")[index++]); //to display restart mess vertically
    index === p.length - 1 && //to repeat the message
      (console.clear(),
      introMessage(),
      gameCell(),
      console.log(`\n                           Play again press 'y'\n `),
      (index = 0));

    //index = index % (p.length - 1);
  }, 250));
};

const a = anim;

// Winning message for the game
const winningMessage = (...player) =>
  player[0] === player1 || player[0] === player2
    ? console.log(
        `                            ${player[1]}-(${player[0]}) Won!!!!\n ` //player[1]->player-number , player[0]->player-symbol
      )
    : console.log(`                     Match Tie!!!!\n`);

// validate input - position should be any number between 1 and 9 and return the same number ,if not it should return the error message
const validateInput = (num) =>
  num.length === 1 && /[\d]/.test(num)
    ? num
    : (console.log("please enter valid position value"),
      (inputPos = validateInput(prompt("Enter Position(1-9) : "))));

// display

// Game Cell - Template-introduction
const gameCell = function () {
  let k = 0;

  console.log(
    `                   _____________________________________________`
  );
  for (let i = 1; i <= 3; i++, k += 2) {
    console.log(
      `                  |             |               |               |`
    ),
      console.log(
        `                  | [${i + k + 0}]=        | [${
          i + k + 1
        }] =         | [${i + k + 2}] =         |`
      ),
      console.log(
        `                  |_____________|_______________|_______________|`
      );
  }
  console.log("\n");
};

//  class for Cell ---> template for cell . It has status and value
class CellValue {
  constructor(cellNo, cellValue) {
    this.cellNo = cellNo;
    this.cellValue = cellValue;
  }
}

// class for CellArray ---> array to store filled cell
class CellArray {
  constructor() {
    this.cellArray = [];
  }

  // check the status of the cell ---> filled with user input or not
  checkCellFilledStatus = (val, pos) => {
    // check wether the cell is filled with User input or not(it is repeating the process till valid input is given)
    this.cellArray.some((element) => element.cellNo === pos)
      ? (console.log("This Cell is already filled"),
        this.checkCellFilledStatus(
          val,
          Number(validateInput(prompt("Enter Position(1-9) : ")))
        ))
      : this.fillCellValue(val, pos);
  };

  // display the game template with user input values
  displayGameCellWithValue = (cell) => {
    let k = 0;
    console.log(
      `                   _____________________________________________`
    );
    for (let i = 0; i < 3; i++, k += 2) {
      console.log(
        `                  |             |               |               |`
      ),
        console.log(
          `                  |      ${cell[i + k + 0].cellValue}      |       ${
            cell[i + k + 1].cellValue
          }       |        ${cell[i + k + 2].cellValue}      |`
        ),
        console.log(
          `                  |_____________|_______________|_______________|`
        );
    }
    console.log("\n");
  };

  // filling value of the cell ---> create cell instance to fill the value of cell
  fillCellValue = (val, pos) => {
    const cell = new CellValue();
    cell.cellNo = pos;
    cell.cellValue = val;
    // splice ---> used to enter user input &&&&& push---> used to fill empty cell array
    this.cellArray.length >= 9
      ? this.cellArray.splice(pos - 1, 1, cell) //to create cell with user input
      : this.cellArray.push(cell); //to create cell with(' ' ,0)
    //  after each user input the cell template will display with all new values
    console.clear();
  };

  // find the winner
  findTheWinner = (cell) => {
    // to find the winning combination matched with user-input combination
    let matchedWinning = winningCombination.filter(
      (
        item //filter method return matched winning combination
      ) =>
        item.every((element) =>
          cell.map((item1) => item1.cellNo).includes(element)
        )
    );

    // to find the cell values are same
    return (
      matchedWinning.some((element) =>
        cell
          .filter((item) => element.includes(item.cellNo))
          .every((element) => element.cellValue === player1)
      ) ||
      matchedWinning.some((element) =>
        cell
          .filter((item) => element.includes(item.cellNo))
          .every((element) => element.cellValue === player2)
      )
    );
  };
}
function start() {
  // creating instance of cellArray ---> It is a array holding cell instances
  const cell = new CellArray();

  // getting input from players . 9 times inputs are given. Odd chances are for player X and all even chances are for player O
  const getInputCellPosition = function () {
    let inputPos = ""; //variable to store position
    let inputArr = []; //variable to store array of cell-values
    for (let i = 1; i <= 9; i++) {
      i % 2 //odd turn for player1 and even turn for player2
        ? (inputPos = validateInput(
            prompt(`Enter Position(1-9) for Player-1 (${player1}): `)
          ))
        : (inputPos = validateInput(
            prompt(`Enter Position(1-9) for  Player-2 (${player2}): `)
          ));

      i % 2 //odd turn for player1 and even turn for player2
        ? cell.checkCellFilledStatus(player1, Number(inputPos))
        : cell.checkCellFilledStatus(player2, Number(inputPos));

      introMessage();
      cell.displayGameCellWithValue(cell.cellArray); //after each input update game-layout

      // when i = 5 ---> check for the winner
      if (i >= 5) {
        let result = cell.findTheWinner(cell.cellArray); // winner (O / X) or Match Tie
        if (result) {
          i % 2
            ? winningMessage(player1, "Player-1")
            : winningMessage(player2, "Player-2");
          break;
        } // if match is tie --> checkCellFilledStatus-result = false and no-of-turn=9 ----> call winningMessage function with no parameter
        if (!result && i === 9) {
          winningMessage();
          break;
        }
      }
    }
  };

  //  fill the cellArray with cellValue of cellValue=' ',cellPosition = 0 , status = false
  for (let i = 0; i < 9; i++) cell.fillCellValue(" ", 0);
  //cell.displayGameCellWithValue(cell.cellArray); //display empty cell

  // ********into message for the game
  introMessage();

  //**********introduction for the Cell layout
  gameCell();

  // **********Choosing player symbol
  let playerSymbol = () => {
    player = prompt("\nChoose the symbol for player1 ( O / X ):").toUpperCase();
    let p =
      player === "O" || player === "X"
        ? player
        : (console.log("\nWrong Symbol!!! only from ->w O / X \n"),
          playerSymbol());
    return p;
  };
  /* let player1 =prompt(
  "\nChoose the symbol for player1 ( O / X ):"
  ).toUpperCase(); */
  player1 = playerSymbol();
  player2 = player1 === "X" ? "O" : "X";
  console.log(`\n                                   Player - 1 : ${player1}\n
                                   Player - 2 : ${player2}\n
`);

  //********getting input from the user .validate-input(only numbers) and check-cell-Filled-status, After getting each Input - update & display cell with user Input.
  getInputCellPosition();

  let clear = setTimeout(a, 3000); // to display winner message for 5s ,then call Restart Animation

  setTimeout(function () {
    clearInterval(intId);
    char = prompt(`Do you want to play again press 'y' `).toUpperCase();
    char === "Y" && start(); // pressed key is y -> restart the game
  }, 10000); //after 10 s - ask for restart
}

start();
