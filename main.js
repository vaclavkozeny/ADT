const name='select';
function menu(){
    const menus = document.querySelectorAll('.dropdown-options');
    menus.forEach(m=>m.classList.toggle('hidden'))
}