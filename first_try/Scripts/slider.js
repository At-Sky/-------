let next = document.querySelector('.button-next');
let prev = document.querySelector('.button-prev');
let slides = document.querySelectorAll('.slider-item');
let dots = document.querySelectorAll('.slider-dot');
let index = 0;

let prepareSlide = ind => {
  activeSlide(ind);
  activeDot(ind);
}

let activeSlide = n => {
  for(sliderItem of slides) {
    sliderItem.classList.remove('active');
  }
  slides[n].classList.add('active');
}

let activeDot = n  => {
  for(sliderDot of dots) {
    sliderDot.classList.remove('active');
  }
  dots[n].classList.add('active');
}

let nextSlide = () => {
  if (index == slides.length - 1) {
    index = 0;
    prepareSlide(index);
  } else {
    index++;
    prepareSlide(index);
  }
}

let prevSlide = () => {
  if (index == 0) {
    index = slides.length - 1;
    prepareSlide(index);
  } else {
    index--;
    prepareSlide(index);
  }
}

dots.forEach((dot, indexDot) => {
  dot.addEventListener('click', () => {
    index = indexDot;
    prepareSlide(index);
  })
})

setInterval(function() {
  nextSlide()
}, 8000);

next.addEventListener('click', nextSlide);
prev.addEventListener('click', prevSlide);