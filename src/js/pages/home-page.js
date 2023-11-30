import $ from "jquery";
// core version + navigation, pagination modules:
import Swiper from 'swiper';
import { Navigation, EffectCoverflow} from 'swiper/modules';
// import Swiper and modules styles
import 'swiper/css';
import 'swiper/css/navigation';

// Hide construction img
$(document).ready(function () {
  if (!document.querySelector('.approach__img-card')) return;
  const options = { threshold: [0.9] };
  const constructObserver = new IntersectionObserver(approachContractionShow, options);
  const constructionImg = document.querySelector('.approach__img-card');
  
  function approachContractionShow(entry) {
    entry.forEach(img => {
      if (img.isIntersecting) {
        img.target.classList.add('hidden');
      }
    });
  }
  
  constructObserver.observe(constructionImg);
});

// Hide approach img and make before/after
$(document).ready(function () {
  $(".approach__twenty").twentytwenty({
    default_offset_pct: 0.5,
    move_with_handle_only: true,
    no_overlay: true,
    // move_slider_on_hover: true,
  });

  const options = { threshold: [0.9] };
  const constructObserver = new IntersectionObserver(approachContractionShow, options);
  const constructionImg = document.querySelector('.approach__img-card_over');
  
  function approachContractionShow(entry) {
    entry.forEach(img => {
      if (img.isIntersecting) {
        img.target.classList.add('hidden');
      }
    });
  }
  
  constructObserver.observe(constructionImg);
});

// Swiper services

const servicesSwiperBlock = document.querySelector('.services__slider');

if (servicesSwiperBlock) {
  const servicesSwiper = new Swiper('.services__slider', {
    modules: [Navigation],
    slidesPerView: '3.4',
    spaceBetween: '2%',
    grabCursor: true,
    navigation: {
      nextEl: '.services__swiper-btn-next',
      prevEl: '.services__swiper-btn-prev',
    },
  });
}

const optionsSliderObserver = { 
  threshold: [0],
  root: document.querySelector('.services__slider-wrapper'),
};
const servicesSlidesObserver = new IntersectionObserver(hideServicesSlides, optionsSliderObserver);
const servicesSlides = document.querySelectorAll('.services__swiper-slide');

function hideServicesSlides(entry) {
  entry.forEach(slide => {
    if (slide.isIntersecting) {
      slide.target.classList.remove('hidden');
    } else {
      slide.target.classList.add('hidden');
    }
  });
}

servicesSlides.forEach(slide => {
  slide.classList.add('hidden');
  servicesSlidesObserver.observe(slide);
});

const servicesNextBtn = document.querySelector('.services__swiper-btn-next');

const servicesLastMove = (mutationsList) => {
  for (let mutation of mutationsList) {
    if (mutation.type === 'attributes') {
      if (mutation.attributeName !== 'class') return;
      if (!mutation.target.classList.contains('swiper-button-disabled')) {
        servicesSlides.forEach((slide) => {
          slide.classList.remove('last');
        });
      } else {
        servicesSlides.forEach((slide) => {
          slide.classList.add('last');
        });
      }
    }
  }
}
const servicesLastOptions = {
  attributes: true,
  attributeOldValue: true
}
const servicesLastSlideObserver = new MutationObserver(servicesLastMove);
servicesLastSlideObserver.observe(servicesNextBtn, servicesLastOptions);

// Advantages
const advanItems = document.querySelectorAll('.advantages__list-item');
const advanTitles = document.querySelectorAll('.advantages__display-title');
let advanCurrId = '0';
let advanTitleMap = new Map();
const advanTextMap = new Map();
const titleHeight = $('.advantages__display-title[data-advantages="0"]').css('height');
$('.advantages__display-title-list').css('height', titleHeight);
const textHeight = $('.advantages__display-text[data-advantages="0"]').css('height');
$('.advantages__display-text-list').css('height', textHeight);

const changeAdvanInfo = (item, id) => {
  $(`.advantages__list-item[data-advantages="${advanCurrId}"]`)[0].classList.remove('active');
  item.classList.add('active');
  $(`.advantages__display-title[data-advantages="${advanCurrId}"]`)[0].classList.remove('active');
  item.classList.add('active');
  $(`.advantages__display-text[data-advantages="${advanCurrId}"]`)[0].classList.remove('active');

  item.classList.add('active');

  const title = advanTitleMap.get(item);
  const text = advanTextMap.get(item);

  title[0].classList.add('active');
  text[0].classList.add('active');

  const titleHeight = title.css('height');
  $('.advantages__display-title-list').css('height', titleHeight);
  const textHeight = text.css('height');
  $('.advantages__display-text-list').css('height', textHeight);

  advanCurrId = id;
};

advanItems.forEach((item, ind) => {
  const id = item.getAttribute('data-advantages');
  advanTitleMap.set(item, $(`.advantages__display-title[data-advantages="${id}"]`));
  advanTextMap.set(item, $(`.advantages__display-text[data-advantages="${id}"]`));
  item.addEventListener('click', (e) => {
    changeAdvanInfo(item, id);
  });
});

// Graph section animation
const planSection = document.querySelector('.plan');
const graphPrecentList = document.querySelectorAll('.plan__graph-percent');
const pieDiagramList = document.querySelectorAll('.plan__circle');
const optionsGraphObserver = { 
  threshold: [0.95],
};
const graphObserver = new IntersectionObserver(animateGraphSection, optionsGraphObserver);

function animateGraphSection(entry) {
  entry.forEach(item => {
    if (item.isIntersecting) {
      if (!graphPrecentList[0].classList.contains('done')) {
        graphPrecentList.forEach((el) => {
          animatePieNumber(el);
          el.classList.add('done');
        })
      }
      pieDiagramList.forEach((el) => {
        animatePieDiagram(el);
      })
    }
  });
}
graphObserver.observe(planSection);

function animatePieDiagram (item) {
  item.classList.add('animate-plan-circle');
}

function animatePieNumber(item) {
  let start = 0;
  const end = Number(item.getAttribute('data-dev-number'));
  const time = 3000;
  const step = 0.1;
  const fraction = Math.round(time / (end * 10));
  let startTime = 0;
  for (let i = 0; i < (end * 10); i++) {
    setTimeout(() => {
      start = start + step;
      item.textContent = `${start.toFixed(1).toString().replace('.', ',')}%`;
    }, startTime);
    startTime += fraction;
  }
}

// NEWS Slider

const newsSlider = document.querySelector('.news__slider');
if (newsSlider) {
  new Swiper('.news__slider', {
    modules: [Navigation],
    slidesPerView: 6,
    spaceBetween: 30,
    centeredSlides: true,
    navigation: {
      nextEl: '.news__swiper-btn-next',
      prevEl: '.news__swiper-btn-prev',
    },
});
}