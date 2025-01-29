var tabbtns = document.querySelectorAll(".btn");
var tabcontent = document.querySelectorAll(".content");

if(tabbtns && tabcontent){
    tabbtns.forEach(b=>{
        b.addEventListener('click',()=>{
            var tabid = b.getAttribute('id');
            tabbtns.forEach(bt=>{bt.classList.remove('active')});
            b.classList.add('active');
            tabcontent.forEach(c=>{
                c.classList.remove('active');
                if(c.id == tabid){
                    c.classList.add('active');
                }
            })
        })
    })
}

var inputval;
const queueSize = 5;
var elementQueue = [];
var i = 0;
var input = document.getElementById("inpt");
var err = document.getElementsByClassName('error')[0];
var errorFullDisplayed = false;
var errorEmptyDisplayed = false;
function enqueue(){
    if(elementQueue.length < queueSize){
        if(inputval){
            if(elementQueue.length > 0){
                document.getElementById(`${i-1}`).classList.add("hideBefore");
            }
            const elem = document.createElement('div');
            elem.textContent = inputval;
            elem.id = i;
            elem.classList.add('data');
            elem.classList.add('queue')
            elem.style.order = i++;
            elementQueue.push(elem);
            document.getElementById('queue').appendChild(elem);
            if(elementQueue.length === 1){
                elementQueue[0].classList.add("first");
            }
        }
    }   
    else{
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
function dequeue(){
    if(elementQueue.length > 0){
        document.getElementById('queue').removeChild(document.getElementById(`${elementQueue[0].id}`));
        elementQueue.shift();
        if(elementQueue.length > 0){
            elementQueue[0].classList.add("first");
        }
    }
        
    else{
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

