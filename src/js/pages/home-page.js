import $ from "jquery";
// core version + navigation, pagination modules:
import Swiper from 'swiper';
import { Navigation, EffectCoverflow} from 'swiper/modules';
// import Swiper and modules styles
import 'swiper/css';
import 'swiper/css/navigation';

// Functions
var rem = function rem() {
  var html = document.getElementsByTagName('html')[0];

  return function () {
      return parseInt(window.getComputedStyle(html)['fontSize']);
  }
}();
function toRem(length) {
  return (parseInt(length) / rem());
}

// Hide approach img and make before/after
$(document).ready(function () {
  if (!document.querySelector('.approach__twenty')) return;
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
        $('.approach__preview-box').addClass('hidden');
        constructObserver.unobserve(img.target);
      }
    });
  }
  
  constructObserver.observe(constructionImg);
});

// SERVICES Swiper services
$(document).ready(function () {
  if (!document.querySelector('.services')) return;
  
  const servicesSwiper = new Swiper('.services__slider', {
    modules: [Navigation],
    slidesPerView: '1.1',
    spaceBetween: '2%',
    grabCursor: true,
    navigation: {
      nextEl: '.services__swiper-btn-next',
      prevEl: '.services__swiper-btn-prev',
    },
    breakpoints: {
      768: {
        slidesPerView: '3.4',
        spaceBetween: '2%',
      },
    },
  });

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
});

// ADVANTAGES
// desc display
$(document).ready(function () {
  if (!document.querySelector('.advantages')) return;
  
  const advanItems = document.querySelectorAll('.advantages__list-item');
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
    $('.advantages__display-title-list').css('height', `${toRem(titleHeight)}rem`);
    const textHeight = text.css('height');
    $('.advantages__display-text-list').css('height', `${toRem(textHeight)}rem`);
  
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
});
// mobile accordion
$(document).ready(function () {
  if (!document.querySelector('.advantages')) return;

  $('.advantages__item-title').click(function(e) {
    e.preventDefault();
    if($(this).hasClass('active')){
      $(this).removeClass("active");
      $(this).siblings('.advantages__item-info').slideUp(400);
    } else {
      $(".advantages__item-title").removeClass("active");
      $(this).addClass("active");
      $('.advantages__item-info').slideUp(400);
      $(this).siblings('.advantages__item-info').slideDown(400);
    }
  })
});

// PLAN section animation
$(document).ready(function () {
  if (!document.querySelector('.plan')) return;
  
  const plans = document.querySelectorAll('.plan__graph');
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
        graphObserver.unobserve(item.target);
      }
    });
  }
  // graphObserver.observe(planSection);

  plans.forEach((planSection) => {
    graphObserver.observe(planSection);
  });
  
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
});


// NEWS Slider
$(document).ready(function () {
  if (!document.querySelector('.news__slider')) return;
  new Swiper('.news__slider', {
    modules: [Navigation],
    slidesPerView: '1.1',
    speed: 400,
    grabCursor: true,
    navigation: {
      nextEl: '.news__swiper-btn-next',
      prevEl: '.news__swiper-btn-prev',
    },
    breakpoints: {
      768: {
        slidesPerView: 6,
        spaceBetween: 30,
        centeredSlides: true,
      },
    },
  });
});


// APPROACH mobile text display
$(document).ready(function () {
  if (!document.querySelector('.approach__view-all')) return;
  $('.approach__view-all').click(function() {
    if ($(this).hasClass('hide')) {
      $('.approach__text').removeClass('display');
      $(this).removeClass('hide');
      $(this).html('View all');
    } else {
      $('.approach__text').addClass('display');
      $(this).addClass('hide');
      $(this).html('Hide');
    }
  });
});

// PLAN mobile text display
$(document).ready(function () {
  if (!document.querySelector('.plan__view-all')) return;
  $('.plan__view-all').click(function() {
    if ($(this).hasClass('hide')) {
      $('.plan__text').removeClass('display');
      $(this).removeClass('hide');
      $(this).html('View all');
    } else {
      $('.plan__text').addClass('display');
      $(this).addClass('hide');
      $(this).html('Hide');
    }
  });
});