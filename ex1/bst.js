console.log('bst');

const main = () => {

	// const arr = [24, 15, 2, -5, 34, 12, 228, 54, -6, -87, 20, 99, 3, -67, -43, 22];
	const arr = [22, 60, 11, 55, 8, -2, 12, -6, 35, 33, 44, 39, 1, -3];
	// const arr = [1,2,3,4,5,6,7,8,9,10];
	// const arr = [10,8,9,6,7,4,5,2,3,1];
	console.log(`arr: ${arr}`);
	arr.sort((x,y)=>x-y);
	// console.log(`arr: ${arr.sort()}`);
	// console.log(`arr: ${arr.sort((x,y)=>x-y)}`);
	console.log(`arr sorted: ${arr}`);

	const bst = createBst(arr);
	console.log(`BST: ${JSON.stringify(bst)}`);
}

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


	// let arrLeft = arr.slice(0, mid);
	// console.log(`arrLeft: ${arrLeft}`);
	// let lmid = Math.floor((arrLeft.length - 1) / 2) + 1;
	// node.left = new Node(arrLeft[lmid]);
	// console.log(`leftMid: ${lmid}; arrLeft[mid] = ${arrLeft[lmid]}`);

	// let arrRight = arr.slice(mid+1, arr.length);
	// console.log(`arrRight: ${arrRight}`);
	// let rmid = Math.floor((arrRight.length - 1) / 2) + 1;
	// node.right = new Node(arrRight[rmid]);
	// console.log(`rightMid: ${rmid}; arr[mrightMid] = ${arrRight[rmid]}`);

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
}

 main();