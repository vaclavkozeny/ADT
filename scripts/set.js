var input = document.getElementById("inpt");
var addBtn = document.getElementById("addBtn");
var setElem = document.getElementById('set');
var err = document.getElementById('error');
const set = new Set();
const bodySet = [];
var errorDisplayed = false;
var myWorld;
document.addEventListener('DOMContentLoaded', () => {
    gsap.set(err, { opacity: 0 })
})
Physics(function (world) {
    myWorld = world;

    const selem = setElem.getBoundingClientRect();
    const viewWidth = selem.width;
    const viewHeight = selem.height;

    const viewportBounds = Physics.aabb(0, 0, viewWidth, viewHeight);

    // Okraje, kolize, gravitace
    world.add([
        Physics.behavior('edge-collision-detection', {
            aabb: viewportBounds,
            restitution: 0.6,
            cof: 0.99
        }),
        Physics.behavior('body-collision-detection'),
        Physics.behavior('sweep-prune'),
        Physics.behavior('constant-acceleration'),
        Physics.behavior('body-impulse-response')
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

        var elem = document.createElement('div');
            elem.textContent = inputOutputValue;
            elem.classList.add('data');
            elem.classList.add('set');
            setElem.appendChild(elem)
            
            var body = Physics.body('rectangle', {
                x: 100,
                y: 100,
                width: elem.getBoundingClientRect().width,
                height: elem.getBoundingClientRect().height,
                vx: (Math.random() - 0.5) * 1,
                vy: (Math.random() - 0.5) * 1,
                treatment: 'dynamic'
            });
            body.view = elem;
            bodySet.push(body);
            myWorld.add(body)

        input.value = ""; // Vyčistit input
    };

    // Spustit fyziku
    Physics.util.ticker.on(function (time) {
        world.step(time);
    });
    Physics.util.ticker.start();
});
function changeValue() {
    inputOutputValue = input.value;
}
