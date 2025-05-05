let inputval;
let stacksize;
const input = document.getElementById('inpt');
const err = document.getElementById('error');
const stackSize = 5;
let stack = [];
let errorDisplayed = false;
let animating = false;
const greenArrow = document.getElementById('inArrow');
const redArrow = document.getElementById('outArrow');
const stackElem = document.getElementById('stack');
const defaultEase = "power2.out";
const defaultDuration = 0.5;

document.addEventListener('DOMContentLoaded', () => {
    gsap.set(greenArrow, { y: stackElem.getBoundingClientRect().height, opacity: 1 });
    gsap.set(redArrow, { y: stackElem.getBoundingClientRect().height, opacity: 0 });
    gsap.set(err,{opacity:0})
})
function stackPush() {
    if (animating) return;

    if (stack.length < stackSize) {
        if (inputval) {
            animating = true;
            stack.push(inputval);
            //-------- create element ------------------
            let elem = document.createElement('div');
            elem.textContent = inputval;
            elem.id = stack.length;
            elem.classList.add('data');
            elem.classList.add('stack');
            elem.style.order = stackSize - stack.length;
            stackElem.appendChild(elem);
            gsap.set(elem, { y: -500, opacity: 1 });
            stackHeight = stackElem.getBoundingClientRect().height;
            let tl = gsap.timeline({
                onComplete:()=>{
                    animating = false;
                }
            });
            tl.to(elem, {
                y: 0,
                duration: defaultDuration,
                ease: defaultEase,
            }).to(greenArrow, {
                y: `-=${elem.offsetHeight+2}`,
                duration: defaultDuration,
                opacity: stack.length === stackSize ? 0 : 1,
                ease: defaultEase
            }).to(redArrow,{
                y: `-=${stack.length === 1 ? 0 : (elem.offsetHeight + 2)}`,
                duration: defaultDuration,
                opacity: 1,
                ease: defaultEase,
            },"<")
        }
    }

    else {
        error('Zásobník je plný');
    }

}

function stackPop() {
    if (animating) return;

    if (stack.length > 0) {
        animating = true;
        let elem = document.getElementById(stack.length);
        stack.pop();
        let tl = gsap.timeline(
            {
                onComplete: () => {
                    stackElem.removeChild(elem);
                    animating = false;
                }
            }
        );
        tl.to(elem, {
            y: -500,
            duration: defaultDuration,
            ease: defaultEase
        }).to(greenArrow, {
            y: `+=${elem.offsetHeight + 2}`,
            duration: defaultDuration,
            opacity: 1,
            ease: defaultEase
        }, "<").to(redArrow, {
            y: ()=>{
                if(stack.length === 0) return stackElem.getBoundingClientRect().height;
                return `+=${elem.offsetHeight + 2}`;
            },
            duration: defaultDuration,
            opacity: stack.length === 0 ? 0 : 1,
            ease: defaultEase,
        }, "<")


    }
    else {
        error('Zásobník je prázdný, není co odebrat')
    }
}

//------------------------------------
//onchange
function changeValue() {
    inputval = input.value;
}