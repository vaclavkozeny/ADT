const input = document.getElementById("inpt");
const addBtn = document.getElementById("addBtn");
const delBtn = document.getElementById('delBtn')
const setElem = document.getElementById('set');
const err = document.getElementById('error');
let set = new Set();
let bodySet = [];
let errorDisplayed = false;
let myWorld;
document.addEventListener('DOMContentLoaded', () => {
    gsap.set(err, { opacity: 0 })
})
Physics(function (world) {
    myWorld = world;

    const selem = setElem.getBoundingClientRect();
    const viewLeft = setElem.offsetLeft;
    const viewTop = setElem.offsetTop;
    const viewWidth = selem.width;
    const viewHeight = selem.height;

    const viewportBounds = Physics.aabb(
        viewLeft+20,
        viewTop+20,
        viewLeft + viewWidth-20,
        viewTop + viewHeight-20
    );
    // Okraje, kolize, gravitace
    world.add([
        Physics.behavior('edge-collision-detection', {
            aabb: viewportBounds,
            restitution: 0.6,
            cof: 0.6
        }),
        Physics.behavior('body-collision-detection'),
        Physics.behavior('body-impulse-response'),
        Physics.behavior('sweep-prune'),
        Physics.behavior('constant-acceleration', {
            acc: { x: 0, y: 0.001 } // zrychlení ve směru osy Y (dolů)
        }),

    ]);

    // Fyzika každého kroku
    world.on('step', function () {
        bodySet.forEach(body => {
            const pos = body.state.pos;
            const el = body.view;
            el.style.left = pos.get(0) + 'px';
            el.style.top = pos.get(1) + 'px';
        });
    });

    // Přidání prvku do množiny
    addBtn.onclick = () => {
        const value = input.value.trim();

        if (value === "") {
            error("Zadej hodnotu.");
            return;
        }

        if (set.has(value)) {
            error(`Hodnota "${value}" už ve množině existuje.`)
            return;
        }

        set.add(value);

        let elem = document.createElement('div');
        elem.textContent = inputOutputValue;
        elem.classList.add('data');
        elem.classList.add('set');
        setElem.appendChild(elem)

        let body = Physics.body('rectangle', {
            x: 100,
            y: 100,
            width: elem.getBoundingClientRect().width + 5,
            height: elem.getBoundingClientRect().height +5,
            vx: (Math.random() - 0.5) * 1,
            vy: (Math.random() - 0.5) * 1,
            treatment: 'dynamic',
            id: value
        });
        body.view = elem;
        bodySet.push(body);
        myWorld.add(body)

        input.value = ""; // Vyčistit input
    };
    delBtn.onclick = () => {
        const value = input.value.trim();
        if (value === "") {
            error("Zadej hodnotu.");
            return;
        }
        if (!set.has(value)) {
            error("Hodnota v množině není");
            return;
        }
        let body = bodySet.find(o => o.id == value);
        removeBodyAndView(body);
        bodySet.splice(bodySet.indexOf(body), 1);
        set.delete(value);

    }
    function removeBodyAndView(body) {
        world.remove(body);
        if (body.view) {
            setElem.removeChild(body.view);
        }
        bodySet.forEach(other => {
            if (other.treatment === 'dynamic') {
                //console.log("Postrkuji těleso:", other.id);
                other.state.vel.y += 0.1 + Math.random() * 0.05;
                world.step(0);
            }
        });

    }
    // Spustit fyziku
    Physics.util.ticker.on(function (time) {
        world.step(time);
    });
    Physics.util.ticker.start();
});
function changeValue() {
    inputOutputValue = input.value;
}
