var inputval;
var stacksize;
var input = document.getElementById('inpt');
var err = document.getElementsByClassName('error')[0];
const stackSize = 5;
var stack = [];
var errorFullDisplayed = false;
var errorEmptyDisplayed = false;
var animating = false;
var greenArrow = document.getElementById('inArrow');
var redArrow = document.getElementById('outArrow');
var stackElem = document.getElementById('stack');


document.addEventListener('DOMContentLoaded', () => {
    gsap.set(greenArrow, { y: stackElem.getBoundingClientRect().height, opacity: 1 })
    gsap.set(redArrow, { y: stackElem.getBoundingClientRect().height, opacity: 0 })
})
function stackPush() {
    if (!animating) {
        animating = true;
        if (stack.length < stackSize) {
            if (inputval) {
                stack.push(inputval);
                //-------- create element ------------------
                const elem = document.createElement('div');
                elem.textContent = inputval;
                elem.id = stack.length;
                elem.classList.add('data');
                elem.classList.add('stack');
                elem.style.order = stackSize - stack.length;
                stackElem.appendChild(elem);
                var pos = elem.style.top;
                gsap.set(elem, { y: -500, opacity: 1 });

                gsap.to(elem, {
                    y: pos,
                    duration: 0.5,
                    ease: "power2.out",
                });
                if(stack.length === stackSize){
                    gsap.to(greenArrow, {
                        y: stackElem.getBoundingClientRect().height - (stack.length * elem.offsetHeight) - 2,
                        duration: 0.25,
                        opacity: 0,
                        ease: "power2.out"
                    });
                }else{
                    gsap.to(greenArrow, {
                        y: stackElem.getBoundingClientRect().height - (stack.length * elem.offsetHeight) - 2,
                        duration: 0.25,
                        ease: "power2.out"
                    });
                }
                
                gsap.to(redArrow, {
                    y: stackElem.getBoundingClientRect().height - ((stack.length - 1) * elem.offsetHeight) - 2,
                    duration: 0.25,
                    opacity: 1,
                    ease: "power2.out",
                    onComplete: () => {
                        animating = false;
                    }
                });
                animating = false;
            }
        }

        else {
            if (errorEmptyDisplayed === false && errorFullDisplayed === false) {
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
}

function stackPop() {
    if (stack.length > 0) {
        
        /*document.getElementById('stack').removeChild(document.getElementById(stack.length));
        stack.pop();
        if (stack.length > 0) {
            document.getElementById(`${stack.length}`).classList.remove("hideBefore");
            document.getElementById(`${stack.length}`).classList.remove("hideAfter");
        }*/
        var elem = document.getElementById(stack.length)
        console.log(elem)
        gsap.to(elem, {
            y: -500,
            duration: 0.5,
            ease: "power2.out",
        });
        gsap.to(greenArrow, {
            y: "+=80",
            duration: 0.25,
            opacity: 1,
            ease: "power2.out"
        });
        
        
        if(stack.length === 1){
            gsap.to(redArrow, {
                y: "+=80",
                duration: 0.25,
                opacity: 0,
                ease: "power2.out",
                onComplete: () => {
                    animating = false;
                }
            });
        }else{
            gsap.to(redArrow, {
                y: "+=80",
                duration: 0.25,
                opacity: 1,
                ease: "power2.out",
                onComplete: () => {
                    animating = false;
                }
            });
        }
        stackElem.removeChild(elem);
        stack.pop();

    }
    else {
        if (errorEmptyDisplayed === false && errorFullDisplayed === false) {
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
function changeValue() {
    inputval = input.value;
}

