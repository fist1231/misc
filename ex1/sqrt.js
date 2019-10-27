console.log('sqrt');

const main = () => {
	const val = 19732007;
	const pres = 0.0001;
	const result = sqrc(val, pres);
	console.log(`sqrt(${val}) = ${result.test}; iterations: ${result.count}`);
}

const sqrc = (val, pres) => {
	let result = undefined;
	let low = 1;
	let high = val; 
	const count = 0;
	result = checkMid(val, pres, low, high, count);
	return result;
}

const checkMid = (val, pres, low, high, count) => {
	count++;
	let test = low + (high-low)/2;
	// console.log(`low=${low}; high=${high}; test=${test}; x*x=${test*test}; count=${count}`);
    if(test*test <= val+pres && test*test >= val-pres) {
    	return {test, count};
    } else {
    	if(test*test > val) {
    		high = test;
    	} else {
    		low = test;
    	}
   		return checkMid(val, pres, low, high, count);
     }
}

main();