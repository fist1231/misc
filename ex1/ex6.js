import Vec from './objects/Vec.js';
import Group from './objects/Group.js';
import { abs, sum, range } from 'mathjs'
import SCRIPTS from './objects/scripts';
import {characterScript, textScripts, countBy} from './objects/higherOrder';



let a1 = () => {
	console.log('ex6');

	let vector1 = new Vec(4, 4);
	let vector2 = new Vec(10, 10);

	const vectorPlus = vector1.plus(vector2);
	const vectorMinus = vector1.minus(vector2);

	console.log(`vectorPlus = Vec(${vectorPlus.x}, ${vectorPlus.y})`);
	console.log(`vectorMinus = Vec(${vectorMinus.x}, ${vectorMinus.y})`);

	console.log(`vector1.length = ${vector1.length}`);
	console.log(`vector2.length = ${vector2.length}`);
	console.log(`vectorPlus.length = ${vectorPlus.length}`);
	console.log(`vectorMinus.length = ${vectorMinus.length}`);
}

// a1();

let a6 = () => {
	const g1 = new Group();
	g1.add('one');
	g1.add('two');
	g1.add('three');
	g1.add('one');

	g1.delete('one');
	g1.delete('eleven');
	g1.delete('one');
	g1.delete('one');

	const fromG = Group.from(['uno', 'duo', 'duo', 'tre']);
	console.log(fromG);


	console.log('----------------------------');
	let gIter = fromG[Symbol.iterator]();
	console.log(gIter.next());
	// fromG.delete('duo');
	console.log(gIter.next());
	fromG.add('sinco');
	console.log(gIter.next());
	console.log(gIter.next());
	console.log(gIter.next());
	console.log(gIter.next());

	console.log('----------------------------');
	console.log(g1);
	console.log(Object.keys(g1));
	console.log(Object.getPrototypeOf(g1));
	// console.log(fromG.prototype);
	console.log(Group.prototype);
	console.log(Group.prototype.constructor);
	// console.log(fromG.prototype.hasOwnProperty('values'));
	console.log(Object.getPrototypeOf(Group).hasOwnProperty('values'));
	// console.log(Group.prototype.hasOwnProperty('values'));
	console.log(Object.getPrototypeOf(g1).hasOwnProperty('values'));
	// console.log(Object.getPrototypeOf(fromG).hasOwnProperty('quatro'));
	console.log(g1.hasOwnProperty('quatro'));

}

//a6();

let a3 = () => {

	for(let i=1; i<=7; i++) {
		console.log("#".repeat(i));
	}



	const construct = f => { 

		let s1 = " ";
		let s2 = "#";
		let last = "#";
		let ret = "";

		for(let i=1; i<=f*f; i++) {

			if(last == s1) {
				last = s2;
				ret = ret + last;
				if(i%f == 0) {
					ret = ret + "\n";
					last = s1;
				}
			} else {
				last = s1;
				ret = ret + last;
				if(i%f == 0) {
					ret = ret + "\n";
					last = s2;
				}
			}
		}

		return ret;
	}

	console.log(construct(10))

}

// a3();

const a4 = () => {

	let myMin = (...numbers) => {

		let result = Infinity;
		for(let num of numbers) {
			if(num < result) {
				result = num;
			}
		}
		return result;
	}

	console.log(`Min of 7, 11, -5, 2 and 3 is: ${myMin(7, 11, -5, 2, 3)}`);


	function isEven(num) {
		num = abs(num);
		if(num == 0) {
			return true;
		} else if(num == 1) {
			return false;
		} else {
			return isEven(num - 2);
		}
	} 

	console.log(`Number 50 is even: ${isEven(50)}`);
	console.log(`Number 75 is even: ${isEven(75)}`);
	console.log(`Number -1 is even: ${isEven(-1)}`);



	const countChar = (str, char) => {
		let result = 0;
		for(let i=0; i < str.length; i++) {
			if(str[i] == char) {
				result++;
			}
		}
		return result;
	}

	const countBs = (str, char) => {
		return countChar(str, char);
	}

	const input = "barnabb is better than the best of the best of the best among the bees";
	const char = 'b';
	console.log(`String ${input} ${char}'s count is: ${countBs(input, char)}`);

}

//a4();

const a5 = () => {

	const flattenArr = (arr) => {
		return arr.reduce( ((accum,currVal,idx,arra) => {
			// console.log(`accum=${accum}`);
			// console.log(`currVal=${currVal}`);
			// console.log(`idx=${idx}`);
			// console.log(`arra=${arra}`);
			return accum.concat(currVal);
		}) );
		// return accum;
	}

	const arr = [
		[1,2,3,4,5],
		[11,12,13,14,15],
		[21,22,23,24,25],
		[31,32,33,34,35]
	];

	const res = flattenArr(arr);
	console.log(res);

	const loop = (value, testFunc, updateFunc, bodyFunc) => {


		while(true) {
			if(!testFunc(value)) {
				break;
			}
			bodyFunc(value);
			value = updateFunc(value);
		}


		// console.log(`inside loop, value=${value}`);
		// 	for(let i = value; testFunc(i); i = updateFunc(i)) {
		// 		console.log(`inside loop for i=${i}`);
		// 		bodyFunc(value);
		// 	};
	}

	const rez = loop(10, x=>x<=100, x=>x+=10,  x=>console.log(`value=${x}`));

	loop(3, n => n > 0, n => n - 1, console.log);

	const every = (arr, predicateFunc) => {

		for(let i=0; i<arr.length; i++) {
			if(!predicateFunc(arr[i])) {
				return false;
			}
		}

		return true;

	}

	const everyWithSome = (arr, predicateFunc) => {
		return !arr.some(x=>!predicateFunc(x));
	}


	const myArr = [1,3,5,7,9,11,99, 21];
	const isOdd = x=>{return (x%2 != 0)};
	const res2 = every(myArr, isOdd);
	console.log(`Array ${myArr} every is odd: ${res2}`);

	const res3 = everyWithSome(myArr, isOdd);
	console.log(`Array ${myArr} everyWithSome is odd: ${res3}`);

	console.log(every([1, 3, 5], n => n < 10));
	// → true
	console.log(every([2, 4, 16], n => n < 10));
	// → false
	console.log(every([], n => n < 10));
	// true


	function dominantDirection(text) {
		console.log(characterScript(text));
		console.log(textScripts(text));
	  let scripts = countBy(text, char => {
	    let script = characterScript(char.codePointAt(0));
	    return script ? script.direction : "none-direction";
	  }).filter(({name}) => name != "none-direction");

	  let result = "hz";
	  let count = 0;
	  for(let scrpt of scripts) {
	  	if(scrpt.count > count) {
	  		result = scrpt.name;
	  	}
	  }
	  console.log(scripts);

		return result;
	  // Your code here.
	}

	console.log(dominantDirection("Hello!"));
	// → ltr
	console.log(dominantDirection("Hey, مساء الخير"));
	// → rtl


}

// a5();


