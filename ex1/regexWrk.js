console.log('regex-wrk');

const regexWrk = () => {

/*
	const regex1 = new RegExp("abc");
	const regex2 = /def/;

	console.log(regex1.test("qwerty abcdewqty"));
	console.log(regex1.test("qwerty acdewqty"));

	console.log(regex2.test("qwerty defdewqty"));
	console.log(regex2.test("qwerty edcdewqty"));
*/


	const golf = () => {

		verify(/ca[tr]/,
		       ["my car", "bad cats"],
		       ["camper", "high art"]);

		verify(/pr?op/,
		       ["pop culture", "mad props"],
		       ["plop", "prrrop"]);

		verify(/ferr(et|y|ari)/,
		       ["ferret", "ferry", "ferrari"],
		       ["ferrum", "transfer A"]);

		verify(/ious\b/,
		       ["how delicious", "spacious room"],
		       ["ruinous", "consciousness"]);

		verify(/\s[.,:;]/,
		       ["bad punctuation ."],
		       ["escape the period"]);

		verify(/\w{7}/,
		       ["hottentottententen"],
		       ["no", "hotten totten tenten"]);

		verify(/\b[^\We]+\b/i,
		       ["red platypus", "wobbling nest"],
		       ["earth bed", "learning ape", "BEET"]);


		function verify(regexp, yes, no) {
		  // Ignore unfinished exercises
		  if (regexp.source == "...") return;
		  for (let str of yes) if (!regexp.test(str)) {
		    console.log(`Failure to match '${str}'`);
		  } else {
			console.log(`-----> 1: ${regexp.test(str)}`);
		  }
		  for (let str of no) if (regexp.test(str)) {
		    console.log(`Unexpected match for '${str}'`);
		  } else {
			console.log(`-----> 2: ${regexp.test(str)}`);
		  }
		}

	}

	// golf();

	const quot = () => {

		let text = "'I'm the cook,' he said, 'it's my job.'";
		// Change this call.
		console.log(text.replace(/(^|\W)'|'(\W|$)/g, "$1\"$2"));
		// → "I'm the cook," he said, "it's my job."

	}

	// quot();

	const numbrez = () => {

		let number = /^[+\-]?(\d+(\.\d*)?|\.\d+)([eE][+\-]?\d+)?$/;

		// Tests:
		for (let str of ["1", "-1", "+15", "1.55", ".5", "5.",
		                 "1.3e2", "1E-4", "1e+12"]) {
		  if (!number.test(str)) {
		    console.log(`Failed to match '${str}'`);
		  }
		}
		for (let str of ["1a", "+-1", "1.2.3", "1+1", "1e4.5",
		                 ".5.", "1f5", "."]) {
		  if (number.test(str)) {
		    console.log(`Incorrectly accepted '${str}'`);
		  }
		}

	}

	numbrez();


}

regexWrk();