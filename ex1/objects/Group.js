class Group {
	constructor() {
		this.values = [];
		console.log(`Constructing empty Group: ${this.values}`);
	}

	add(value) {
		if (!this.values.includes(value)) {
			console.log(`Adding ${value} to Group`);
			console.log(`Before: ${this.values}`);
			this.values.push(value);
			console.log(`After: ${this.values}`);
		} else {
			console.log(`Value ${value} already in the Group: ${this.values}`);
		}
	}

	delete(value) {
		if (this.values.includes(value)) {
			console.log(`Deleting ${value} from Group`);
			console.log(`Before: ${this.values}`);

			console.log(`Position of value: ${this.values.indexOf(value)}`);

			// delete this.values[`"${value}"`];
			this.values = this.values.slice(0, this.values.indexOf(value)).concat(this.values.slice(this.values.indexOf(value) + 1, this.values.length));
			console.log(`After: ${this.values}`);
		} else {
			console.log(`Value ${value} is not in the Group: ${this.values}`);
		}

	}

	has(value) {
		return this.values.includes(value);
	}

	static from(x) {

		const ret = new Group();
/*
		const xIterator = x[Symbol.iterator]();
		for(let val = xIterator.next(); val.done !== true; val = xIterator.next()) {
		// let proceed = true;
		// for(let it = xIterator; proceed; ) {
		// 	let val = it.next();
		// 	proceed = !val.done;
		// 	if(!proceed) {
		// 		break;
		// 	}
			ret.add(val.value);
			console.log(`Added ${val.value} to new Group: ${ret.values}`);
		}
*/		
		x.forEach(z => ret.add(z));
		return ret;

	}


	// [Symbol.iterator]() {
	// 	return (this.values)[Symbol.iterator]();
	// }

	[Symbol.iterator]() {
		class GIterate {
			constructor(values) {
				// this.value = values[0];
				this.members = values;
				this.idx = 0;
			}


			next() {
				if(this.idx >= this.members.length) {
					return {value: undefined, done: true};
				}
				let value = this.members[this.idx];
				let done = false;
				this.idx++;
				return {value, done};
			}
		}
		console.log(this.values);
		return new GIterate(this.values);
	}

	hasOwnProperty(value) {
		console.log(`Group own hasOwnProperty method: ${value}`);
	}

}

export default Group;