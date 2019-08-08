import { range, sum } from 'mathjs'
import Group from './ex6/Group'
import now from 'performance-now';
import SCRIPTS from './scripts';

console.log(`ex1 sum(1 to 10)=${sum(range(0,10))}`);

class Ex1 {
	constructor(message) {
		console.log(`Ex1 constructed with message: ${message}`);
		this.message = message;
	}

	// let setColor = x => {this.color = x};

	// let weight = function(weight) {
	// 	this.weight = weight;
	// }

	execute(msg) {
		console.log(`Ex1 executed with: ${msg}`);
	}
}


let Ex11 = {
	message: "default message",
	execute: function(msg) {
		console.log(`Ex11 executed with: ${msg}`);
	}
}


let ex = () => {

	Ex1.prototype.executeAnother = (x, y) => console.log(`Execute another with ${x} and with ${y}`);


	const ex = new Ex1('atas');
	ex.execute('shmara');
	console.log(`ex.message = ${ex.message}`);
	console.log(`ex.color = ${ex.color}`);

	// ex.executeAnother = (x, y) => console.log(`Execute another with ${x} and with ${y}`);
	ex.executeAnother('un', 'due');

	console.log(`Prototype of ex: ${Object.getPrototypeOf(ex)}`);
	console.log(Object.getPrototypeOf(ex));

	console.log(`Prototype of Ex1: ${Object.getPrototypeOf(Ex1)}`);
	console.log(Object.getPrototypeOf(Ex1));

	const ex2 = Object.create(Ex1);
	console.log(`Prototype of ex2: ${Object.getPrototypeOf(ex2)}`);
	console.log(Object.getPrototypeOf(ex2));

	const ex3 = Object.create(Ex11);
	ex3.executeAnother = (x, y) => console.log(`Execute another with ${x} and with ${y}`);


	console.log(`Prototype of ex3: ${Object.getPrototypeOf(ex3)}`);
	console.log(Object.getPrototypeOf(ex3));

	ex3.execute(`it's cometh`);
	ex3.executeAnother(`it's cometh`, 'your way');
	console.log(`ex3.message = ${ex3.message}`);
	ex3.message = "New norm";
	console.log(`ex3.message = ${ex3.message}`);

	console.log(`Prototype of Ex11: ${Object.getPrototypeOf(Ex11)}`);
	console.log(Object.getPrototypeOf(Ex11));
}

// ex();

let ex6 = () => {
	let gr = new Group();
	gr.add('one');
	gr.add('two');
	gr.add('three');
	gr.add('four');
	gr.add('one');
	console.log(gr.values);
	console.log(gr.has('one'));
	console.log(gr.has('eleven'));
	gr.delete('one');
	gr.delete('two');
	gr.delete('two');

	const newGr = Group.from(['uno', 'dos', 'trez', 'quatro']);
	console.log(newGr);
}

//ex6();

let ex4 = () => {

	function rangeWithStep(step) {

		return (start, end) => {
			const ret = [];
			for(let i=start; ((step>=0)?i<=end:i>=end); i=i+step) {
				ret.push(i);
			}
			return ret;
		}
	}

	// const sum = ([...nums]) => {
	const sum = (nums) => {
		let sum = 0;
		for(let num of nums) {
			// console.log(`num=${num}`);
			sum += num;
		}
		return sum;
	}

	const rng = rangeWithStep(2);
	console.log(rng(1, 10));

	const rng1 = rangeWithStep(-1);
	console.log(rng1(5, 2));

	const rng2 = rangeWithStep(1);
	const sm = sum(rng2(1, 10));
	console.log(sm);


	const reverseArray = arr => {
		const ret = [];
		while(arr.length > 0) {
			ret.push(arr.pop());
		}
		return ret;
	}

	const reverseArrayInPlace = arr => {
		for(let i=0; i<arr.length; i++) {
			let el = arr.pop();
			arr.splice(i, 0, el);
			// console.log(arr);
		}

		// const ret = [];
		// while(arr.length > 0) {
		// 	ret.push(arr.pop());
		// }
		// while(ret.length > 0) {
		// 	arr.push(ret.shift());
		// }


		return arr;
	}

	let t0 = now();
	console.log(reverseArray(rangeWithStep(1)(1, 10)));
	reverseArray(rangeWithStep(1)(1, 10000));
	let t1 = now();
	console.log(`reverseArray running time is: ${t1-t0} milliseconds`);

	t0 = now();
	console.log(reverseArrayInPlace(rangeWithStep(1)(1, 10)));
	reverseArrayInPlace(rangeWithStep(1)(1, 10000));
	t1 = now();
	console.log(`reverseArrayInPlace running time is: ${t1-t0} milliseconds`);


	function arrayToList(arr) {
		if(arr.length == 1) {
			return {value: arr.shift(), rest: null};
		} else {
			return {value: arr.shift(), rest: arrayToList(arr)};
		}
	}

		// let arr = [];
	function listToArray(lst) {
		const arr = [];
		while(true) {
			arr.push(lst.value);
			lst = lst.rest;
			if(lst.rest == null) {
				arr.push(lst.value);
				break;
			}
		}
		return arr;

		// let arr;
		// if(!arr) {
		// 	arr = [];
		// }
		// arr.push(lst.value);
		// console.log(arr);
		// if(lst.rest != null) {
		// 	return listToArray(lst.rest);
		// } else {
		// 	return arr;
		// }
	}

	function prepend(element, lst) {
		let arr = listToArray(lst);
		arr.unshift(element);
		return arrayToList(arr);
	}

	console.log(arrayToList([1,2,3]));
	console.log(listToArray(arrayToList([1,2,3,4,5])));

	let list = arrayToList([1,2,3,4,5,6,7]);
	console.log(list);
	console.log(prepend(11, list));


	let i = 0;
	function nth(lst, pos) {
			// console.log(`---> i=${i}, pos=${pos}`);
			if(i<pos && lst.rest == null) {
				return undefined;
			}
			i++;
			if((i-1)==pos) {
				return {value: lst.value, rest: lst.rest};
			} else {
				return nth(lst.rest, pos);
			}
	}

	console.log(nth(list, 7));

	function deepEqual(o1, o2) {
		if(typeof o1 != 'object' && o1 != null && typeof(o2) != 'object' && o2 != null) {
			console.log('---- 1: ' + o1);
			console.log('---- 1: ' + o2);
			if(o1 !== o2) {
				console.log('---- 1: o1 != o2');
				return false;
			}
		} else {
			if(Object.keys(o1).length != Object.keys(o2).length) {
				console.log('---- 2: ' + Object.keys(o1).length);
				console.log('---- 2: ' + Object.keys(o2).length);
				return false;
			}
			for(let x1 of Object.keys(o1)) {
				if(Object.keys(o2).includes(x1)) {
					console.log('---- 3: ' + x1);
					console.log('---- 3: ' + Object.keys(o2));
					console.log('---- 3: ' + o2[x1]);
					if (!deepEqual(o1[x1], o2[x1])) {
						return false;
					}
				} else {
					console.log('---- 4 ');

					return false;
				}
			}
		}
		return true;
	}

	let obj1 = {1: 'one', 2: 'two', 3: [1,2,3,14]};
	let obj2 = {1: 'one', 2: 'two', 3: [1,2,3,4]};
	console.log(deepEqual(obj1, obj2));

}

//ex4();

const misc = () => {

	function characterCount(script) {
		return script.ranges.reduce((count, [from, to], idx, arr) => {
			// console.log(`count=${count}, from-to=${[from,to]}, idx=${idx}, arr=${arr.length}`);
			return count + (to - from);
		}, 0);
	}

	console.log(SCRIPTS.reduce((a, b) => {
		console.log(a);
		console.log(b);
		return characterCount(a) < characterCount(b) ? b : a;
	}));
	// → {name: "Han", …}

}

misc();

