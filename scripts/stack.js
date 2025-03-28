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
const defaultEase = "power2.out";
const defaultDuration = 0.5;

document.addEventListener('DOMContentLoaded', () => {
    gsap.set(greenArrow, { y: stackElem.getBoundingClientRect().height, opacity: 1 })
    gsap.set(redArrow, { y: stackElem.getBoundingClientRect().height, opacity: 0 })
})
function stackPush() {
    if (animating) return;

    if (stack.length < stackSize) {
        if (inputval) {
            animating = true;
            stack.push(inputval);
            //-------- create element ------------------
            const elem = document.createElement('div');
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
                y: stackHeight - (stack.length * elem.offsetHeight) - 2,
                duration: defaultDuration,
                opacity: stack.length === stackSize ? 0 : 1,
                ease: defaultEase
            }).to(redArrow,{
                y: stackHeight - ((stack.length - 1) * elem.offsetHeight) - 2,
                duration: defaultDuration,
                opacity: 1,
                ease: defaultEase,
            },"<")
            /*gsap.to(elem, {
                y: 0,
                duration: 0.5,
                ease: "power2.out",
            });
            if (stack.length === stackSize) {
                gsap.to(greenArrow, {
                    y: stackHeight - (stack.length * elem.offsetHeight) - 2,
                    duration: 0.25,
                    opacity: 0,
                    ease: "power2.out"
                });
            } else {
                gsap.to(greenArrow, {
                    y: stackHeight - (stack.length * elem.offsetHeight) - 2,
                    duration: 0.25,
                    ease: "power2.out"
                });
            }

            gsap.to(redArrow, {
                y: stackHeight - ((stack.length - 1) * elem.offsetHeight) - 2,
                duration: 0.25,
                opacity: 1,
                ease: "power2.out",
                onComplete: () => {
                    animating = false;
                }
            });*/
        }
    }

    else {
        if (errorEmptyDisplayed === false && errorFullDisplayed === false) {
            errorFullDisplayed = true;
            err.textContent = "Stack is full";
            err.style.display = 'flex';
            setTimeout(() => {
                err.style.display = 'none';
                errorFullDisplayed = false;
            }, 1000);

        }
    }

}

function stackPop() {
    if (animating) return;

    if (stack.length > 0) {
        animating = true;
        stackHeight = stackElem.getBoundingClientRect().height;
        var elem = document.getElementById(stack.length);
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
            duration: 0.5,
            ease: "power2.out"
        }).to(greenArrow, {
            y: `+=${elem.offsetHeight + 2}`,
            duration: 0.25,
            opacity: 1,
            ease: "power2.out"
        }, "<").to(redArrow, {
            y: `+=${elem.offsetHeight + 2}`,
            duration: 0.25,
            opacity: stack.length === 0 ? 0 : 1,
            ease: "power2.out",
        }, "<")
        /*gsap.to(elem, {
            y: -500,
            duration: 0.5,
            ease: "power2.out",
        });
        gsap.to(greenArrow, {
            y: `+=${elem.offsetHeight + 2}`,
            duration: 0.25,
            opacity: 1,
            ease: "power2.out"
        });


        if (stack.length === 1) {
            gsap.to(redArrow, {
                y: `+=${elem.offsetHeight + 2}`,
                duration: 0.25,
                opacity: 0,
                ease: "power2.out",
                onComplete: () => {
                    animating = false;
                }
            });
        } else {
            gsap.to(redArrow, {
                y: `+=${elem.offsetHeight + 2}`,
                duration: 0.25,
                opacity: 1,
                ease: "power2.out",
                onComplete: () => {
                    animating = false;
                }
            });
        }*/


    }
    else {
        if (errorEmptyDisplayed === false && errorFullDisplayed === false) {
            errorEmptyDisplayed = true;
            err.textContent = "Stack is empty";
            err.style.display = 'flex';
            setTimeout(() => {
                err.style.display = 'none';
                errorEmptyDisplayed = false;
            }, 1000);

        }
    }
}

//------------------------------------
//onchange
function changeValue() {
    inputval = input.value;
}

