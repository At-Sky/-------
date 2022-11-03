const overlay = document.querySelector('.overlay')
const button = document.querySelector('.about__button')
const form = document.querySelector('.about__form')

form.addEventListener('submit', (event) => {
    event.preventDefault()
})


button.addEventListener('click', () => {
    openModal()
})

function openModal() {
    overlay.classList.add('add-overlay')
    overlay.addEventListener('click', (event) => {
        if (event.target == overlay) {
            overlay.classList.remove('add-overlay')            
        }
    })
}