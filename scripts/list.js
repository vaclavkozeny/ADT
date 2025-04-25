let inputValue;
let inputPosition;
const ValueElem = document.getElementById("inpt_addValue");
const PositionElem = document.getElementById("inpt_addPosition");
const deleteTypeElem = document.getElementById("deleteType");
const err = document.getElementById('error');
const greenArrow = document.getElementById('inArrow');
const redArrow = document.getElementById('outArrow');
const listElem = document.getElementById('list');
let myId = 0;
let animating = false;
const defaultEase = "power2.out";
const defaultDuration = 0.5;
let list = [];
const listSize = 5;
errorDisplayed = false;
document.addEventListener('DOMContentLoaded', () => {
    let rec = listElem.getBoundingClientRect();
    let greenRect = greenArrow.getBoundingClientRect();
    let redRect = redArrow.getBoundingClientRect();
    gsap.set(greenArrow, {
        x: rec.x - greenRect.x - greenRect.width,
        y: rec.top - greenRect.y - greenRect.height,
        opacity: 0
    });
    gsap.set(redArrow, {
        y: (rec.bottom - redRect.y),
        opacity: 0
    });
    gsap.set(err, { opacity: 0 })
})


function listAdd() {
    if (animating) return;
    inputValue = ValueElem.value;
    inputPosition = PositionElem.value;
    let rec = listElem.getBoundingClientRect();
    let greenRect = greenArrow.getBoundingClientRect();
    const homeX = rec.x - greenRect.x - greenRect.width;
    if(list.length === listSize){
        error("List je plný");
        return;
    }
    if (inputValue && list.length < listSize && inputPosition === '') {
        animating = true;
        createDataElement(inputValue);
        let elem = list[myId];
        myId++;
        let tl = gsap.timeline({
            onComplete: () => {
                animating = false;
            }
        });
        tl.to(greenArrow, {
            x: homeX + ((list.length * (80)) + ((list.length - 1) * 10)),
            opacity: 1,
            duration: defaultDuration,
            ease: defaultEase
        }).to(elem, {
            y: 0,
            duration: defaultDuration,
            ease: defaultEase
        }).to(greenArrow, {
            opacity: 0,
            duration: 0.1,
        }).to(greenArrow, {
            x: homeX,
            duration: 0.1,
        })

    }
    else if (inputValue && inputPosition && inputPosition >= 0 && list.length < listSize) {
        animating = true;
        inputPosition = parseInt(inputPosition)
        let elem = document.createElement('div');
        elem.textContent = inputValue;
        elem.id = myId;
        elem.classList.add('data');
        elem.classList.add('list');

        list.splice(inputPosition, 0, elem);
        if (inputPosition >= listElem.children.length) {
            listElem.appendChild(elem);
            gsap.set(elem, { y: -500, opacity: 1 });
            let tl = gsap.timeline(
                {
                    onComplete: () => {
                        animating = false;
                    }
                }
            );
            tl.to(greenArrow, {
                x: homeX + ((list.length * (80)) + ((list.length - 1) * 10)),
                opacity: 1,
                duration: defaultDuration,
                ease: defaultEase
            }).to(elem, {
                y: 0,
                duration: defaultDuration,
                ease: defaultEase
            }).to(greenArrow, {
                opacity: 0,
                duration: 0.1,
            }).to(greenArrow, {
                x: homeX,
                duration: 0.1,
            })
        } else {
            let referenceNode = listElem.children[inputPosition];
            let elems = list.slice(inputPosition + 1);
            let tl = gsap.timeline({
                onComplete: () => {
                    animating = false;
                }
            });
            tl.to(elems, {
                x: 90,
                duration: defaultDuration,
                ease: defaultEase
            });
            gsap.set(elem, { y: -500, opacity: 1 });
            tl.add(() => {
                listElem.insertBefore(elem, referenceNode);
            }, ">");
            tl.to(greenArrow, {
                x: ((inputPosition + 1) * 80) + (inputPosition * 10),
                opacity: 1,
                duration: defaultDuration,
                ease: defaultEase
            }, ">")
            tl.to(elem, {
                y: 0,
                duration: 1,
                ease: defaultEase
            }, "<");
            tl.to(elems, {
                x: 0,
                duration: 0,
            }, "<");

            tl.to(greenArrow, {
                opacity: 0,
                duration: defaultDuration,
            }).to(greenArrow, {
                x: homeX,
                duration: 0,
            }, ">")
        }
        myId++;
    }
}
function createDataElement(_inputValue) {
    let elem = document.createElement('div');
    elem.textContent = _inputValue;
    elem.id = myId;
    elem.classList.add('data');
    elem.classList.add('list');
    listElem.appendChild(elem);
    list.push(elem);
    gsap.set(elem, { y: 0, opacity: 1 });
}
function listDelete() {
    deleteValue = ValueElem.value;
    deleteType = deleteTypeElem.value;
    if (animating) return;
    
    if (deleteValue && deleteType === "Hodnota" && list.some(div=>div.textContent.includes(deleteValue))) {
        animating = true;
        deleteValue = list.findIndex(div=>div.textContent.includes(deleteValue))
        let elem = list[deleteValue]
        let tl = gsap.timeline({
            onComplete: () => {
                animating = false;
                myId--;
            }
        })
        tl.to(redArrow, {
            x: -((listSize - deleteValue) * 80) - ((listSize - deleteValue) * 10),
            opacity: 1,
            duration: defaultDuration,
            ease: defaultEase
        }).to(elem, {
            y: -500,
            duration: defaultDuration,
            ease: defaultEase,
            onComplete: () => {
                listElem.removeChild(elem)
                list.splice(deleteValue,1)
            }
        }).to(redArrow, {
            opacity: 0,
            duration: defaultDuration,
        }).to(redArrow, {
            x: 0,
            duration: 0,
        }, ">")
    }
    if (deleteValue && deleteType === "Pozice") {
        animating = true;
        deleteValue = parseInt(deleteValue);
        if(deleteValue >= list.length){
            error("Index je mimo");
            animating = false;
            return;
        } 
        let elem = list[deleteValue]
        let tl = gsap.timeline({
            onComplete: () => {
                animating = false;
                myId--;
            }
        })
        tl.to(redArrow, {
            x: -((listSize - deleteValue) * 80) - ((listSize - deleteValue) * 10),
            opacity: 1,
            duration: defaultDuration,
            ease: defaultEase
        }).to(elem, {
            y: -500,
            duration: defaultDuration,
            ease: defaultEase,
            onComplete: () => {
                listElem.removeChild(elem)
                list.splice(deleteValue,1)
            }
        }).to(redArrow, {
            opacity: 0,
            duration: defaultDuration,
        }).to(redArrow, {
            x: 0,
            duration: 0.1,
        }, ">")
    }
}
function changeValue() {
    inputValue = ValueElem.value;
    inputPosition = PositionElem.value;
}