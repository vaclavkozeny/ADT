// tabs mapping
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

//--------------------------------------------
var inputval;
var stacksize;
var input = document.getElementById('inpt');
var err = document.getElementsByClassName('error')[0];
const stackSize = 5;
var stack = [];
var errorFullDisplayed = false;
var errorEmptyDisplayed = false;

function sPush(){
    if(stack.length < stackSize){
        if(inputval){
            if(stack.length != 0){
                document.getElementById(`${stack.length}`).classList.add("hideBefore");
                document.getElementById(`${stack.length}`).classList.add("hideAfter");
            }
            stack.push(inputval);
            //-------- create element ------------------
            const elem = document.createElement('div');
            elem.textContent = inputval;
            elem.id = stack.length;
            elem.classList.add('data');
            elem.classList.add('stack');
            elem.style.order = stackSize-stack.length;
            document.getElementById('stack').appendChild(elem);
        }
    }   
    else{
        if(errorEmptyDisplayed === false && errorFullDisplayed === false){
            errorFullDisplayed = true;
            err.textContent = "Stack is full";
            err.style.display = 'flex';
            setTimeout(() => {
                err.style.display = 'none';
            }, 1000); 
            errorFullDisplayed = false;
        }
    }
        
}

function sPop(){
    if(stack.length > 0){
        document.getElementById('stack').removeChild(document.getElementById(stack.length));
        stack.pop();
        if(stack.length > 0){
            document.getElementById(`${stack.length}`).classList.remove("hideBefore");
            document.getElementById(`${stack.length}`).classList.remove("hideAfter");
        }
           
    }     
    else{
        if(errorEmptyDisplayed === false && errorFullDisplayed === false){
            errorEmptyDisplayed = true;
            err.textContent = "Stack is empty";
            err.style.display = 'flex';
            setTimeout(() => {
                err.style.display = 'none';
            }, 1000); 
            errorEmptyDisplayed = false;
        }
    }
}   
//------------------------------------
//onchange
function changeValue(){
    inputval = input.value;
}

