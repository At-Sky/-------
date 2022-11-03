const burger = document.querySelector('.header__registration');
// const menu = document.querySelector('.header_nav');
const overlay = document.querySelector('.overlay');

// const lockScroll = () => {
//   document.body.classList.add('lock');
// };

// const unlockScroll = () => {
//   document.body.classList.remove('lock');
// };

burger.addEventListener("click", () => {
//   menu.classList.add('open_menu');
  overlay.classList.add('add-overlay');
//   lockScroll();
});

overlay.addEventListener("click", () => {
//   menu.classList.remove('open_menu');
  overlay.classList.remove('add-overlay');
  document.querySelector('.overlay').classList.remove('add-overlay');
//   unlockScroll();
});