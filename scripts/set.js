var inputOutputValue;
const setSize = 5;
var set = [];
var input = document.getElementById("inpt");
var err = document.getElementsByClassName('error')[0];

function setAdd() {
    if (inputOutputValue && set.length < setSize) {
        if(!(set.includes(inputOutputValue))){
            set.push(inputOutputValue);
            redraw();
        }else{
            err.textContent = ""
        }
        
    }
    else {
        err.textContent = "Set is full";
    }
    if (err.textContent != "") {
        if (errorEmptyDisplayed === false && errorFullDisplayed === false) {
            errorFullDisplayed = true;
            err.textContent = "Queue is full";
            err.style.display = 'flex';
            setTimeout(() => {
                err.style.display = 'none';
                errorFullDisplayed = false;
            }, 1000);

        }
    }

}
function redraw() {
    const q = document.getElementById('set');
    while (q.firstChild) {
        q.removeChild(q.firstChild);
    }
    set.map((item, index) => {
        const elem = document.createElement('div');
        elem.textContent = item;
        elem.id = index;
        elem.classList.add('data');
        elem.classList.add('set');
        elem.style.order = Math.round(Math.random() * 1000);
        q.appendChild(elem);
    })
}
function setDelete() {
    if (inputOutputValue && set.length > 0) {
        var jmp = true;
        for (var i = 0; i < set.length; i++) {
            if (inputOutputValue === set[i]) {
                set.splice(i, 1);
                redraw();
                jmp = false;
                break;
            }
        }
        if (jmp) {
            err.textContent = "Value is not in set";
            err.style.display = 'flex';
            setTimeout(() => {
                err.style.display = 'none';
            }, 1000);
        }
    } else {
        err.textContent = "Set is empty";
        err.style.display = 'flex';
        setTimeout(() => {
            err.style.display = 'none';
        }, 1000);
    }
}
function changeValue() {
    inputOutputValue = input.value;
}

