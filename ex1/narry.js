class Narry {
    main(arrtr) {
        console.log(`Narry`);
        const tree = this.getTree();

        const treeP = this.getTree();
        const tree_str = Tree.toArray(treeP);
        console.log(`tree: ${JSON.stringify(tree_str)}`);

        const ctree = Tree.arrToTree(arrtr);
        const tree_str2 = Tree.toArray(ctree);
        console.log(`tree_str2: ${JSON.stringify(tree_str2)}`);

        const root = tree.root;
        const res = this.traverse(root, []);
        return res;
    }

    traverse(node, arr) {
        for (let i = 0; i < node.nodes.length; i++) {
            this.traverse(node.nodes[i], arr);
        }
        arr.push(node.id);
        return arr;
    }

    getTree() {
        const t1 = new Tree();
        t1.root = new Node(1);
        const node2 = new Node(2);
        const node3 = new Node(3);
        const node4 = new Node(4);
        const node5 = new Node(5);

        const node7 = new Node(7);
        const node8 = new Node(8);
        const node9 = new Node(9);

        const node11 = new Node(11);
        node11.nodes = [new Node(14)];

        node7.nodes = [node11];
        node8.nodes = [new Node(12)];
        node9.nodes = [new Node(13)];

        node3.nodes = [new Node(6), node7];
        node4.nodes = [node8];
        node5.nodes = [node9, new Node(10)];
        t1.root.nodes = [node2, node3, node4, node5];
        return t1;
    }
}

const run = () => {
    const arrtr = [
        1, null,
        2, 3, 4, 5, null,
        null, 6, 7, null, 8, null, 9, 10, null,
        null, 11, null, 12, null, 13, null, null,
        14
    ];


    const res = new Narry().main(arrtr);
    console.log(`res: ${JSON.stringify(res)}`);
}



class Tree {

    constructor() {
        this.root = null;
    }

    static arrToTree(arr) {
        const tree = new Tree();
        let stack1 = [];
        let stack2 = [];
        let stack3 = [];
        let cnt = 0;

        const switchStacks = (stack1, stack2, stack3) => {
            stack1 = stack3;
            stack2 = [];
            stack3 = [];
            return { stack1, stack2, stack3 };
        }

        const addChld = (tree, stack1, stack2, stack3) => {
            const node = stack1.pop();
            if (tree.root == null) {
                tree.root = node;
            }
            while (stack2.length > 0) {
                node.nodes.push(stack2.pop());
                if (stack2.length === 0 && stack1.length === 0) {
                    ({ stack1, stack2, stack3 } = switchStacks(stack1, stack2, stack3));
                }
            }
        }

        for (let i = 0; i < arr.length; i++) {
            // console.log(`###> arr[${i}]=${arr[i]}`);
            if (arr[i] != null) {
                const nd = new Node(arr[i]);
                stack2.unshift(nd);
                stack3.unshift(nd);
                if (i === arr.length - 1) {
                    addChld(tree, stack1, stack2, stack3);
                }
            } else {
                if (stack1.length == 0) {
                    ({ stack1, stack2, stack3 } = switchStacks(stack1, stack2, stack3));
                } else {
                    addChld(tree, stack1, stack2, stack3);
                }
            }
            // console.log(`==> stack1: ${stack1}`);
            // console.log(`==> stack2: ${stack2}`);
            // console.log(`==> tree: ${JSON.stringify(tree)}`);
        }


        return tree;
    }

    static toArray(tree) {
        let stack1 = [];
        let stack2 = [];
        const res = [];
        stack1.push(tree.root);
        while (stack1.length > 0 || stack2.length > 0) {
            const node = stack1.pop();
            if (node === 'null') {
                res.push('null');
            } else {
                res.push(node.id);

                if (node.nodes != null && node.nodes.length > 0) {
                    const nds = node.nodes.reverse();
                    stack2.unshift(...nds);
                    stack2.unshift('null');
                }
            }
            if (stack1.length == 0) {
                res.push('null');
                const tmp = stack1;
                stack1 = stack2;
                stack2 = tmp;
                console.log(`==> stack1: ${JSON.stringify(stack1)}`);
            }

        }
        return res;
    }
}
/*
    static arrToTree(arr) {
        const stack1 = [];
        const stack2 = [];
        const tree = new Tree();
        for (let i = 0; i < arr.length; i++) {
            if (arr[i] != null) {
                stack2.push(new Node(arr[i]));
            } else {
                if (stack1.length > 0) {
                    const parent = stack1.pop();

                    while (stack2.length > 0) {
                        parent.nodes.push(stack2.pop());
                    }
                } else {
                    tree.root = stack2.pop();
                }
            }
        }

        return tree;
    }
*/
// }

class Node {
    constructor(id) {
        this.id = id;
        this.nodes = [];
    }
    toString() {
        return this.id;
    }
}


run();


export default Narry;