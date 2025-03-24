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