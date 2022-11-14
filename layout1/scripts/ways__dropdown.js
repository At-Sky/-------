const arrows = document.querySelectorAll('.ways__dropdown-arrow');

arrows.forEach(arrow => {
    arrow.addEventListener('click', () => {
        if (arrow.classList.contains('.ways__dropdown-arrow_opend')) {
            arrow.classList.remove('.ways__dropdown-arrow_opend')
            arrow.firstElementChild.style.fill = '#55B570'
            arrow.style.transform = "rotate(0deg)"
            arrow.parentElement.nextElementSibling.style.display = 'none'
        } else {
            arrow.classList.add('.ways__dropdown-arrow_opend')
            arrow.firstElementChild.style.fill = '#D2D2D2'
            arrow.style.transform = "rotate(180deg)"
            arrow.parentElement.nextElementSibling.style.display = 'block'
        }
    })
})