var inputValue;
var inputPosition;
var deleteValue;
var deletePosition;
var inputValueElem = document.getElementById("inpt_addValue");
var inputPositionElem = document.getElementById("inpt_addPosition");
var deleteValueElem = document.getElementById("inpt_deleteValue");
var deletePositionElem = document.getElementById("inpt_deletePosition");
var err = document.getElementsByClassName('error')[0];
var list = [];
function listAdd(){
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
    if(deletePosition){
        list.splice(parseInt(deletePosition),1)
    }
    else if(deleteValue){
        list.splice(list.indexOf(parseInt(deleteValue)),1)
    }
    redraw()
}
function changeValue() {
    inputValue = inputValueElem.value;
    inputPosition = inputPositionElem.value;
    deleteValue = deleteValueElem.value;
    deletePosition = deletePositionElem.value;
}