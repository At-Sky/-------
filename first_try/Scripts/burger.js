const burger = document.querySelector('.burger-menu');
const menu = document.querySelector('.header_nav');
const overlay = document.querySelector('.menu-overlay');

const lockScroll = () => {
  document.body.classList.add('lock');
};

const unlockScroll = () => {
  document.body.classList.remove('lock');
};

burger.addEventListener("click", () => {
  menu.classList.add('open_menu');
  overlay.classList.add('add_overlay');
  lockScroll();
});

overlay.addEventListener("click", () => {
  menu.classList.remove('open_menu');
  overlay.classList.remove('add_overlay');
  document.querySelector('.overlay').classList.remove('add_overlay');
  unlockScroll();
});

//for php scripts

let url = window.location.href;

if (document.querySelector('[name="url"]')) {
  document.querySelector('[name="url"]').value = url;
}

if (document.querySelector('[name="url1"]')) {
  document.querySelector('[name="url1"]').value = url;
}