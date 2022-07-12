
console.log(/(?<!\d)\d(?!\d)/.test(1));
console.log(/(?<!\d)\d(?!\d)/.test(11));
console.log(/(?<!\d||\w)\d(?!\d||\w)/.test('1a'));
console.log(/(?<!\d)\d(?!\d)/.test('112'));
console.log(/(?<!\d)\d(?!\d)/.test('a1'));
console.log(/(?<!\d||\w)\d(?!\d||\w)/.test('aa1'));
console.log(/(?<!\d||\w)\d(?!\d||\w)/.test('.1'));
console.log(/(?<!\d||\w)\d(?!\d||\w)/.test('1+'));
console.log(/(?<!\d||\w)\d(?!\d||\w)/.test(111));

console.clear();
console.log([1,2,3,4,5].some(element => element === 8));

console.clear();
let result =
[
    [1, 2, 3],
    [4, 5, 6],
    [7, 8, 9],  
    [1, 4, 7],
    [2, 5, 8],
    [3, 6, 9],
    [1, 5, 9],
    [3, 5, 7],
  ].filter(item =>(item.every(element => 
    [1,2,0,4,5,3,0,0,9].map(item1=> item1).includes(element))));
    console.log(result)



    let matchedWinning = winningCombination.filter(item=> (item.every(element => 
        cell.map(item1=> item1.cellNo).includes(element)))) ;


        matchedWinning.some(element => cell.filter(item => element.includes(item.cellNo)).every( element => element.cellValue === 'X'))
        cell.filter(item => result.includes(item.cellNo)).every( element => element.cellValue === 'X')


        matchedWinning.some(element =>
        cell
          .filter(item => element.includes(item.cellNo))
          .every( element => element.cellValue === "X")) || matchedWinning.some(element =>
            cell
              .filter(item => element.includes(item.cellNo))
              .every( element => element.cellValue === "O"))