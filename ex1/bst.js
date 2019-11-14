import TreePeat from './treepeat';
console.log('bst');

class Bst {

	main() {

		// const arr = [24, 15, 2, -5, 34, 12, 228, 54, -6, -87, 20, 99, 3, -67, -43, 22];
		const arr = [22, 60, 11, 55, 8, -2, 12, -6, 35, 33, 44, 39, 1, -3];
		// const arr = [1,2,3,4,5,6,7,8,9,10];
		// const arr = [10,8,9,6,7,4,5,2,3,1];
		console.log(`arr: ${arr}`);
		arr.sort((x,y)=>x-y);
		// console.log(`arr sorted: ${arr}`);

		const bst = this.createBst(arr);
		console.log(`BST: ${JSON.stringify(bst)}`);

		// const newBst = addElement(0, bst);

		return bst;
	}

	rebalanceTree(bst) {
		// const bst = this.main();
		const newBst = this.addElement(0, bst);
		const rebBst = this.rebalance(newBst);
		return rebBst;
	}

	rebalance(bst) {
		console.log(`rrrrrrr> bst before rebalance: ${JSON.stringify(bst)}`);
		const arr = Tree.toArray(bst);
		arr.sort((x,y)=>x-y);
		console.log(`rrrrrrr> arr: ${arr}`);
		const reb = this.createBst(arr);
		console.log(`rrrrrrr> bst after  rebalance: ${JSON.stringify(reb)}`);
		return reb;
	}

	addElement(x, bst) {

		console.log(`^^^^^ bst before: ${JSON.stringify(bst)}`);
		this.findWhere(x, bst.top);
		console.log(`^^^^^ bst  after: ${JSON.stringify(bst)}`);

		return bst;
	}

	findWhere(x, node) {

		if(x === node.id) {
			console.log(`xxxxx> Node with ${x} already exists in the tree`);
			return undefined;
		}
		if(x > node.id) {
			if(node.right) {
				this.findWhere(x, node.right);
			} else {
				//insert here
				console.log(`Insert on the right of ${node.id}`);
				node.right = new Node(x);
			}
		}
		if(x < node.id) {
			if(node.left) {
				this.findWhere(x, node.left);
			} else {
				// insert here
				console.log(`Insert on the left of ${node.id}`);
				node.left = new Node(x);
			}
		}
	}



	createBst(arr) {
		const node = this.addNode(arr);
		const tree = new Tree();
		tree.top = node; 
		return tree;
	}

	addNode(arr, node, side) {
		if(arr.length < 1) {
			return undefined;
		}
		const mid = Math.floor(arr.length / 2);
		if(node && side) {
			node[side] = new Node(arr[mid]);
		} else {
			node = new Node(arr[mid]); 
		}
		this.addNode(arr.slice(0, mid), side?node[side]:node, 'left');

		if(arr.length > 2) {
			this.addNode(arr.slice(mid+1, arr.length), side?node[side]:node, 'right');
		}
		return node;
	}
}


class Tree {
	constructor() {
		this.top = undefined;
	}

	static toArray(tree) {
		const tp = new TreePeat();
		return tp.traverseDepth(tree); 
	}
}

class Node {
	constructor(id) {
		this.id = id;
		this.left = undefined;
		this.right = undefined;
	}
}

 // main();
// rebalanceTree();

export default Bst;



 //================= First atttempt =====================================
 /*
 const createBst = (arr) => {
	
	const tree = new Tree();

	const mid = Math.floor(arr.length / 2);
	let node = new Node(arr[mid]);
	let arrLeft, arrRight = [];

	console.log(`===> arr.length=${arr.length}`);
	if(arr.length > 1) {
		arrLeft = arr.slice(0, mid);
		console.log(`===> >1 mid: ${mid}; arr[mid] = ${arr[mid]}; arrLeft=${arrLeft}`);
	} else if(arr.length < 1) {
		console.log(`===> <1 `);
		return undefined;
	}
	node = addLeft(arrLeft, node);

	if(arr.length > 2) {
		arrRight = arr.slice(mid+1, arr.length);
		console.log(`===> >2 mid: ${mid}; arr[mid] = ${arr[mid]}; arrRight=${arrRight}`);
		node = addRight(arrRight, node);
	}

	tree.top = node; 

	return tree;
}

const addLeft = (arr, node) => {

	let mid = Math.floor(arr.length / 2);
	let arrLeft, arrRight = [];
	console.log(`-----> arr.length=${arr.length}; arr=${arr}`);
	if(arr.length > 1) {
		arrLeft = arr.slice(0, mid);
		console.log(`---> >1 mid: ${mid}; arr[mid] = ${arr[mid]}; arrLeft=${arrLeft}`);
	} else if(arr.length < 1) {
		console.log(`---> <1 `);
		return node;
	} else {
		node.left = new Node(arr[0]);
		console.log(`***** creating node.left: ${JSON.stringify(node.left)}`);
		return node;
	}
	node.left = new Node(arr[mid]);
	console.log(`creating node.left: ${JSON.stringify(node.left)}`);
	addLeft(arrLeft, node.left);
	// node = addLeft(arr, node.left);

	if(arr.length > 2) {
		arrRight = arr.slice(mid+1, arr.length);
		console.log(`---> >2 mid: ${mid}; arr[mid] = ${arr[mid]}; arrRight=${arrRight}`);
		addRight(arrRight, node.left);
		// node.right = addRight(arr, node.left);
	}

	return node;
}

const addRight = (arr, node) => {

	let mid = Math.floor(arr.length / 2);
	let arrLeft, arrRight = [];

	console.log(`+++++> arr.length=${arr.length}`);
	if(arr.length > 1) {
		arrLeft = arr.slice(0, mid);
		console.log(`++++> >1 mid: ${mid}; arr[mid] = ${arr[mid]}; arrLeft=${arrLeft}`);
	} else if(arr.length < 1) {
		console.log(`++++> <1`);
		return node;
	} else {
		node.right = new Node(arr[0]);
		console.log(`@@@@@ creating node.right: ${JSON.stringify(node.right)}`);
		return node;

	}
	node.right = new Node(arr[mid]);
	console.log(`creating node.right: ${JSON.stringify(node.right)}`);
	addLeft(arrLeft, node.right);
	// node.left = addLeft(arr, node.right);

	if(arr.length > 2) {
		arrRight = arr.slice(mid+1, arr.length);
		console.log(`++++> >2 mid: ${mid}; arr[mid] = ${arr[mid]}; arrRight=${arrRight}`);
		addRight(arrRight, node.right);
		// node.right = addRight(arr, node.right);
	}

	return node;
}
*/