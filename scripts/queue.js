var tabbtns = document.querySelectorAll(".btn");
var tabcontent = document.querySelectorAll(".cont");

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
function enqueue(){
    if(elementQueue.length < queueSize){
        if(inputval){
            const elem = document.createElement('div');
            elem.textContent = inputval;
            elem.id = i;
            elem.classList.add('data');
            elem.classList.add('queue')
            elem.style.order = i++;
            elementQueue.push(elem);
            document.getElementById('queue').appendChild(elem);
        }
    }   
    else
        console.log("queue is full");
}
function dequeue(){
    if(elementQueue.length > 0){
        document.getElementById('queue').removeChild(document.getElementById(`${elementQueue[0].id}`));
        elementQueue.shift();
    }
        
    else
        console.log("queue is empty");
}
function changeValue(){
    inputval = input.value;
}

