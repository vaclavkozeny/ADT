var inputValue;
var inputPosition;
var deleteValue;
var deleteType;
var inputValueElem = document.getElementById("inpt_addValue");
var inputPositionElem = document.getElementById("inpt_addPosition");
var deleteElem = document.getElementById("inpt_delete");
var deleteTypeElem = document.getElementById('deleteType');
var err = document.getElementById('error');
var greenArrow = document.getElementById('inArrow');
var redArrow = document.getElementById('outArrow');
var listElem = document.getElementById('list');
var myId = 0;
var animating = false;
const defaultEase = "power2.out";
const defaultDuration = 0.5;
var list = [];
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
        x: rec.x - redRect.x - redRect.width,
        y: (rec.bottom - redRect.y),
        //opacity: 0
    });
    gsap.set(err, { opacity: 0 })
})


function listAdd() {
    if (animating) return;
    let rec = listElem.getBoundingClientRect();
    let greenRect = greenArrow.getBoundingClientRect();
    const homeX = rec.x - greenRect.x - greenRect.width;
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
            console.log(elems)
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
    deleteValue = deleteElem.value;
    deleteType = deleteTypeElem.value;
    if (animating) return;
    
    let rec = listElem.getBoundingClientRect();
    let redRect = redArrow.getBoundingClientRect();
    const homeX = rec.x - redRect.x - redRect.width;
    console.log(homeX)
    if (deleteValue && deleteType === "Pozice") {
        animating = true;
        deleteValue = parseInt(deleteValue);
        if(deleteValue > list.length){
            error("Index je mimo");
            animating = false;
            return;
        } 
        var elem = list[deleteValue]
        let tl = gsap.timeline({
            onComplete: () => {
                animating = false;
                myId--;
            }
        })
        tl.to(redArrow, {
            x: ((deleteValue + 1) * 80) + (deleteValue * 10),
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
            opacity: 1,
            duration: defaultDuration,
        }).to(redArrow, {
            x: 0,
            duration: 0.1,
        }, ">")
    }
    else if (deleteValue && deleteType === "Hodnota" && list.some(div=>div.textContent.includes(deleteValue))) {
        console.log(animating);
        
        animating = true;
        deleteValue = list.findIndex(div=>div.textContent.includes(deleteValue))
        var elem = list[deleteValue]
        let tl = gsap.timeline({
            onComplete: () => {
                animating = false;
                myId--;
            }
        })
        tl.to(redArrow, {
            x: ((deleteValue + 1) * 80) + (deleteValue * 10),
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
            opacity: 1,
            duration: defaultDuration,
        }).to(redArrow, {
            x: homeX,
            duration: 0,
        }, ">")
    }
}
function changeValue() {
    inputValue = inputValueElem.value;
    inputPosition = inputPositionElem.value;
    deleteValue = deleteElem.value;
    deleteType = deleteTypeElem.value;
}