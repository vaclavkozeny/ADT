/*const nodes = new vis.DataSet([
    { id: 1, label: 'Node 1' },
    { id: 2, label: 'Node 2' },
    { id: 3, label: 'Node 3' },
    {id: 69, label: 'test'}
]);

const edges = new vis.DataSet([
    { from: 1, to: 2 },
    { from: 2, to: 3 },
    {from: 3, to: 3}
]);*/
let inputOutputValue;
const input = document.getElementById("inpt");
let nodesData = new vis.DataSet([]);
let edgesData = new vis.DataSet([]);
let selectedNode;
const toggleElem = document.getElementById("toggle");
let mode;
// Konfigurace pro graf
const container = document.getElementById('network');
container.addEventListener('click',()=>{
  if(mode == "Přidat hrany"){
    if(selectedNode && selectedNode.length != 0){
      console.log(selectedNode)
      let newNode = network.getSelectedNodes()
      edgesData.add({from:selectedNode[0], to: newNode[0]})
      selectedNode = null
    }else{
      selectedNode = network.getSelectedNodes()
    }
  }else if(mode == "Odebrat node"){
    let del = network.getSelectedNodes()
    if(del && del.length != 0){
      nodesData.remove(del[0])
    }
  }
})
const data = { nodes: nodesData, edges: edgesData };
const options = {interaction: {
    dragView: false,
    zoomView: false
  },
  physics: {
    enabled: true,  
    solver: 'forceAtlas2Based',
    forceAtlas2Based: {
      gravitationalConstant: -10,
      centralGravity: 0.01,
      springLength: 10,
      springConstant: 0.08,
      damping: 0.2
    },
    minVelocity: 0.25
  }};

// Vytvoření grafu
const network = new vis.Network(container, data, options);
nextNodeId = 0;
function addNode() {
    if(inputOutputValue == '' || inputOutputValue == null) return
    nodesData.add({ id: nextNodeId, label: inputOutputValue });
    nextNodeId++;
  }

function changeValue() {
    inputOutputValue = input.value;
}
function changeValueToggle(){
  mode = toggleElem.value
  selectedNode = null
}
changeValueToggle()