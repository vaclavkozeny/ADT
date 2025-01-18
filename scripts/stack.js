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
var input = document.getElementById('inpt');
const stacksize = 5;
var stack = [];
function sPush(){
    if(stack.length < stacksize){
        if(inputval){
            stack.push(inputval);
            const elem = document.createElement('p');
            elem.textContent = inputval;
            elem.id = stack.length;
            elem.classList.add('data');
            document.getElementById('stack').appendChild(elem)
        }
    }   
    else
        console.log("stack is full");
}
function sPop(){
    if(stack.length > 0){
        stack.pop();
        document.getElementById('stack').removeChild(document.getElementById(stack.length+1))
    }
        
    else
        console.log("stack is empty");
}
function changeValue(){
    inputval = input.value;
}

