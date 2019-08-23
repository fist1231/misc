console.log('ex8');

const ex8 = () => {

	class Ex8Error extends Error {}

	console.log('Nothing to do, code complete');
	try {
		throw new Ex8Error("This is a mistake");
	} catch(e) {
		if(e instanceof Ex8Error) {
			console.log(`The error: ${e}`);
		} else {
			throw e;
		}
	} finally {
		console.log('Cleanup');
	}

}

ex8();