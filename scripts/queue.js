var inputval;
const queueSize = 5;
var queue = [];
var i = 0;
var input = document.getElementById("inpt");
var err = document.getElementsByClassName('error')[0];
var errorFullDisplayed = false;
var errorEmptyDisplayed = false;

function enqueue(){
    if(queue.length < queueSize){
        if(inputval){
            queue.push(inputval);
        }
        redraw();
    }else{
        if(errorEmptyDisplayed === false && errorFullDisplayed === false){
            errorFullDisplayed = true;
            err.textContent = "Queue is full";
            err.style.display = 'flex';
            setTimeout(() => {
                err.style.display = 'none';
            }, 1000); 
            errorFullDisplayed = false;
        }
    }
    

}
function redraw(){
    const q = document.getElementById('queue');
    while (q.firstChild) {
        q.removeChild(q.firstChild);
    }
    queue.map((item, index)=>{
        const elem = document.createElement('div');
        elem.textContent = item;
        elem.id = index;
        elem.classList.add('data');
        elem.classList.add('queue');
        if(index != queue.length-1){
            elem.classList.add('hideBefore');
        }
        if(index === 0){
            elem.classList.add('first');
        }
        if(index === queueSize-1){
            elem.classList.add('hideBefore');
        }
        q.appendChild(elem);
    })
}
function dequeue(){
    if(queue.length > 0){
        queue.shift();
        redraw();
    }else{
        if(errorEmptyDisplayed === false && errorFullDisplayed === false){
            errorEmptyDisplayed = true;
            err.textContent = "Queue is empty";
            err.style.display = 'flex';
            setTimeout(() => {
                err.style.display = 'none';
            }, 1000); 
            errorEmptyDisplayed = false;
        }
    }
}
function changeValue(){
    inputval = input.value;
}

