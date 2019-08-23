console.log('bnr');

const bnr = () => {

	class MultiplicationErrorOne extends Error {}

	const primitiveMultiply = (a, b) => {
		if(Math.random() < 0.2) {
			return a * b;
		} else {
			throw new MultiplicationErrorOne("Error during multiplication");
		}
	}

	const reliableMultiply = (x, y) => {
		
		for(;;) {
			try {
				const res = primitiveMultiply(x, y);
				return res;
			} catch (e) {
				if(e instanceof MultiplicationErrorOne) {
					console.log(`Multiplication error: ${e}`);
				} else {
					// throw new Error(e);
					throw e;
				}
			}
		}
	}

	// const mult = reliableMultiply(8, 8);
	// console.log(`reliableMuliply = ${mult}`);



	const box = {
	  locked: true,
	  unlock() { this.locked = false; },
	  lock() { this.locked = true;  },
	  _content: [],
	  get content() {
	    if (this.locked) throw new Error("Locked!");
	    return this._content;
	  }
	};

	function withBoxUnlocked(body) {
	  // Your code here.
	  let wasLocked = false;
	  try {
	  	if(box.locked) {
		  	box.unlock();
		  	wasLocked = true;
	  	}
	  	body();

	  } catch(e) {
	  	console.log(`Error in the box: ${e}`);
	  } finally {
	  	if(wasLocked) {
	  		box.lock();
	  	}
	  }

	}

	withBoxUnlocked(function() {
	  box.content.push("gold piece");
	});

	try {
	  withBoxUnlocked(function() {
	    throw new Error("Pirates on the horizon! Abort!");
	  });
	} catch (e) {
	  console.log("Error raised: " + e);
	}

	console.log(`Is box stil locked: ${box.locked}`);
	// → true

	console.log(`Box real content: ${box._content}`);
	// console.log(`Box getContent: ${box.content()}`);

	box.unlock();
	withBoxUnlocked(function() {
	  box.content.push("another gold piece");
	});

	console.log(`Is box stil locked: ${box.locked}`);
	// → true

	console.log(`Box real content: ${box._content}`);


}

bnr();

function Person(name) {
	// "use strict";
	this.name = name;
}

let shmo = new Person('shmo');
try {
	console.log(name);
} catch(e) {
	console.log(`Error caught e: ${e}`);
}
// console.log(`jo is ${shmo.name}`);

// let jo = Person('Jo');
// console.log(name);
// console.log(`jo is ${jo.name}`);

