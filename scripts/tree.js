const input = document.getElementById('inpt');
const err = document.getElementById('error');
const treeElem = document.getElementById('tree');
const switchElem = document.getElementById('toggle');
const outputElem = document.getElementById('output');
let inputVal;
let myId = 0;
let nodesData = new vis.DataSet([]);
let edgesData = new vis.DataSet([]);
let inorderX = 0;
let traversalType;
let errorDisplayed = false;
document.addEventListener('DOMContentLoaded', () => {
    gsap.set(err, { opacity: 0 })
});
const data = { nodes: nodesData, edges: edgesData };
const options = {
    interaction: {
        dragView: true,
        zoomView: true,
        selectable: false
    },
    physics: {
        enabled: false,
    },
};

// Vytvoření grafu
const network = new vis.Network(treeElem, data, options);
class Node {
    constructor(data) {
        this.data = data;
        this.left = null;
        this.right = null;
        this.visId = null;
        this.x = 0;
        this.y = 0;
    }
}
function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}
async function highlightNode(visId, color = "#FFA500", delay = 500) {
    nodesData.update({ id: visId, color: { background: color } });
    await sleep(delay);
    nodesData.update({ id: visId, color: { background: "#97C2FC" } }); // výchozí barva Vis.js
}
class BinarySearchTree {
    constructor() {
        this.root = null;
        this.output = []
    }
    insert(inValue) {
        let newNode = new Node(inValue);
        newNode.visId = myId++;
        if (this.root === null) {
            this.root = newNode;
            nodesData.add({ id: newNode.visId, label: newNode.data.toString() });
        } else {
            this.insertNode(this.root, newNode);
        }
        inorderX = 0;
        nodesData.clear();
        edgesData.clear();
        this.assignCoordinates(this.root);
        network.fit()
    }
    insertNode(node, newNode) {
        if (newNode.data < node.data) {
            if (node.left === null) {
                node.left = newNode;
            } else {
                this.insertNode(node.left, newNode);
            }
        } else {
            if (node.right === null) {
                node.right = newNode;
            } else {
                this.insertNode(node.right, newNode);
            }
        }
    }
    assignCoordinates(node, depth = 0) {
        if (node === null) return;

        this.assignCoordinates(node.left, depth + 1);

        node.x = inorderX * 80;
        node.y = depth * 100;
        inorderX++;

        // Přidání do vis.js
        nodesData.add({
            id: node.visId,
            label: node.data.toString(),
            x: node.x,
            y: node.y,
            fixed: { x: true, y: true },
        });

        if (node.left) {
            edgesData.add({ from: node.visId, to: node.left.visId });
        }
        if (node.right) {
            edgesData.add({ from: node.visId, to: node.right.visId });
        }
        this.assignCoordinates(node.right, depth + 1);
    }
    remove(value) {
        this.root = this.removeNode(this.root, value);
        nodesData.clear();
        edgesData.clear();
        inorderX = 0;
        this.assignCoordinates(this.root);
    }

    removeNode(node, value) {
        if (node === null) return null;
        if (value < node.data) {
            node.left = this.removeNode(node.left, value);
            return node;
        } else if (value > node.data) {
            node.right = this.removeNode(node.right, value);
            return node;
        } else {
            if (node.left === null && node.right === null) {
                return null;
            } else if (node.left === null) {
                return node.right;
            } else if (node.right === null) {
                return node.left;
            } else {
                let minRight = this.findMinNode(node.right);
                node.data = minRight.data;
                node.visId = minRight.visId;
                node.right = this.removeNode(node.right, minRight.data);
                return node;
            }
        }
    }
    getRoot(){
        return this.root
    }
    findMinNode(node) {
        while (node.left !== null) {
            node = node.left;
        }
        return node;
    }
    async inorder(node) {
        if (node === null) return;
    
        await this.inorder(node.left);
        await highlightNode(node.visId);
        await this.output.push(node.data.toString())
        outputElem.textContent = this.output;
        await this.inorder(node.right);
    }
    async preorder(node) {
        if (node === null) return;
    
        await highlightNode(node.visId);
        await this.output.push(node.data.toString())
        outputElem.textContent = this.output;
        await this.preorder(node.left);
        await this.preorder(node.right);
    }
    async postorder(node) {
        if (node === null) return;
    
        await this.postorder(node.left);
        await this.postorder(node.right);
        await highlightNode(node.visId);
        await this.output.push(node.data.toString())
        outputElem.textContent = this.output;
    }
    cleerOutput(){
        this.output = []
        outputElem.textContent = this.output;
    }
    
    
}
let BST = new BinarySearchTree();
document.addEventListener('DOMContentLoaded', () => {
    gsap.set(err, { opacity: 0 })
});

function addToTree() {
    if(inputVal && parseInt(inputVal) != NaN){
        BST.insert(parseInt(inputVal));
        input.value = "";
        changeValue()
    }  
    else
        error("Zadej hodnotu")
}
function deleteFromTree() {
    if(inputVal && parseInt(inputVal) != NaN){
        BST.remove(parseInt(inputVal))
        input.value = "";
        changeValue()
    }
    else
        error("Zadej hodnotu")
}


function changeValue() {
    inputVal = input.value;
};
function traverseTree(){
    traversalType = switchElem.value;
    console.log(traversalType)
    BST.cleerOutput()
    if(traversalType == "Preorder")
        BST.preorder(BST.getRoot())
    else if (traversalType == "Inorder")
        BST.inorder(BST.getRoot())
    else
        BST.postorder(BST.getRoot())
}