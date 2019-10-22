console.log("zig");

const main = () => {
	// const tree = createTree();
	// console.log(`Tree created: ${JSON.stringify(tree)}`);

	// const resultString = traverseBFS(tree);
	// console.log(`The result of Bredth traversal: ${resultString}`);

	// const resultString = traverseBFSNoQueue(tree);
	// console.log(`The result of Bredth traversal: ${resultString}`);

	// const resultString = traverseBFSZigZag(tree);
	// console.log(`The result of zigzag traversal: ${resultString}`);


	// const resultString = traverseDFSPreOrd(tree);
	// console.log(`The result of DFS Pre Order traversal: ${resultString}`);

	// const resultString2 = traverseDFSInOrd(tree);
	// console.log(`The result of DFS In Order traversal: ${resultString2}`);

	// const resultString3 = traverseDFSPostOrd(tree);
	// console.log(`The result of DFS Post Order traversal: ${resultString3}`);

	// struct(); 

	inplaceSwap();

}

const inplaceSwap = () => {

	const arr = [4, 3, 6, 5, 0];
	const n = 2;
	// const arr = [8, 2, 5, 6, 1, 3, 7];
	// const n = 3;
	console.log(`===> before swap: ${arr}`);
	// for(let i=0; i<arr.length-1; i++) {
	// 	arr[i] += arr[arr.length-(n-i%n)];
	// 	arr[arr.length-(n-i%n)] = arr[i] - arr[arr.length-(n-i%n)];
	// 	arr[i] -= arr[arr.length-(n-i%n)];
	// }

	const arrOut = processSwap(arr, n, swapFunc);

	console.log(`===> after swap: ${arrOut}`);
}

const processSwap = (arr, n, swap) => {


	const res = arr.map((a,i) => {
		console.log(`====> map: a=${a}`);
		let idx2 = arr.length-(n-i%n);
		let obj = swap(a, arr[idx2]);
		// arr[idx1] = obj.x;
		arr[idx2] = obj.y;
		return obj.x;
	});

	// for(let i=0; i<arr.length-1; i++) {
	// 	let idx1 = i;
	// 	let idx2 = arr.length-(n-i%n);
	// 	let obj = swap(arr[idx1], arr[idx2]);
	// 	console.log(`+++++> obj: ${JSON.stringify(obj)}`);
	// 	arr[idx1] = obj.x;
	// 	arr[idx2] = obj.y;
	// }
	// const res = arr;
	return res;
}

const swapFunc = (x, y) => {
	console.log(`====> Before: x=${x}; y=${y}`);
	x += y;
	y = x - y;
	x -= y;
	console.log(`====> After: x=${x}; y=${y}`);
	return {x, y};
	// return `{${i1}: ${x}, ${i2}: ${y}}`;
}

const swap = (a, b) => {
	a += b;
	b = a - b;
	a -= b;
	return {a: a, b: b}
}

const struct = () => {
	let arr = [4, 3, 6, 5, 0]; 
	console.log(`Source array: ${arr}`);
	let aux = [];
	const n = 2;
    // move last n elements to auxilary array
    aux = stashAux(arr, aux, n);
    // shift every element of array n elements forward
    arr = shiftForward(arr, n);
    // move n elements from auxilary to the beginning of array 
    arr = unstashAux(arr, aux, n);
    console.log(`Result array: ${arr}`);
}

const shiftForward = (arr, n) => {
	for(let i=arr.length-n-1; i>=0; i--) {
		arr[i+n] = arr[i];
	}
	return arr;
}

const stashAux = (arr, aux, n) => {
    for(let i=arr.length-1; i>=arr.length-n; i--) {
       aux.unshift(arr[i]);
    }
    return aux;
}

const unstashAux = (arr, aux, n) => {
    for(let i=0; i<aux.length; i++) {
       arr[i] = aux[i];
    }
    return arr;
}





const traverseDFSPreOrd = (t) => {
    
    const arr = [];
    const resultString = processNodePreOrd(t.root, arr);
    return resultString;

}


const processNodePreOrd = (n, rez) => {

	// Root - Left - Right
	rez.push(n.id);
	if(n.left != null) {
		processNodePreOrd(n.left, rez);
	}	
	if(n.right != null) {
		processNodePreOrd(n.right, rez);

	}
	return rez;
}


const traverseDFSInOrd = (t) => {
    
    const arr = [];
    const resultString = processNodeInOrd(t.root, arr);
    return resultString;

}


const processNodeInOrd = (n, rez) => {

	// Left - Root - Right
	if(n.left != null) {
		processNodeInOrd(n.left, rez);
	}	
	rez.push(n.id);
	if(n.right != null) {
		processNodeInOrd(n.right, rez);

	}
	return rez;
}

const traverseDFSPostOrd = (t) => {
    
    const arr = [];
    const resultString = processNodePostOrd(t.root, arr);
    return resultString;

}


const processNodePostOrd = (n, rez) => {

	// Left - Right - Root
	if(n.left != null) {
		processNodePostOrd(n.left, rez);
	}	
	if(n.right != null) {
		processNodePostOrd(n.right, rez);

	}
	rez.push(n.id);
	return rez;
}


const traverseBFSZigZag = (t) => {
    let s = "";
    let ltr = true;
    let q1 = new Queue();
    let q2 = new Queue();
    q1.offer(t.root);

    while(!q1.isEmpty()) {
    	let node = q1.poll();
		console.log(`==>: ${JSON.stringify(node)}`);
    	s += `${s?", " + node.id:node.id}`;

    	if(ltr) {
	    	if(node.left != null) {
		     q2.offer(node.left);
		    }
	    	if(node.right != null) {
	    	 q2.offer(node.right);
	    	}
    	} else {
	    	if(node.right != null) {
	    	 q2.offer(node.right);
	    	}
	    	if(node.left != null) {
		     q2.offer(node.left);
		    }
    	}

    	if(q1.isEmpty()) {
    		console.log(`==> Swapping queues and traverse direction`);
            ltr = !ltr;
    		q1 = q2;
    		q2 = new Queue();
    	}
    }
	return s;
}


const traverseBFS = (t) => {
    let s = "";
    let q = new Deque();
    q.offer(t.root);

    while(!q.isEmpty()) {
    	let node = q.poll();
    	console.log(node.id);
		if(node.left != null) {
	     q.offer(node.left);
	    }
		if(node.right != null) {
		 q.offer(node.right);
		}
    }
	return s;
}

const traverseBFSNoQueue = (t) => {

	let node = t.root;
	let left = undefined;
	let right = undefined;
	const arr = [];
    arr.push({id: node.id, data: node, processed: false});
    let counter = 0;
    let fcn = 0;
    while(true) {
	    arr.filter((x) => {
	    	!x.processed
	    })
	    	.map(x => {
	    		console.log(`====> ${x.id}`);
	    		counter++;
	    		// console.log(`====> Before: ${JSON.stringify(x)}`);
				if(x.data.left != null) {
	    		 // console.log(`====> pushing left`);
			     arr.push({id: x.data.left.id, data: x.data.left, processed: false});
			    }
				if(x.data.right != null) {
	    		 // console.log(`====> pushing right`);
				 arr.push({id: x.data.right.id, data: x.data.right, processed: false});
				}
				x.processed = true;
	    		// console.log(`====> After: ${JSON.stringify(x)}`);
	    		// console.log(`====> arr: ${arr}`);
	    	})
		// console.log(`====> arr: ${JSON.stringify(arr)}`);

	    let re = arr.filter((x) => !x.processed);
        // console.log(`====> re: ${re.length}`);
	    if(re.length == 0) {
	    	break;
	    }
	}
	console.log(`Total N: ${counter}`);
   	console.log(`Filter counter: ${fcn}`)
	return undefined;
}


class Queue {

	constructor() {
		this.arr = [];
	}

	offer(obj) {
//      console.log(`Before: ${JSON.stringify(this.arr)}`);
      this.arr.push(obj);
	}

	poll() {
		if(this.arr.length>0) {
		    const rez = this.arr.pop();
//	        console.log(`polled: ${JSON.stringify(rez)}`);
			return rez;
		}
	}
	isEmpty() {
		return (this.arr.length==0);
	}

}

class Deque {

	constructor() {
		this.arr = [];
	}

	offer(obj) {
//      console.log(`Before: ${JSON.stringify(this.arr)}`);
      this.arr.push(obj);
	}

	poll() {
		if(this.arr.length>0) {
		    const rez = this.arr.shift();
//	        console.log(`polled: ${JSON.stringify(rez)}`);
			return rez;
		}
	}
	isEmpty() {
		return (this.arr.length==0);
	}

}

const createTree = () => {

	const tree = new Tree();
	const root = new Node(1);

	root.left = new Node(2);
	root.right = new Node(3);

	root.left.left = new Node(4);
	root.left.right = new Node(5);
	root.right.right = new Node(6);

	root.left.left.left = new Node(7);
	root.left.left.right = new Node(8);
	root.left.right.right = new Node(9);
	root.right.right.left = new Node(10);
	root.right.right.right = new Node(11);

	tree.root = root;

	return tree;
}

class Tree {
	constructor() {
		this.root = null;
	}
//	let root = {}
}

class Node {
	constructor(data) {
		this.id = data;
		// this.left = null;
		// this.right = null;
	}

	get idStr() {
		console.log(`getter called on ${this.id}`)
		return `${this.id}`;
	}

	set idStr(value) {
		this.id = value;
	}
}

main()