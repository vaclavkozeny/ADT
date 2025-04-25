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
// Konfigurace pro graf
const container = document.getElementById('network');
const data = { nodes: nodesData, edges: edgesData };
const options = {interaction: {
    dragView: false,
    zoomView: false
  },
  physics: {
    enabled: true,  
    solver: 'forceAtlas2Based',
    forceAtlas2Based: {
      gravitationalConstant: -50,
      centralGravity: 0.01,
      springLength: 100,
      springConstant: 0.08,
      damping: 0.4
    },
    minVelocity: 0.75
  }};

// Vytvoření grafu
const network = new vis.Network(container, data, options);
nextNodeId = 0;
function addNode() {
    if(inputOutputValue == '' || inputOutputValue == null) return
    nodesData.add({ id: nextNodeId, label: inputOutputValue });
    nextNodeId++;
  }
function addEdge(){
    
}

  function changeValue() {
    inputOutputValue = input.value;
}