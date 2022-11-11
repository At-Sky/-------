const form = document.querySelector('.form');

document.addEventListener('DOMContentLoaded', () => {
    form.addEventListener('submit', formSend)
})



function formSend(e) {
    e.prevent

    let formData = new FormData(form)

    console.log(form)
}