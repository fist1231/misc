import {sqrt} from 'mathjs';

class Vec {
	constructor(x, y) {
		this.x = x;
		this.y = y;
		console.log(`Vec initialized with Vec(${this.x}, ${this.y})`);
	}

	plus(vector) {
		return new Vec(this.x + vector.x, this.y + vector.y);
	}

	minus(vector) {
		return new Vec(this.x - vector.x, this.y - vector.y);
	}

	get length() {
		return sqrt(this.x**2 + this.y**2);
	}

}

export default Vec;