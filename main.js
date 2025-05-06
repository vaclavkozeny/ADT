function menu() {
    const dropdown = document.getElementById('dropdown-menu');
    dropdown.classList.toggle('hidden');
    dropdown.classList.toggle('flex');
}
let tabbtns = document.querySelectorAll(".btn");
let tabcontent = document.querySelectorAll(".content");

if(tabbtns && tabcontent){
    tabbtns.forEach(b=>{
        b.addEventListener('click',()=>{
            let tabid = b.getAttribute('data-tab');
            tabbtns.forEach(bt=>{bt.classList.remove('active')});
            b.classList.add('active');
            tabcontent.forEach(c=>{
                c.classList.remove('active');
                if(c.id == tabid){
                    c.classList.add('active');
                }
            })
        })
    })
}
window.addEventListener('click', function(event) {
    const dropdown = document.getElementById('dropdown-menu');
    const button = document.querySelector('.dropdown button');
    
    if (!button.contains(event.target) && !dropdown.contains(event.target)) {
        dropdown.classList.add('hidden');
        dropdown.classList.remove('flex');
    }
});
function error(str) {
    if (errorDisplayed) return;
    errorDisplayed = true;

    err.textContent = str
    let tl = gsap.timeline(
        {
            onComplete: () => {
                errorDisplayed = false;
            }
        }
    );
    tl.to(err, {
        opacity: 1,
        duration: 1,
        ease: "power2"
    }).to(err, {
        opacity: 0,
        duration: 2,
        ease: "power2"
    })
}