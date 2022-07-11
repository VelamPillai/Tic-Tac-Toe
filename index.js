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
                   Game starts by just enter the position(from 0 to 8) as a Input 

                                  First Player starts as Player X
                                              And
                                  Second Player as Player O
                               `)
}

const winningMessage = player => player === 'X'||'O' ?console.log(`        Player${player} Won!!!!`):  console.log(`       Match Tie!!!!`); 



const gameCell = function(){
    let k = 0;
    for(let i = 0;i<=2;i++, k+=2 ){     
         console.log('\n','      [',i+k+0,'] =     [', i+k+1,'] =     [',i+k+2,'] =  ','\n');           
    }
}

const getInputCellPosition = function(){
    let playerX = true;
    let playerO = false;
    let inputPos ='';
    let inputArr =[];
    for(let i=0;i<=9;i++){
        inputPos = prompt('Enter Position (')
        check 
    }
}

introMessage();
gameCell();