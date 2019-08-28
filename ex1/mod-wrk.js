import Future from 'future';

console.log('mod-wrk');

const modules = () => {

	console.log('===================== 1');

	setTimeout(() => console.log('Done with 5 seconds wait.'), 5000);

	console.log('===================== 2');

	const delay = (x) => {
		sleep(3000);
		console.log('After very well sleep promise');
		return x;
	}



	async function asyncDelay(x) {
		let result = await delay(x);
		return result;
	}



	const veryWell = x => {
		return new Promise(function(resolve, reject) {
			// let res = delay(x);
			let res = delay(x);
			resolve();
		});
	}

/*
	let prom2 = new Promise(function(resolve, reject) {
		sleep(3000);
		console.log('After very well sleep promise');
		resolve(29);
	});
*/
	console.log('===================== 3');

	let prom = new Promise(function(resolve, reject) {
	  // the function is executed automatically when the promise is constructed

	  // after 1 second signal that the job is done with the result "done"
	  // setTimeout(() => resolve(29), 3000);
	  // setTimeout(() => resolve(veryWell(29)), 10);
	  // resolve(veryWell(29).then(y => console.log(`Got y from who knows where: ${y}`)));

	  // veryWell(241);


	});

	console.log('===================== 4');

	// let prom = Promise.resolve(veryWell(29));
	// prom.then(x => console.log(`Got prom: ${x}`));

	veryWell(77);
	console.log('===================== 5');

	// promise.then(x => console.log(`Got promise for: ${x}`));

	// veryWell(11).then(x => console.log(`Got veryWell(11): ${x}`));


	// prom2.then(x => console.log(`Got prom2: ${x}`));

	console.log('===================== 6');

	function sleep(delay) {
	    var start = new Date().getTime();
	    while (new Date().getTime() < start + delay);
	}

	console.log('===================== 7');

}

// modules();

	const delay = (x) => {
		sleep(3000);
		console.log('After very well sleep promise');
		return x;
	}


	function sleep(delay) {
	    var start = new Date().getTime();
	    while (new Date().getTime() < start + delay);
	}



	console.log('===================== 11');


	const veryWell = x => {
		return new Promise(function(resolve, reject) {
			// let res = delay(x);
			let res = delay(x);
			resolve(res);
		});
	}



	console.log('===================== 12');

	Promise.resolve(veryWell(33)).then(x => console.log(`Got future: ${x}`));

	console.log('===================== 13');


	console.log('===================== 14');

	console.log('===================== 15');
