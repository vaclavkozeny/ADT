var inputValue;
var inputPosition;
var deleteValue;
var deleteType;
var inputValueElem = document.getElementById("inpt_addValue");
var inputPositionElem = document.getElementById("inpt_addPosition");
var deleteElem = document.getElementById("inpt_delete");
var deleteTypeElem = document.getElementById('deleteType');
var err = document.getElementsByClassName('error')[0];
var list = [];
function listAdd(){
    inputValue = parseInt(inputValue)
    if(inputValue && list.length === 0){
        list.push(inputValue);
    }
    else if(inputValue && inputPosition && inputPosition > list.length){
        list.push(inputValue);
    }
    else if(inputValue && inputPosition && inputPosition < 0){
        list.splice(0,0,inputValue);
    }
    else if(inputValue && inputPosition){
        list.splice(inputPosition,0,inputValue);
    }
    else if(inputValue && inputPosition === ''){
        list.push(inputValue)
    }
    redraw();
}
function redraw(){
    const q = document.getElementById('list');
    while (q.firstChild) {
        q.removeChild(q.firstChild);
    }
    list.map((item, index) => {
        const elem = document.createElement('div');
        elem.textContent = item;
        elem.id = index;
        elem.classList.add('data');
        elem.classList.add('list');
        elem.setAttribute('data-before',index.toString());
        q.appendChild(elem);
    })
}
function listDelete(){
    deleteValue = parseInt(deleteValue);
    if(deleteValue &&  deleteType === "Pozice"){
        list.splice(deleteValue,1);
    }
    else if(deleteValue && deleteType === "Hodnota" && list.includes(deleteValue)){
        list.splice(list.indexOf(deleteValue),1);
    }
    redraw();
}
function changeValue() {
    inputValue = inputValueElem.value;
    inputPosition = inputPositionElem.value;
    deleteValue = deleteElem.value;
    deleteType = deleteTypeElem.value;
}