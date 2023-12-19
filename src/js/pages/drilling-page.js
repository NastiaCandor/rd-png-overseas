import $ from "jquery";
import Swiper from 'swiper';
import { Mousewheel, Navigation } from 'swiper/modules';

import { gsap } from "gsap";
    
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ScrollToPlugin } from "gsap/ScrollToPlugin";


gsap.registerPlugin(ScrollTrigger,ScrollToPlugin);

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

// RIGS tab functionality
// desc display
$(document).ready(function () {
  if (!document.querySelector('.rigs-design')) return;
  
  const tabs = document.querySelectorAll('.rigs-design__tab-item');
  let tabId = '0';
  let tabMap = new Map();
  const infoHeight = $('.rigs-design__tab-info[data-rig-design="0"]').css('height');
  $('.rigs-design__tabs-display').css('height', `${toRem(infoHeight)}rem`);
  
  const changeTabInfo = (item, id) => {
    $(`.rigs-design__tab-item[data-rig-design="${tabId}"]`)[0].classList.remove('active');
    $(`.rigs-design__tab-info[data-rig-design="${tabId}"]`)[0].classList.remove('active');

    item.classList.add('active');
  
    const info = tabMap.get(item);
  
    info[0].classList.add('active');
  
    const infoHeight = info.css('height');
    $('.rigs-design__tabs-display').css('height', `${toRem(infoHeight)}rem`);
  
    tabId = id;
  };
  
  tabs.forEach((item, ind) => {
    const id = item.getAttribute('data-rig-design');
    tabMap.set(item, $(`.rigs-design__tab-info[data-rig-design="${id}"]`));
    item.addEventListener('click', (e) => {
      changeTabInfo(item, id);
    });
  });

  $(window).resize(function () {
		resizeTabDisplay();
	});

  if (!$(".rigs-design__tabs-display").data("platform")) {
		screen.width < 769
			? $(".rigs-design__tabs-display").data("platform", "mobile")
			: $(".rigs-design__tabs-display").data("platform", "desktop");
	}

  function resizeTabDisplay() {
    if (screen.width < 769) {
      if ($('.rigs-design__tabs-display').data('platform') != 'desktop') return;
      $(".rigs-design__tabs-display").data("platform", "mobile");
      const infoHeight = $(`.rigs-design__tab-info[data-rig-design="${tabId}"]`).css('height');
      $('.rigs-design__tabs-display').css('height', `${toRem(infoHeight)}rem`);
    } else {
      if ($('.rigs-design__tabs-display').data('platform') != 'mobile') return;
      $(".rigs-design__tabs-display").data("platform", "desktop");
      const infoHeight = $(`.rigs-design__tab-info[data-rig-design="${tabId}"]`).css('height');
      $('.rigs-design__tabs-display').css('height', `${toRem(infoHeight)}rem`);
    }
  }
});

// slider
$(document).ready(function () {
  if (!document.querySelector('.land-rigs')) return;

  const landRigs = document.querySelector('.land-rigs');
  let landRigsSwiper;

  if (!$(".land-rigs").data("platform")) {
		screen.width < 769
			? $(".land-rigs").data("platform", "mobile")
			: $(".land-rigs").data("platform", "desktop");
	}

  const sections = gsap.utils.toArray('.land-rigs__item-text');
  const quant = sections.length;
  const scrollStep = 350;
  const tl = gsap.timeline({
    scrollTrigger: {
      trigger: '.land-rigs',
      pin: true,
      start: 'top top',
      end: () => '+=' + quant * scrollStep,
    }
  });

  gsap.registerPlugin(ScrollTrigger);

  gsap.set('.land-rigs__info-text-wrapper', {autoAlpha:1});

  var allSections = gsap.utils.toArray(".land-rigs__item-text");
  gsap.set(allSections[0], {position:'fixed'})
  var allSectionsNotFirst = allSections.slice(1);
  gsap.set(allSectionsNotFirst, {position:'absolute', yPercent:100});

  var allPhotos = gsap.utils.toArray(".land-rigs__item-photo");
  gsap.set(allPhotos, {position:'fixed'});
  var allPhotosNotFirst = allPhotos.slice(1);
  gsap.set(allPhotos, {autoAlpha:0});
  gsap.set(allPhotos[0], {autoAlpha:1});

  var allLines = gsap.utils.toArray("land-rigs__item-text p");
  var allLinesNotFirst = allLines.slice(1);

  // ================
  var allTrigger = gsap.utils.toArray(".trigger");

  gsap.set(allTrigger, {visibility:'hidden'})

  // ========================
  allSectionsNotFirst.forEach((section, i) => {
    gsap.timeline({
      scrollTrigger:{
        trigger: allTrigger[i],
        start:"top top",
        toggleActions: "play none none reverse",
      }
    })
    .to(section, {
      yPercent:0, 
      duration:0.6, //ease:,
      ease: 'power3.inOut',
    })
  });
  allSectionsNotFirst.forEach((section, i) => {
    gsap.timeline({
      scrollTrigger:{
        trigger: allTrigger[i],
        start:"top top",
        toggleActions: "play none none reverse",
      }
    })
    .to(allSections[i], {
      yPercent:-100, 
      duration:0.6, //ease:,
      ease: 'power3.inOut',
    })
  });
  allSectionsNotFirst.forEach((section, i) => {
    gsap.timeline({
      scrollTrigger:{
        trigger: allTrigger[i],
        start:"top top",
        toggleActions: "play none none reverse",
      }
    })
    .to(allPhotosNotFirst[i], {
      autoAlpha: 1,
      duration: 0.6,
      ease: 'power3.inOut',
    })
  });

  if (screen.width > 769) {
    ScrollTrigger.refresh();
    landRigsSwiper = new Swiper('.land-rigs__info-slider', {
      modules: [Mousewheel],
      slidesPerView: 1,
      speed: 1000,
      direction: "vertical",
      mousewheel: {
        releaseOnEdges: true,
      },
      spaceBetween: 30,
    });
    landRigsSwiper.destroy();

  } else {
    tl.scrollTrigger.kill();
    landRigsSwiper = new Swiper('.land-rigs__info-slider', {
      modules: [Navigation],
      slidesPerView: 1,
      navigation: {
        nextEl: '.land-rigs__swiper-btn-next',
        prevEl: '.land-rigs__swiper-btn-prev',
      },
      spaceBetween: 30,
    });
  }

  $(window).resize(function () {
		changeLandRigsSlider();
	});

  function changeLandRigsSlider() {
    if (screen.width < 769) {
      if ($('.land-rigs').data('platform') != 'desktop') return;
      $(".land-rigs").data("platform", "mobile");
      ScrollTrigger.disable();
      landRigsSwiper.destroy();
      landRigsSwiper = new Swiper('.land-rigs__info-slider', {
        modules: [Mousewheel, Navigation],
        slidesPerView: 1,
        navigation: {
          nextEl: '.land-rigs__swiper-btn-next',
          prevEl: '.land-rigs__swiper-btn-prev',
        },
        spaceBetween: 30,
      });
    } else {
      if ($('.land-rigs').data('platform') != 'mobile') return;
      $(".land-rigs").data("platform", "desktop");
      landRigsSwiper.destroy();
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: '.land-rigs',
          pin: true,
          start: 'top top',
          end: () => '+=' + quant * scrollStep,
        }
      });
      
      ScrollTrigger.enable();
      ScrollTrigger.refresh();
    }
  }

  // Show more btn
  $('.land-rigs__slide-more-btn').click(function(e) {
    const list = $(this).closest('.land-rigs__slide-text').children('.land-rigs__info-list');
    if (list.css('display') === 'none') {
      list.slideDown(400);
    } else {
      list.slideUp(400);
    }
  });

});