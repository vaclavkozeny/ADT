let inputval;
const queueSize = 5;
let queue = [];
const input = document.getElementById("inpt");
const err = document.getElementById('error');
let errorDisplayed = false;
const greenArrow = document.getElementById('inArrow');
const redArrow = document.getElementById('outArrow');
const queueElem = document.getElementById('queue');
let myId = 0;
let animating = false;
const defaultEase = "power2.out";
const defaultDuration = 0.5;

function arrowResize() {
    let rec = queueElem.getBoundingClientRect();
    if (window.innerWidth < 768) {
        console.log(rec.width / 5)
        greenArrow.width = rec.width / 5 - 3
        redArrow.width = rec.width / 5 - 3
    }

    let greenRect = greenArrow.getBoundingClientRect();
    let redRect = redArrow.getBoundingClientRect();
    gsap.set(greenArrow, {
        x: rec.x - greenRect.x,
        y: rec.top - greenRect.y - greenRect.height
    });
    gsap.set(redArrow, {
        x: rec.x - redRect.x,
        y: (rec.bottom - redRect.y),
        opacity: 0
    });
    gsap.set(err, { opacity: 0 })
}

document.addEventListener('DOMContentLoaded', arrowResize)

function enqueue() {
    if (animating) return;
    if (queue.length < queueSize) {
        if (inputval) {
            input.value = "";
            let w = queueElem.getBoundingClientRect().width;
            animating = true;
            myId++;
            let elem = document.createElement('div');
            elem.textContent = inputval;
            elem.id = myId;
            elem.classList.add('data');
            elem.classList.add('queue')
            elem.style.width = Math.min(w / 5 - 3, 80) + "px"
            //elem.classList.add('queue');
            queueElem.appendChild(elem);
            queue.push(elem);
            gsap.set(elem, { y: -500, x: queueElem.getBoundingClientRect().right - (queue.length * (elem.offsetWidth + 2)), opacity: 1 });
            let tl = gsap.timeline({
                onComplete: () => {
                    animating = false;
                }
            });
            tl.to(elem, {
                y: 0,
                duration: defaultDuration,
                ease: defaultEase,
            }).to(elem, {
                x: 0,
                duration: defaultDuration,
                ease: defaultEase
            }).to(greenArrow, {
                x: (queue.length + 1) * (elem.offsetWidth + 2),
                duration: defaultDuration,
                ease: defaultEase,
                opacity: queue.length === queueSize ? 0 : 1
            }).to(redArrow, {
                opacity: queue.length === 0 ? 0 : 1,
                duration: defaultDuration,
                ease: defaultEase
            }, "<")
            input.value = "";
            changeValue()
        }else{
            error("Zadej hodnotu")
        }
    } else {
        error("Fronta je plná")
    }
}

function dequeue() {
    if (animating) return;
    if (queue.length > 0) {
        animating = true;
        let elem = queue[0];
        let tl = gsap.timeline({
            onComplete: () => {
                gsap.to(greenArrow, {
                    x: queue.length * (elem.offsetWidth + 2),
                    duration: 0.5,
                    ease: "power2.out",
                    opacity: 1
                });
                elem.remove();
                queue.shift();
                gsap.to(redArrow, {
                    opacity: queue.length === 0 ? 0 : 1,
                    duration: defaultDuration,
                    ease: defaultEase
                })
                animating = false;
            }
        });
        tl.to(elem, {
            x: -100,
            duration: 0.5,
            ease: "power2.out",
        }).to(elem, {
            y: -500,
            duration: 0.5,
            ease: "power2.out",
        })
        input.value = "";
        changeValue()

    } else {
        error('Fronta je prázdná, není co odebrat')
    }

}
function changeValue() {
    inputval = input.value;
}

