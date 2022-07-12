const prompt = require("prompt-sync")();

//  constant variable for Winning combination

const winningCombination = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
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
  player === "X" || "O"
    ? console.log(`        Player${player} Won!!!!`)
    : console.log(`       Match Tie!!!!`);

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

//  template for cell . It has status and value

class CellValue {
  constructor(cellNo, cellValue) {
    this.cellNo = cellNo;
    this.cellValue = cellValue;
    this.cellFilledStatus = false;
  }
}

class CellArray {
  constructor() {
    this.cellArray = [];
  }

  checkCellFilledStatus = (val, pos ,status) => {
    // !this.cellArray.length? this.fillCellValue(val, pos)      :
    this.cellArray.some((element) => element.cellNo === pos)
      ? (console.log("This Cell is already filled"),
        this.checkCellFilledStatus(
          val,
          Number(validateInput(prompt("Enter Position(1-9) : "))),status
        ))
      : this.fillCellValue(val, pos ,status);
  };

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

  fillCellValue = (val, pos, status) => {
    const cell = new CellValue();
    cell.cellNo = pos;
    cell.cellValue = val;
    cell.cellFilledStatus = status;
    //this.cellArray.length >= 9 ? (this.cellArray.unshift(cell),this.cellArray.pop()) : this.cellArray.push(cell)  ;
    this.cellArray.length >= 9 ? this.cellArray.splice(pos-1,1,cell) : this.cellArray.push(cell)  ;
    
    console.clear();
    
  };
}

// creating instance of cellArray ---> It is a array holding cell instances
const cell = new CellArray();

// getting in put from players . 9 times inputs are given. Odd chances are for player X and all even chances are for player O
const getInputCellPosition = function () {
  let playerX = true;
  let playerO = false;
  let inputPos = "";
  let gameStatus = "";
  let inputArr = [];
  for (let i = 1; i <= 9; i++) {
    inputPos = validateInput(prompt("Enter Position(1-9) : "));

    i % 2
      ? cell.checkCellFilledStatus("X", Number(inputPos),true)
      : cell.checkCellFilledStatus("O", Number(inputPos),true);
    cell.displayGameCellWithValue(cell.cellArray);
  }
 // console.log(cell.cellArray);
};
//introMessage();
//gameCell();

//  fill the cellArray with cellValue of cellvalue=' ',cellPosition = 0 , status = false
for (let i = 0; i < 9; i++) cell.fillCellValue(" ", 0, false);

introMessage();cell.displayGameCellWithValue(cell.cellArray);

// getting input from the user .after getting each Input display cell.
getInputCellPosition();

//displayGameCellWithValue();
