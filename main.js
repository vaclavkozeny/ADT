const name='select';
function menu(){
    const menus = document.querySelectorAll('.dropdown-options');
    menus.forEach(m=>m.classList.toggle('hidden'))
}
var tabbtns = document.querySelectorAll(".btn");
var tabcontent = document.querySelectorAll(".content");

if(tabbtns && tabcontent){
    tabbtns.forEach(b=>{
        b.addEventListener('click',()=>{
            var tabid = b.getAttribute('data-tab');
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
function error(str) {
    if (errorDisplayed) return;
    errorDisplayed = true;

    err.textContent = str
    var tl = gsap.timeline(
        {
            onComplete: () => {
                errorDisplayed = false;
            }
        }
    );
    tl.to(err, {
        opacity: 1,
        duration: 0.5,
        ease: defaultEase
    }).to(err, {
        opacity: 0,
        duration: 2,
        ease: defaultEase
    })
}