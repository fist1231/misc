class Group {

	constructor() {
		this.values = [];
		console.log('Group class constructed');
	}

	add(value) {
		if(!this.values.includes(value)) {
			this.values.push(value);
		 	console.log(`Added ${value} to the Group: ${this.values}`);
		 } else {
		 	console.log(`Group already contains ${value}: ${this.values}`);
		 }

	}

	delete(value) {
		if(this.values.includes(value)) {
			this.values = this.values.slice(0, this.values.indexOf(value)).concat(this.values.slice(this.values.indexOf(value) + 1, this.values.length));
		 	console.log(`Deleted ${value} from the Group: ${this.values}`);
		} else {
		 	console.log(`Group doesn't have ${value}: ${this.values}`);
		 }
	}

	has(value) {
		return this.values.includes(value);
	}

	static from(it) {
		const ret = new Group();
		// let iter = it[Symbol.iterator]();
		// for(let val = iter.next(); !val.done; val = iter.next()) {
		// 	ret.add(val.value);
		// }
		it.forEach(x => ret.add(x));
		return ret;
	}
	
}


export default Group;