class Tree {
    constructor() {
        this.head = null;
    }

}

class Node {
    constructor(id) {
        this.id = id;
        this.left = null;
        this.right = null;
    }
    toString() {
        return this.id;
    }
}

class Stack {

    constructor() {
        this.arr = [];
    }

    push(x) {
        this.arr.push(x);
    }

    pop() {
        return this.arr.shift();
    }

    isEmpty() {
        return this.arr.length === 0;
    }

}

class Tat {

    main(tree) {
        console.log(`Tat`);
        // console.log(`Input tree: ${JSON.stringify(tree)}`);
        // const res = this.traverseBreadth(tree);
        const res = this.traverseDepth(tree);
        return res;
    }

    traverseDepth(tree) {
        const head = tree.head;
        // const res = this.traversePreO(head, []);
        // const res = this.traversePostO(head, []);
        // const res = this.traverseInO(head, []);
        const resInOrd = this.traverse(this.left(), this.root(), this.right())(head, []);
        const resPreOrd = this.traverse(this.root(), this.left(), this.right())(head, []);
        const resPostOrd = this.traverse(this.left(), this.right(), this.root())(head, []);
        console.log(`in-order: ${JSON.stringify(resInOrd)}`);
        console.log(`pre-order: ${JSON.stringify(resPreOrd)}`);
        console.log(`post-order: ${JSON.stringify(resPostOrd)}`);
        return [];
    }

    left() {
        return (node, arr, func) => {
            if (node.left != null) {
                func(node.left, arr);
            }
        }
    }

    right() {
        return (node, arr, func) => {
            if (node.right != null) {
                func(node.right, arr);
            }
        }
    }

    root() {
        return (node, arr) => {
            arr.push(node.id);
        }
    }

    traverse(first, second, third) {
        return (node, arr) => {
            const f = this.traverse(first, second, third);
            first(node, arr, f);
            second(node, arr, f);
            third(node, arr, f);
            return arr;
        }
    }


    /*
        traversePreO(node, arr) {
            arr.push(node.id);
            if (node.left != null) {
                this.traversePreO(node.left, arr);
            }
            if (node.right != null) {
                this.traversePreO(node.right, arr);
            }

            // if (node.left == null && node.right == null) {
            return arr;
            // }

        }

        traversePostO(node, arr) {
            if (node.left != null) {
                this.traversePostO(node.left, arr);
            }
            if (node.right != null) {
                this.traversePostO(node.right, arr);
            }
            arr.push(node.id);
            return arr;
        }

        traverseInO(node, arr) {
            if (node.left != null) {
                this.traverseInO(node.left, arr);
            }
            arr.push(node.id);
            if (node.right != null) {
                this.traverseInO(node.right, arr);
            }
            return arr;
        }
    */

    traverseBreadth(tree) {
        const res = [];
        const head = tree.head;
        // console.log(`head: ${JSON.stringify(head)}`);
        const stack = new Stack();
        stack.push(head);
        // console.log(`stack1: ${JSON.stringify(stack)}`);
        while (!stack.isEmpty()) {
            const node = stack.pop();
            // console.log(`stack2: ${JSON.stringify(stack)}`);
            res.push(node.id);
            if (node.left == null && node.right == null) {
                continue;
            }

            if (node.left != null) {
                stack.push(node.left);
                // res.push(node.left.id);
            }

            if (node.right != null) {
                stack.push(node.right);
                // res.push(node.right.id);
            }
            // console.log(`stack3: ${JSON.stringify(stack)}`);

        }
        return res;
    }

    static getTree() {
        const tree = new Tree();
        const head = new Node(0);
        head.left = new Node(1);
        head.right = new Node(2);
        head.left.left = new Node(3);
        head.left.right = new Node(4);
        head.right.left = new Node(5);
        head.right.right = new Node(6);
        tree.head = head;
        return tree;
    }
}

const run = () => {
    const tree = Tat.getTree();
    const res = new Tat().main(tree);
    console.log(`res: ${JSON.stringify(res)}`);
}

run();

export default Tat;