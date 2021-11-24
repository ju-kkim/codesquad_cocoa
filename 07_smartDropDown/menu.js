function hoverHandler() {
    let showDepth02 = setTimeout(() => {
        this.classList.add('active')
    }, 1000);

    this.addEventListener('mouseout', function(){
        if(this.classList.contains('active')) {
            setTimeout(() => { this.classList.remove('active') }, 500)
            return
        }
        clearTimeout(showDepth02)
    })
}

function dropDownMenu() {
    const depth01 = document.querySelector('.depth01_wrap');
    depth01.addEventListener('mouseover', hoverHandler)
}
dropDownMenu();
