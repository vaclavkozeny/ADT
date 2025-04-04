var inputval;
const queueSize = 5;
var queue = [];
var i = 0;
var input = document.getElementById("inpt");
var err = document.getElementById('error');
var errorDisplayed = false;
var greenArrow = document.getElementById('inArrow');
var redArrow = document.getElementById('outArrow');
var queueElem = document.getElementById('queue');
var myId = 0;
var animating = false;
const defaultEase = "power2.out";
const defaultDuration = 0.5;

document.addEventListener('DOMContentLoaded', () => {
    let rec = queueElem.getBoundingClientRect();
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
    gsap.set(err,{opacity:0})
})

function enqueue() {
    if (animating) return;
    if (queue.length < queueSize) {
        if (inputval) {
            animating = true;
            myId++;
            var elem = document.createElement('div');
            elem.textContent = inputval;
            elem.id = myId;
            elem.classList.add('data');
            elem.classList.add('queue');
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
        }
    } else {
        error("Queue is full")
    }
}

function dequeue() {
    if (animating) return;
    if (queue.length > 0) {
        animating = true;
        var elem = queue[0];
        console.log(elem)
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




    } else {
        error('Queue is empty')
        }

}
function changeValue() {
    inputval = input.value;
}

