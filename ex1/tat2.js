class Tree {
    constructor(root) {
        this.root = root;
    }
    static getTree() {
        const tree = new Tree();
        const root = new Node(1);
        root.left = new Node(2);
        root.right = new Node(3);
        root.left.left = new Node(4);
        root.left.right = new Node(5);
        root.right.left = new Node(6);
        root.right.right = new Node(7);
        tree.root = root;
        return tree;
    }
}

class Node {
    constructor(id) {
        this.id = id;
        this.left = null;
        this.right = null;
    }
}

class Stack {
    constructor() {
        this.arr = [];
    }
    push(node) { // add first
        this.arr.unshift(node);
    }
    addLast(node) {
        this.arr.push(node);
    }
    addFirst(node) {
        this.arr.unshift(node);
    }
    pop() { // get last
        return this.arr.pop();
    }
    takeFirst() { // get first
        return this.arr.shift();
    }
    takeLast() {
        return this.arr.pop();
    }
    isEmpty() {
        return this.arr.length === 0;
    }
}

class Tat2 {
    main() {
        console.log(`tat2`);
        const tree = Tree.getTree();
        console.log(`tree: ${JSON.stringify(tree)}`);
        this.breadthFirts(tree);
        this.depthFirst(tree);
        this.zigzag(tree);
    }

    zigzag(tree) {
        const result = [];
        let ltr = false;
        let q1 = new Stack();
        let q2 = new Stack();
        q1.push(tree.root);

        const switchQueues = () => {
            q1 = q2;
            q2 = new Stack();
        }

        const changeDirection = () => {
            ltr = !ltr;
        }

        const getNode = (q, fnc) => {
            // console.log(`fu: ${fnc}`);
            // Object.getOwnPropertyNames(Object.getPrototypeOf(q)).forEach(x => console.log(x));
            return q[fnc]();
        }

        while (!q1.isEmpty() || !q2.isEmpty()) {
            let node = null;
            /* 
            if (ltr) {
                node = q1.takeFirst();
            } else {
                node = q1.takeLast();
            }
            */

            node = getNode(q1, ltr ? 'takeFirst' : 'takeLast');
            // if (q2.isEmpty()) {
            //     changeDirection();
            // }

            result.push(node.id);

            if (node[ltr ? 'left' : 'right'] != null) {
                q2[ltr ? 'addLast' : 'addFirst'](node[ltr ? 'left' : 'right']);
            }
            if (node[ltr ? 'right' : 'left'] != null) {
                q2[ltr ? 'addLast' : 'addFirst'](node[ltr ? 'right' : 'left']);
            }

            /* 
                        if (ltr) {
                            if (node.left != null) {
                                q2.addLast(node.left);
                            }
                            if (node.right != null) {
                                q2.addLast(node.right);
                            }
                        } else {
                            if (node.right != null) {
                                q2.addFirst(node.right);
                            }
                            if (node.left != null) {
                                q2.addFirst(node.left);
                            }
                        }
             */
            if (q1.isEmpty()) {
                changeDirection();
                switchQueues();
            }
        }
        console.log(`zigzag: ${result}`);
        return result;
    }

    breadthFirts(tree) {
        const result = [];
        const stack = new Stack();
        stack.push(tree.root);
        while (!stack.isEmpty()) {
            const node = stack.pop();
            // console.log(`node:id: ${tree.root.id}`);
            result.push(node.id);
            if (node.left != null) {
                stack.push(node.left);
            }
            if (node.right != null) {
                stack.push(node.right);
            }
        }
        console.log(`bf: ${JSON.stringify(result)}`);
    }

    depthFirst(tree) {
        const left = () => {
            return (node, arr, func) => {
                if (node.left != null) {
                    func(node.left, arr);
                }
            }
        }
        const right = () => {
            return (node, arr, func) => {
                if (node.right != null) {
                    func(node.right, arr);
                }
            }
        }
        const root = () => {
            return (node, arr) => {
                arr.push(node.id);
            }

        }

        const inOrd = this.traverseDF(left(), root(), right())(tree.root, []);
        console.log(`in-order: ${JSON.stringify(inOrd)}`);
        const preOrd = this.traverseDF(root(), left(), right())(tree.root, []);
        console.log(`pre-order: ${JSON.stringify(preOrd)}`);
        const postOrd = this.traverseDF(left(), right(), root())(tree.root, []);
        console.log(`post-order: ${JSON.stringify(postOrd)}`);

    }

    traverseDF(first, second, third) {
        return (node, arr) => {
            first(node, arr, this.traverseDF(first, second, third));
            second(node, arr, this.traverseDF(first, second, third));
            third(node, arr, this.traverseDF(first, second, third));
            return arr;
        }
    }

}



const run = () => {
    new Tat2().main();
    /*
             1
           /   \
          2     3
         /\    / \
        4  5  6   7

        in-order:   4,2,5,1,6,3,7
        pre-order:  1,2,4,5,3,6,7
        post-order: 4,5,2,6,7,3,1
    */
}

run();

export default Tat2;