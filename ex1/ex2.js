console.log('ex2');

const inspect = obj => {
	console.log(`${obj.constructor.name}.toString() = ${obj.toString()}`);
	console.log(obj.toString());

	console.log(`Prototype of ${obj.constructor.name} = ${Object.getPrototypeOf(obj)}`);
	console.log(Object.getPrototypeOf(obj));

}


let kozel = {
	type: "hz", 
	speak: (x, y) => { console.log(`Making sound ${x}, and then ${y}`); }
};
kozel.type = "redkiy";
//let makeSound = (x, y) => { console.log(`Making sound ${x}, and then ${y}`); };
//kozel.speak = makeSound;

console.log(`Kozel's type is: ${kozel.type}`);
kozel.speak('odin', 'dva');

let doubleSpeak = (x, y) => { console.log(`Kozel says: ${x}-${x}, and then kozel says: ${y}-${y}`); };
kozel.speak = doubleSpeak;
kozel.speak('tri', 'chetyre');

let result = 75*(1+0.03/12)**(12*30);
console.log(`Result = ${result}`);

let f1 = function(x) {
	console.log(`f1 returns ${x}`);
}

f1('atas');

function f2(y) {
	console.log(`f2 returns ${y}`);
	console.log(`Type is Kozel - ${this.type}`);
}

kozel.getType = f2;


kozel.getType('atas 2');

let f3 = z => console.log(`f3 returns ${z}`);

f3('atas 3');

function multiplier(factor) {
	// return function(number) {return number * factor};
	return number => number * factor;
}

let tenTimes = multiplier(10);
console.log(`Ten times = ${tenTimes(5)}`);

// let five = prompt('give me five: ');
// console.log(`${five} is given.`);

/*
const readline = require('readline').createInterface({
  input: process.stdin,
  output: process.stdout
})

readline.question(`What's your name? `, (name) => {
  console.log(`Hi ${name}!`)
  readline.close()
})
*/

inspect(kozel);

let megaKozel = Object.create(kozel);
inspect(megaKozel);

class Kozlishe {
	constructor(type) {
		this.type = type;
	}
	speak(x, y) {
		console.log(`Kozlishe tipa ${this.type} making sounds ${x}, and then ${y}`);
	}
}

let sym1 = Symbol('zaraza');
let sym2 = Symbol('zaraza');

Kozlishe.prototype[sym1] = 'vatetada';
Kozlishe.prototype[sym2] = 'vatetada2';

let uberOzels = new Kozlishe('Redchaishiy');
uberOzels.speak('Uno', 'Dos');



inspect(Kozlishe);
inspect(uberOzels);

console.log(Kozlishe);
console.log(uberOzels
	);

console.log(uberOzels[sym1]);
console.log(uberOzels[sym2]);

console.log(sym1.toString());
console.log(sym2.toString());
