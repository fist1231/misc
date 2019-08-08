import { sum, range } from 'mathjs'

console.log(`wtf have i done?`);
console.log(sum(range(0, 100)));

let meRange = range(0, 101);

let list = [];
let result = [];

meRange.map(x => list.push(x));

list.map(x => {
	if(x%3==0 & x%5>0) {
		result.push('Fizz');
	} else if(x%5==0 & x%3>0) {
		result.push('Buzz');
	} else if (x%3==0 & x%5==0) {
		result.push('FizzBuzz');
	} else {
		result.push(x);
	}
});

console.log(result.toString());

// list.filter(x=>x%3==0).map(console.log('Fizz'));
//map(x => console.log(x*10));
