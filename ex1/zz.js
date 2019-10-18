console.log("zig");

const main = () => {
	const tree = createTree();
	console.log(`Tree created: ${JSON.stringify(tree)}`);

	// const resultString = traverseBfS(tree);
	// console.log(`The result of zigzag traversal: ${resultString}`);

	const resultString = traverseDFSPreOrd(tree);
	console.log(`The result of DFS Pre Order traversal: ${resultString}`);

	const resultString2 = traverseDFSInOrd(tree);
	console.log(`The result of DFS In Order traversal: ${resultString2}`);

	const resultString3 = traverseDFSPostOrd(tree);
	console.log(`The result of DFS Post Order traversal: ${resultString3}`);

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


const traverseBFS = (t) => {
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
}

main()