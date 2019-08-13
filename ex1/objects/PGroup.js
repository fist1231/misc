class PGroup {

	constructor(values) {
		this.values = values;
		console.log(`Constructing empty Group: ${this.values}`);
	}

	add(value) {
		if (!this.has(value)) {
			console.log(`Adding ${value} to new Group`);
			console.log(`Before: ${this.values}`);
			// this.values.push(value);
			const newPgroup = new PGroup(this.values.concat([value]));
			// newPgroup.values.push(value);
			console.log(`After: ${newPgroup.values}`);
			return newPgroup;
		} else {
			console.log(`Value ${value} already in the Group: ${this.values}`);
			return this;
		}
	}

	delete(value) {
		if (this.has(value)) {
			console.log(`Deleting ${value} from Group`);

			console.log(`Before: ${this.values}`);
			const newPgroup = new PGroup(this.values.filter(x=>x!==value));

			// console.log(`Position of value: ${newPgroup.values.indexOf(value)}`);

			// delete this.values[`"${value}"`];
			// newPgroup.values = newPgroup.values.slice(0, newPgroup.values.indexOf(value)).concat(newPgroup.values.slice(newPgroup.values.indexOf(value) + 1, newPgroup.values.length));
			console.log(`After: ${newPgroup.values}`);
			return newPgroup;
		} else {
			console.log(`Value ${value} is not in the Group: ${this.values}`);
			return this;
		}

	}

	has(value) {
		return this.values.includes(value);
	}


	
	// static empty() {
	// 	return Object.create({values: [], add, delete, has, from});
	// }

	static from(x) {

		const ret = PGroup.empty();
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
		x.forEach(z => ret.values.push(z));
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

export default PGroup;