// core version + navigation, pagination modules:
import Swiper from 'swiper';
import { Navigation} from 'swiper/modules';
// import Swiper and modules styles
import 'swiper/css';
import 'swiper/css/navigation';
// Hide construction img
const options = { threshold: [0.5] };
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

// Swiper services

const servicesSwiperBlock = document.querySelector('.services__slider');

// First option slider

// if (servicesSwiperBlock) {
//   const servicesSwiper = new Swiper('.services__slider', {
//     modules: [Navigation],
//     slidesPerView: 'auto',
//     // slidesPerView: 4,
//     centeredSlides: true,
//     // cssMode: true,
//     spaceBetween: '2%',
//     // Navigation arrows
//     navigation: {
//       nextEl: '.services__swiper-btn-next',
//       prevEl: '.services__swiper-btn-prev',
//     },
//     effect: 'creative',
//     creativeEffect: {
//       prev: {
//         // will set `translateX(100%)` on next slides
//         translate: ['100%', 0, 0],
//       },
//       next: {
//         // will set `translateX(100%)` on next slides
//         translate: ['100%', 0, 0],
//       },
//     },
//   });
// }

// Second option

if (servicesSwiperBlock) {
  const servicesSwiper = new Swiper('.services__slider', {
    modules: [Navigation],
    slidesPerView: 'auto',
    spaceBetween: '2%',
    navigation: {
      nextEl: '.services__swiper-btn-next',
      prevEl: '.services__swiper-btn-prev',
    },
  });
}

const optionsSliderObserver = { 
  threshold: [0],
  // root: null,
  // root: document.querySelector('.swiper-wrapper'),
  // rootMargin: '10px 0',
};
const servicesSlidesObserver = new IntersectionObserver(hideServicesSlides, optionsSliderObserver);
const servicesSlides = document.querySelectorAll('.swiper-slide');
console.log(servicesSlides);

function hideServicesSlides(entry) {
  console.log(entry);
  entry.forEach(slide => {
    if (slide.isIntersecting) {
      // slide.target.classList.add('hidden');
      slide.target.classList.remove('hidden');
    } else {
      // slide.target.classList.remove('hidden');
      slide.target.classList.add('hidden');
    }
  });
}

servicesSlides.forEach(slide => {
  // slide.classList.remove('hidden');
  slide.classList.add('hidden');
  servicesSlidesObserver.observe(slide);
});