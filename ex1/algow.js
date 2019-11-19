console.log('algow');

const main = () => {
	const t = getTree();
	console.log(`tree: ${JSON.stringify(t)}`);

	const bftRes = bft(t);
	console.log(`breadth first: ${bftRes}`);


	const root = (node, arr) => {
		console.log('root');
		arr.push(node.id);
		return arr;
	}

	const lft = (node, arr, func) => {
		console.log('left');
		if(node.left) {
			func(node.left, arr, );
		}
	}

	const rght = () => {
		console.log('right');
		return [];
	}
	let dftResUn = [];
	// dftResUn = dftUn(t.top, lft(), rght(), root(t.top, dftResUn));
	console.log(`depth first universal: ${dftResUn}`);


	const dftRes = dft(t);
	console.log(`depth first: ${dftRes}`);

	const a1 = (x) => {
		return (y) => console.log(`${x} ==> ${y}`);
	};
	const a2 = (x) => console.log(x);
	const a3 = (x) => console.log(x);

	const z = a1('cmon');

	fcall(z('clown'), a2('wtf2'), a3('wtf3'));
	fcall(a1('wtf3'), a2('wtf1'), a3('wtf2'));
}

const fcall = (f1, f2, f3) => {
	f1;
	f2;
	f3;
}

const dftUn = (node, s1, s2, s3) => {
	return processUn(node, [], s1, s2, s3);
}

const processUn = (node, arr, s1, s2, s3) => {
	arr = s1;
	arr = s2;
	arr = s3;
	return arr;
}

const dft = t => {
	return process(t.top, []);
}

const process = (node, arr) => {
	if(node.left) {
		process(node.left, arr);
	}
	if(node.right) {
		process(node.right, arr);
	}
	arr.push(node.id);
	return arr;
}



const bft = t => {
	const queue = [];
	const res = [];
	queue.push(t.top);
	while(queue.length > 0) {
		let node = queue.shift();
		res.push(node.id);
		if(node.left) {
			queue.push(node.left);
		}
		if(node.right) {
			queue.push(node.right);
		}
	}
	return res;
}

const getTree = () => {
	const tree = new Tree();
	tree.top = new Node(1);
	tree.top.left = new Node(2);
	tree.top.right = new Node(3);
	tree.top.left.left = new Node(4);
	tree.top.left.right = new Node(5);
	tree.top.right.left = new Node(6);
	tree.top.right.right = new Node(7);
	tree.top.left.right.right = new Node(8);
	return tree;
}

class Tree {
	constructor() {
		this.top = undefined;
	}
}

class Node {
	constructor(id) {
		this.id = id;
		this.left = undefined;
		this.right = undefined;
	}

	toString() {
		return `${this.id}`;
	}
}

main();