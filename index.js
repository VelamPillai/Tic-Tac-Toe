const prompt = require("prompt-sync")();

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
                   Game starts by just enter the position(from 1 to 9) as a Input 

                                  First Player starts as Player X
                                              And
                                  Second Player as Player O
                               `);
};

// Winning message for the game
const winningMessage = (player) =>
  (player === "X" || player === "O")
    ? console.log(`                     Player - ${player} Won!!!!\n`)
    : console.log(`                     Match Tie!!!!\n`);

// validate input - position should be any number between 1 and 9 and return the same number ,if not it should return the error message

const validateInput = (num) =>
  num.length === 1 && /[\d]/.test(num)
    ? num
    : (console.log("please enter valid position value"),
      (inputPos = validateInput(prompt("Enter Position(1-9) : "))));

// display

// Game Cell - Template
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
        `                  |             |               |               |`
      ),
      console.log(
        `                  | [${i + k + 0}]=        | [${
          i + k + 1
        }] =         | [${i + k + 2}] =         |`
      ),
      console.log(
        `                  |             |               |               |`
      ),
      console.log(
        `                  |_____________|_______________|_______________|`
      );
  }
};

//  class for Cell ---> template for cell . It has status and value

class CellValue {
  constructor(cellNo, cellValue) {
    this.cellNo = cellNo;
    this.cellValue = cellValue;
    this.cellFilledStatus = false;
  }
}

// class for CellArray
class CellArray {
  constructor() {
    this.cellArray = [];
  }

  // check the status of the cell ---> filled with user input or not

  checkCellFilledStatus = (val, pos, status) => {
    // !this.cellArray.length? this.fillCellValue(val, pos)      :
    this.cellArray.some((element) => element.cellNo === pos)
      ? (console.log("This Cell is already filled"),
        this.checkCellFilledStatus(
          val,
          Number(validateInput(prompt("Enter Position(1-9) : "))),
          status
        ))
      : this.fillCellValue(val, pos, status);
  };

  // display the game template with values and without values
  displayGameCellWithValue = (cell) => {
    let k = 0;

    console.log(
      `                   _____________________________________________`
    );
    for (let i = 0; i < 3; i++, k += 2) {
      /* console.log(
            `                  |             |               |               |`
          ),*/
      console.log(
        `                  |             |               |               |`
      ),
        console.log(
          `                  |      ${cell[i + k + 0].cellValue}      |       ${
            cell[i + k + 1].cellValue
          }       |        ${cell[i + k + 2].cellValue}      |`
        ),
        /* console.log(
            `                  |             |               |               |`
          ),*/
        console.log(
          `                  |_____________|_______________|_______________|`
        );
    }
    console.log("\n");
  };

  // filling value of the cell
  fillCellValue = (val, pos, status) => {
    const cell = new CellValue();
    cell.cellNo = pos;
    cell.cellValue = val;
    cell.cellFilledStatus = status;
    //this.cellArray.length >= 9 ? (this.cellArray.unshift(cell),this.cellArray.pop()) : this.cellArray.push(cell)  ;
    this.cellArray.length >= 9
      ? this.cellArray.splice(pos - 1, 1, cell)
      : this.cellArray.push(cell);

    console.clear();
  };

  // check the value of the winning combination cells++++++++++++++++++++no need
  /* checkCellValue = (winningCombination, cell) =>
    cell
      .filter((item) => winningCombination.includes(item.cellNo))
      .every((element) => element.cellValue === cellValue); */

  // find the winner
  findTheWinner = (cell) => {
    let result;
  // to find the winning combination matched with user-input combination
    let matchedWinning = winningCombination.filter((item) =>
      item.every((element) =>
        cell.map((item1) => item1.cellNo).includes(element)
      )
    );


    // to find the cell values are same 
     
   return   matchedWinning.some(element =>
  cell
    .filter(item => element.includes(item.cellNo))
    .every( element => element.cellValue === "X")) || matchedWinning.some(element =>
      cell
        .filter(item => element.includes(item.cellNo))
        .every( element => element.cellValue === "O")) 

          
     
        }
}

// creating instance of cellArray ---> It is a array holding cell instances
const cell = new CellArray();

// getting in put from players . 9 times inputs are given. Odd chances are for player X and all even chances are for player O
const getInputCellPosition = function () {
  let playerX = true;
  let playerO = false;
  let inputPos = "";  
  let inputArr = [];
  for (let i = 1; i <= 9; i++) {
    inputPos = validateInput(prompt("Enter Position(1-9) : "));

    i % 2
      ? cell.checkCellFilledStatus("X", Number(inputPos), true)
      : cell.checkCellFilledStatus("O", Number(inputPos), true);
      introMessage();
    cell.displayGameCellWithValue(cell.cellArray);

    // when i = 5 ---> check for the winner
    if (i >= 5) {
      let result=cell.findTheWinner(cell.cellArray);      
      if ( result ) {
        i%2 ? winningMessage('X'): winningMessage('O')
        break;
      }
      if(!result && i===9){        
        winningMessage();
        break;
      }
      
    }
  }

  
};


//  fill the cellArray with cellValue of cellValue=' ',cellPosition = 0 , status = false
//for (let i = 0; i < 9; i++) cell.fillCellValue(" ", 0, false);
for (let i = 0; i < 9; i++) cell.fillCellValue(" ", 0, false);

introMessage();
cell.displayGameCellWithValue(cell.cellArray);

// getting input from the user .after getting each Input display cell.

getInputCellPosition();

//displayGameCellWithValue();

cell.findTheWinner(cell.cellArray);
