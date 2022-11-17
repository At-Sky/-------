const burger = document.querySelector('.burger');
const menu = document.querySelector('.nav-list_burger');
const overlay = document.querySelector('.overlay');

burger.addEventListener("click", () => {
  menu.classList.add('open');
  overlay.classList.add('add_overlay');
});

overlay.addEventListener("click", () => {
  menu.classList.remove('open');
  overlay.classList.remove('add_overlay');
});