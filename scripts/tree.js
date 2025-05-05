const input = document.getElementById('inpt');
const err = document.getElementById('error');
const treeElem = document.getElementById('tree');
let inputVal;
let myId = 0;
let nodesData = new vis.DataSet([]);
let edgesData = new vis.DataSet([]);

document.addEventListener('DOMContentLoaded', () => {
    gsap.set(err, { opacity: 0 })
});
const data = { nodes: nodesData, edges: edgesData };
const options = {
    interaction: {
      dragView: false,
      zoomView: false
    },
    physics: {
        enabled: false,  
},
layout: {
    hierarchical: {
      direction: "UD",
      sortMethod: "directed",
    },
  },};

// Vytvoření grafu
const network = new vis.Network(treeElem, data, options);
class Node {
    constructor(data) {
        this.data = data;
        this.left = null;
        this.right = null;
        this.visId = null;
        this.x = null;
    }
}
//https://www.geeksforgeeks.org/implementation-binary-search-tree-javascript/
class BinarySearchTree {
    constructor() {
        this.root = null;
    }
    insert(inValue) {
        let newNode = new Node(inValue);
        if (this.root === null) {
            newNode.visId = myId++;
            this.root = newNode;
            nodesData.add({ id: newNode.visId, label: newNode.data.toString(),x: 0, y:50 });
            network.setData({ nodes: nodesData, edges: edgesData });
        } else{
            this.insertNode(this.root, newNode);
        }
    }
    insertNode(node, newNode) {
        const offset = 50
        if (newNode.data < node.data) {
            if (node.left === null) {
                newNode.visId = myId++;
                newNode.x = node.x - offset;
                nodesData.add({
                    id: newNode.visId,
                    label: newNode.data.toString(),
                    x: newNode.x,
                });
                edgesData.add({ from: node.visId, to: newNode.visId });
                node.left = newNode;
            } else {
                this.insertNode(node.left, newNode);
            }
        } else {
            if (node.right === null) {
                newNode.visId = myId++;
                newNode.x = node.x + offset;
                nodesData.add({
                    id: newNode.visId,
                    label: newNode.data.toString(),
                    x: newNode.x,
                });
                edgesData.add({ from: node.visId, to: newNode.visId });
                node.right = newNode;
            } else {
                this.insertNode(node.right, newNode);
            }
        }
    }
    
    getRootNode() {
        return this.root;
    }
    inorder(node) {
        if (node !== null) {
            this.inorder(node.left);
            console.log(node.data);
            this.inorder(node.right);
        }
    }
    remove(data)
{
    this.root = this.removeNode(this.root, data);
}
removeNode(node, key)
{
    if(node === null)
        return null;
    else if(key < node.data)
    {
        node.left = this.removeNode(node.left, key);
        return node;
    }
    else if(key > node.data)
    {
        node.right = this.removeNode(node.right, key);
        return node;
    }
    else
    {
        if(node.left === null && node.right === null)
        {
            node = null;
            return node;
        }
        if(node.left === null)
        {
            node = node.right;
            return node;
        }
        
        else if(node.right === null)
        {
            node = node.left;
            return node;
        }
        var aux = this.findMinNode(node.right);
        node.data = aux.data;

        node.right = this.removeNode(node.right, aux.data);
        return node;
    }
}
findMinNode(node)
{
    if(node.left === null)
        return node;
    else
        return this.findMinNode(node.left);
}
}
let BST = new BinarySearchTree();
document.addEventListener('DOMContentLoaded', () => {
    gsap.set(err, { opacity: 0 })
});

function addToTree() {
    BST.insert(parseInt(inputVal));
}
function deleteFromTree(){
    BST.remove(parseInt(inputVal))
}


function changeValue() {
    inputVal = input.value;
};