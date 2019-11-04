console.log('trees repeat');

const main = () => {
	const t = getTree();
	console.log(`Tree = ${JSON.stringify(t)}`);

	const res = traverseBreadth(t);
	console.log(`Breadth = ${res}`);

	const rez = traverseDepth(t);
	console.log(`Depth psto regular = ${rez}`);

	const rezUnIno = traverseDepthUn(t, left(), root(), right());
	console.log(`Depth univer in-order = ${rezUnIno}`);

	const rezUnPro = traverseDepthUn(t, root(), left(), right());
	console.log(`Depth univer pre-order = ${rezUnPro}`);

	const rezUnPso = traverseDepthUn(t, left(), right(), root());
	console.log(`Depth univer post-order = ${rezUnPso}`);

	// testf(t.top, [], rt()); // 1
	// testf(rt(t.top, [])); // 2

}

// const testf = (node, arr, action) => {
// 	// console.log(`Action = ${action}`);
// 	action(node, arr); // 1
// 	// action; // 2
// }




const traverseDepthUn = (t, first, second, third) => {
	// console.log(`----> Action = ${action}`);
	return processNodeUn(t.top, [], first, second, third);
}

const processNodeUn = (node, arr, first, second, third) => {
	// may not be needing last 4 parameters, if root
	arr = first(node, arr, first, second, third, processNodeUn);
	arr = second(node, arr, first, second, third, processNodeUn);
	arr = third(node, arr, first, second, third, processNodeUn); 
	return arr;
}


const root = () => {
	return (node, arr) => {
		arr.push(node.id);
		// console.log(`****> ${arr}`);
		return arr;
	}
}

const left = () => {
	return (node, arr, first, second, third, action) => {
		if(node.left) {
			arr = action(node.left, arr, first, second, third);
		}
		return arr;
	}
}

const right = () => {
	return (node, arr, first, second, third, action) => {
		if(node.right) {
			arr = action(node.right, arr, first, second, third);
		}
		return arr;
	}
}




const traverseDepth = (t) => {
	return processNode(t.top, []);
}

const processNode = (node, arr) => {
	if(node.left) processNode(node.left, arr);
	if(node.right) processNode(node.right, arr);
	arr.push(node.id);
	return arr;
}


const traverseBreadth = t => {
	const queue = [];
	const result = [];
	queue.push(t.top);
	while(queue.length > 0) {
		let node = queue.shift();
		// console.log(`${node.id}; left=${node.left}; right=${node.right}`);
		result.push(node.id);
		if(node.left) {
			queue.push(node.left);
		}
		if(node.right) {
			queue.push(node.right);
		}
	}
	return result;
}


const getTree = () => {
	const t = new Tree();
	t.top.left = new Node(2);
	t.top.right = new Node(3);
	t.top.left.left = new Node(4);
	t.top.left.right = new Node(5);
	t.top.right.left = new Node(6);
	t.top.right.right = new Node(7);
	t.top.left.right.right = new Node(8);
	return t;
}

class Tree {
	constructor() {
		this.top = new Node(1);
	}
}

class Node {
	constructor(id) {
		this.id = id
	}
	toString() {
		return `${this.id}`;
	}
}

main();

const sand = () => {
	const f1 = () => console.log('f1');
	const f2 = () => console.log('f2');
	const f3 = () => console.log('f3');
	runme(f1, f2, f3);

	const f4 = (x) => console.log(x);

	const f7 = (x) => {
		return () => console.log(x);
	}

	runme2(f4('f4'), f4('f5'), f4('f6'));

	const f5 = (x) => {
		return (y, z, f) => {
			console.log(`${x} and ${y}`);
			console.log(z);
			f;
		}
	}

	runme3(f5('a1'), f5('a2'), f5('a3'), 'a11', 'a12', 'a13', f7('b2'));

}

const runme = (f1, f2, f3) => {
	f1();
	f2();
	f3();
}

const runme2 = (f1, f2, f3) => {
	f1;
	f2;
	f3;
}

const runme3 = (f1, f2, f3, p1, p2, p3, fnc) => {
	f1(p1, 'atas', fnc);
	f2(p2);
	f3(p3);
}

const prnt = s => {
	return () => console.log(s);
}



// sand();

/*
       1
      / \
     2   3
    / \ / \
   4  5 6  7
       \
        8

l-rt-r: 4,2,5,8,1,6,3,7 - inorder
rt-l-r: 1,2,4,5,8,3,6,7 - preorder 
l-r-rt: 4,8,5,2,6,7,3,1 - postorder
*/