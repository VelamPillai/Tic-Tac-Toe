const prompt = require('prompt-sync')();


//  constant variable for Winning combination

const winningCombination =[
    [0,1,2],[3,4,5],[6,7,8],
    [0,3,6],[1,4,7],[2,5,8],
    [0,4,8],[2,4,6]
];

// Introduction message for the Game
const introMessage = ()=>{
    console.log(`             
                   Game starts by just enter the position(from 1 to 9) as a Input 

                                  First Player starts as Player X
                                              And
                                  Second Player as Player O
                               `)
}

// Winning message for the game
const winningMessage = player => player === 'X'||'O' ?console.log(`        Player${player} Won!!!!`):  console.log(`       Match Tie!!!!`); 


// Game Cell - Template
const gameCell = function(cell){
    let k = 0;
    
    console.log(`                   _____________________________________________`);
    for(let i = 1;i<=3;i++, k+=2 ){     
         
         console.log(`                  |             |               |               |`);
         console.log(`                  |             |               |               |`);
         console.log(`                  | [${i+k+0}]=        | [${i+k+1}] =         | [${i+k+2}] =         |`); 
         console.log(`                  |             |               |               |`);
         console.log(`                  |_____________|_______________|_______________|`);
     
         
    }
   
}

//  template for cell . It has status and value 

class CellValue{
    constructor(cellNo,cellValue){ 
        this.cellNo=cellNo;
        this.cellValue=cellValue;
        this.cellFilledStatus = false; 
        }
}

class CellArray {
    constructor()
    {  
       this.cellArray = []; 
    }
    
    fillCellValue = (val,pos) => {
        const cell = new CellValue(pos,val);
        cell.cellFilledStatus=true;
        this.cellArray.push(cell);
    }
}

const displayGameCellWithValue= ()=> cell.forEach(element => gameCell(element));
    
});
const cell = new CellArray();
const getInputCellPosition = function(){    
    let playerX = true;
    let playerO = false;    
    let inputPos ='';
    let gameStatus = ''
    let inputArr =[];
    for(let i=1;i<=9;i++){
        console.clear();
        inputPos = prompt('Enter Position(1-9) : ');
        i%2 ? cell.fillCellValue('X',inputPos):cell.fillCellValue('O',inputPos);  
        displayGameCellWithValue();   
    }
   

introMessage();
gameCell();
getInputCellPosition();

//displayGameCellWithValue();