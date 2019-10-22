import Future from 'future';

console.log('mod-wrk');

const asyncProm = () => {

	console.log('===================== 1');

	setTimeout(() => console.log('Done with 5 seconds wait.'), 5000);

	console.log('===================== 2');

	const delay = () => {
		sleep(3000);
		console.log('After very well sleep promise');
	}


	const veryWell = x => {
		const prom = new Promise(function(resolve, reject) {
			delay();
			resolve(x);
		});
		return prom;
	}

	console.log('===================== 3');


	console.log('===================== 4');


	setTimeout(() => {
		let pr = veryWell(77);
//		pr.then(x=>console.log(`Final result is: ${x}`));
	}, 100);

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

// asyncProm();


const asyncCb = () => {

	console.log('===================== 1');
	let i=0;
	setInterval(() => console.log(`Interval: ${i++}`), 500 ) ;

	console.log('===================== 2');

	const delay = () => {
		sleep(3000);
		console.log('After very well sleep promise');
	}


	const veryWell = (x, cb) => {
		setTimeout(() => {
			delay();
			x*=10;
			cb(x);
		}, 100);
	}

	console.log('===================== 3');


	console.log('===================== 4');


	let pr = veryWell(77, (data, error) => {console.log(`Data is: ${data}`)});

	console.log('===================== 5');

	// promise.then(x => console.log(`Got promise for: ${x}`));

	// veryWell(11).then(x => console.log(`Got veryWell(11): ${x}`));


	// prom2.then(x => console.log(`Got prom2: ${x}`));

	console.log('===================== 6');


	console.log('===================== 7');

}

// asyncCb();

const tst = () => {

	const abc = (n, message, cb) => {
		let rez = 0;
		setTimeout(() => {
			console.log('start');
			sleep(n);
			console.log('done');
			rez = n;
			// cb(`Inner cb: ${message} and ${rez}`);
			cb(`${message} and ${rez}`);
		}, 100);
	}


	const abcProm = (n, message) => {

		const prom = new Promise(function(resolve, reject) {
			setTimeout(() => {
				console.log('begin');
				sleep(n);
				console.log('end');
				resolve(message);
			}, 100);
		});
		return prom;

	}


console.log('===> Befo');

 // setTimeout(() => {
console.log('===> 1');
	// abc(3000, 'wth1', x => console.log(x));
	abcProm(3000, 'wth1-Prom');//.then(x => console.log(`Finito-1: ${x}`));
console.log('===> 2');
console.log('===> 3');
console.log('===> 4');
console.log('===> 5');
	// abc(2000, 'wth2', x => console.log(x));
 // }, 10);



	// abcProm(3000, 'wth1-Prom');
	// abcProm(2000, 'wth2-Prom');


	// abcProm(3000, 'wth1-Prom').then(x => console.log(`Finito-1: ${x}`));
	// abcProm(2000, 'wth2-Prom').then(x => console.log(`Finito-2: ${x}`));

console.log('===> Afto');


}

tst();

function sleep(delay) {
    var start = new Date().getTime();
    while (new Date().getTime() < start + delay);
}
