const input = document.getElementById('inpt');
const err = document.getElementById('error');
const treeElem = document.getElementById('tree');
let pointer;
let inputVal;
let currentX = 0;
let isFirstNode = true;
class Node {
    constructor(data) {
        this.data = data;
        this.left = null;
        this.right = null;
        this.elem = null;
    }
}
//https://www.geeksforgeeks.org/implementation-binary-search-tree-javascript/
class BinarySearchTree {
    constructor() {
        this.root = null;
    }
    insert(data) {
        let newNode = new Node(data);
        let nodeElem = document.createElement('div');
        nodeElem.classList.add("node");
        nodeElem.textContent = data;
        treeElem.appendChild(nodeElem)
        let rootHome = { "x": nodeElem.getBoundingClientRect().left, "y": nodeElem.getBoundingClientRect().top }
        newNode.elem = nodeElem;
        if (this.root === null) {
            this.root = newNode;
            let tRec = treeElem.getBoundingClientRect();
            gsap.set(newNode.elem, {
                x: -rootHome["x"] + tRec.left + (tRec.width / 2) - newNode.elem.getBoundingClientRect().width / 2,
                y: -rootHome["y"] + tRec.top + 20
            })
            gsap.to(pointer,{
                x: -rootHome["x"] + tRec.left + (tRec.width / 2) - newNode.elem.getBoundingClientRect().width / 2,
                y: -rootHome["y"] + tRec.top + 20,
            })
        }
        else
            this.insertNode(this.root, newNode);
    }
    insertNode(node, newNode) {
        let nRec = newNode.elem.getBoundingClientRect();
        if (newNode.data < node.data) {
            if (node.left === null) {
                node.left = newNode;
                gsap.set(newNode.elem, {
                    x: -nRec.left + node.elem.getBoundingClientRect().left - nRec.width / 2 - 60,
                    y: -1000
                })
                gsap.to(newNode.elem, {
                    y: -nRec.top + node.elem.getBoundingClientRect().top + 75,
                    /*onComplete: ()=>{
                        drawLine(node, newNode);
                    }*/
                })
                
            }

            else
                this.insertNode(node.left, newNode);
        }
        else {
            if (node.right === null) {
                node.right = newNode;
                gsap.set(newNode.elem, {
                    x: -nRec.left + node.elem.getBoundingClientRect().left + nRec.width / 2 + 60,
                    y: -1000
                })
                gsap.to(newNode.elem, {
                    y: -nRec.top + node.elem.getBoundingClientRect().top + 75,
                    /*onComplete: ()=>{
                        drawLine(node, newNode);
                    }*/
                })
            }
            else
                this.insertNode(node.right, newNode);
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
    /*pointer = document.createElement('div');
    pointer.classList.add("node");
    pointer.classList.add("pointer")
    treeElem.appendChild(pointer)
    gsap.set(pointer,{opacity:0})*/
});

function addToTree() {
    BST.insert(parseInt(inputVal));

}
function deleteFromTree(){
    BST.remove(parseInt(inputVal))
}
/*function drawLine(parentNode, childNode) {
    if (!parentNode || !childNode) return;
    const rect1 = parentNode.elem.getBoundingClientRect();
    const rect2 = childNode.elem.getBoundingClientRect();
    const rectKontejner = treeElem.getBoundingClientRect();
    const x1 = rect1.left - rectKontejner.left + rect1.width / 2;
      const y1 = rect1.top - rectKontejner.top + rect1.height / 2;
      const x2 = rect2.left - rectKontejner.left + rect2.width / 2;
      const y2 = rect2.top - rectKontejner.top + rect2.height / 2;

      const delka = Math.sqrt(Math.pow(x2 - x1, 2) + Math.pow(y2 - y1, 2));
      const uhel = Math.atan2(y2 - y1, x2 - x1);

      const cara = document.createElement('div');
      cara.classList.add('line');
      cara.style.left = `${x1}px`;
      cara.style.top = `${y1}px`;
      cara.style.height = `${delka}px`;
      cara.style.transform = `rotate(${uhel}rad)`;

      treeElem.appendChild(cara)

}*/


function changeValue() {
    inputVal = input.value;
};