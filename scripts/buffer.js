const input = document.getElementById('inpt');
const err = document.getElementById('error');
const bufferElem = document.getElementById('buffer');
const bufferSize = 8;
const headElem = document.createElement('div');
const tailElem = document.createElement('div');
const defaultEase = "power2.out";
const defaultDuration = 0.5;
let home = {};
let cellElems = [];
let head = 0;
let tail = 0;
let inputVal;
let animating = false;
let errorDisplayed = false;
let count = 0;

document.addEventListener('DOMContentLoaded', () => {
    gsap.set(err, { opacity: 0 }),
    init()
    home = {"x":parseInt(cellElems[0].style.left),"y":parseInt(cellElems[0].style.top)}
});
function init() {
    let cir = bufferElem.getBoundingClientRect();
    const radius = 150; // Poloměr kruhu
    const centerX = cir.left + cir.width / 2;
    const centerY = cir.top + cir.height / 2;
    for (let i = 0; i < bufferSize; i++) {
        const angle = (2 * Math.PI / bufferSize) * i;
        const x = centerX + radius * Math.cos(angle);
        const y = centerY + radius * Math.sin(angle);

        let cell = document.createElement('div');
        cell.className = 'cell';
        cell.style.left = `${x}px`;
        cell.style.top = `${y}px`;
        cell.id = i;

        cell.textContent = buffer[i] !== null ? buffer[i] : '';
        bufferElem.appendChild(cell);
        cellElems.push(cell)
    }
    headElem.classList.add("cell", "head");
    let rect = cellElems[0].getBoundingClientRect();
    headElem.style.left = rect.left + rect.width/2 + 'px';
    headElem.style.top = rect.top + rect.height/2  + 'px';
    bufferElem.appendChild(headElem);
    tailElem.classList.add("cell", "tail");
    tailElem.style.left = rect.left + rect.width/2 + 'px';
    tailElem.style.top = rect.top + rect.height/2  + 'px';
    bufferElem.appendChild(tailElem);
    same()
}
function bufferWrite() {
    if (animating) return;
    if (inputVal) {
        animating = true;

        // Pokud je buffer plný, posuň tail – přepisujeme nejstarší prvek
        if (count === bufferSize) {
            tail = (tail + 1) % bufferSize;
            count--; // snížíme, aby se o řádek níž mohl zase zvýšit
        }

        cellElems[head].textContent = inputVal;
        head = (head + 1) % bufferSize;
        count++;

        movePointer(head, headElem);
        movePointer(tail,tailElem);
        animating = false;
    }
}
function bufferRead() {
    if(animating) return;
    if(count > 0){
        animating = true;
        cellElems[tail].textContent = "";
        tail++;
        tail = tail%bufferSize;
        count--;
        movePointer(tail,tailElem)
        animating = false;
        return
    }
    error("Nemůžeš číst když není nic zapsáno")
    
}
function movePointer(index,elem){
    let cell = cellElems[index];
    let rect = cell.getBoundingClientRect();
    gsap.to(elem,{
        x: rect.left + (rect.width/2) - home["x"],
        y: rect.top + (rect.height/2) - home["y"],
        duration: defaultDuration,
        ease: defaultEase,
        opacity: 1
    })
    same()
    
}
function same(){
    if(head == tail){
        tailElem.style.backgroundColor = "orange"
    }else{
        tailElem.style.backgroundColor = "rgb(248,113,113)"
        headElem.style.backgroundColor = "rgb(52,211,153)"
    }
}
function changeValue() {
    inputVal = input.value;
}
