function hoverHandler() {
    const menu = this.parentElement;
    let showDepth02 = setTimeout(() => {
        menu.classList.add('active')
    }, 1000);
    menu.addEventListener('mouseleave', function(){
        if(menu.classList.contains('active')) {
            setTimeout(() => { menu.classList.remove('active') }, 500)
            return
        }
        clearTimeout(showDepth02)
    })
}

function dropDownMenu() {
    const depth01 = document.querySelector('.depth01_wrap .depth01');
    depth01.addEventListener('mouseenter', hoverHandler)
}
dropDownMenu();
