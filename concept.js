
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