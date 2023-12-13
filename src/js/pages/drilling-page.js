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

  if (!$(".land-rigs__info-slider").data("platform")) {
		screen.width < 769
			? $(".land-rigs__info-slider").data("platform", "mobile")
			: $(".land-rigs__info-slider").data("platform", "desktop");
	}
  if (screen.width > 769) {
    // landRigsSwiper = new Swiper('.land-rigs__info-slider', {
    //   modules: [Mousewheel],
    //   slidesPerView: 1,
    //   speed: 1000,
    //   direction: "vertical",
    //   // mousewheel: {
    //   //   releaseOnEdges: true,
    //   //   eventsTarget: '.land-rigs',
    //   //   // thresholdDelta: 1,
    //   // },
    //   spaceBetween: 30,
    // });
  } else {
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
      if ($('.land-rigs__info-slider').data('platform') != 'desktop') return;
      $(".land-rigs__info-slider").data("platform", "mobile");
      landRigsSwiper.destroy();
      landRigsSwiper = new Swiper('.land-rigs__info-slider', {
        modules: [Mousewheel, Navigation],
        slidesPerView: 2,
        // mousewheel: {
        //   releaseOnEdges: true,
        //   // eventsTarget: '.land-rigs',
        //   // thresholdDelta: 1,
        // },
        navigation: {
          nextEl: '.land-rigs__swiper-btn-next',
          prevEl: '.land-rigs__swiper-btn-prev',
        },
        spaceBetween: 30,
      });
    } else {
      if ($('.land-rigs__info-slider').data('platform') != 'mobile') return;
      $(".land-rigs__info-slider").data("platform", "desktop");
      landRigsSwiper.destroy();
      // landRigsSwiper = new Swiper('.land-rigs__info-slider', {
      //   modules: [Mousewheel],
      //   slidesPerView: 1,
      //   speed: 1000,
      //   direction: "vertical",
      //   // mousewheel: {
      //   //   releaseOnEdges: true,
      //   //   eventsTarget: '.land-rigs',
      //   //   // thresholdDelta: 1,
      //   // },
      //   spaceBetween: 30,
      // });

      
    }
  }

  const slides = gsap.utils.toArray('.land-rigs__info-slide.swiper-slide');
  const landRigsWrapper = document.querySelector('.land-rigs__info-slider .swiper-wrapper');
  const landRigsSlider = document.querySelector('.land-rigs__info-slider');
  // const timeLine = gsap.timeline({
  //   scrollTrigger: {
  //     trigger: '.land-rigs',
  //     pin: '.land-rigs',
  //     start: 'top top',
  //     scrub: 1,
  //     snap: 1 / (slides.length - 1),
  //     markers: true,
  //     end: () => "+=" + (slides.length * slides[0].offsetWidth),
  //   },
  // });
  // console.log(slides[0].offsetHeight);
  // timeLine.to(landRigsWrapper, {
  //   // y: -(1000),
  //   yPercent: -100 * (slides.length - 1),
  //   // yPercent: -100 * (4),
  // });
  gsap.to(slides, {
    yPercent: -100 * (slides.length - 1),
    ease: 'none',
    scrollTrigger: {
      trigger: '.land-rigs',
      pin: true,
      scrub: 1,
      snap: 1 / (slides.length - 1),
      end: () => '+=' + landRigsWrapper.offsetWidth
    }
  });

  // Show more btn
  $('.land-rigs__slide-more-btn').click(function(e) {
    const list = $(this).closest('.land-rigs__slide-text').children('.land-rigs__info-list');
    if (list.css('display') === 'none') {
      list.slideDown(400);
    } else {
      list.slideUp(400);
    }
  });


  // document.addEventListener("wheel", 
  //   function(e) { 
  //     if (e.wheelDeltaY > 0) {
  //       if (landRigsSwiper.isBeginning) {
  //         landRigsSwiper.mousewheel.disable();
  //         var delta = e.deltaY || e.detail || e.wheelDelta;
  //         // console.log(delta);
  //         // $('html, body').css('transform', `translateY(${Math.abs(delta)}px)`);

  //       } else {
  //         landRigsSwiper.mousewheel.enable();
  //       }
  //     } else {
  //       if (landRigsSwiper.isEnd) {
  //         landRigsSwiper.mousewheel.disable();
  //       } else {
  //         landRigsSwiper.mousewheel.enable();
  //       }
  //     }
  //   },{ passive: false });

});


// TRYING !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!1
// $(document).ready(function () {
//   if (!document.querySelector('.land-rigs')) return;
  
//   // const landRigsSwiper = new Swiper('.land-rigs__info-slider', {
//   //   modules: [Mousewheel],
//   //   slidesPerView: 1,
//   //   speed: 1000,
//   //   direction: "vertical",
//   //   // mousewheel: true,
//   //   // spaceBetween: 30,
//   // });

//   const optionsObserver = { 
//     threshold: [0.9],
//   };
//   // const landRigsObserver = new IntersectionObserver(switchSlides, optionsObserver);

//   // function switchSlides(entry) {
//   //   entry.forEach(slide => {
//   //     if (slide.isIntersecting) {
//   //       // disableScroll();
//   //       slide.target.classList.remove('hidden');
//   //       document.addEventListener('wheel', please, {passive: false});
//   //       // switchSlides();
//   //     } else {
//   //       // enableScroll();        slide.target.classList.remove('hidden');

//   //       document.removeEventListener('wheel', please, {passive: false});
//   //       slide.target.classList.add('hidden');
//   //     }
//   //   });
//   // }

//   // $(document).scroll(function () {
//   //   console.log($('.land-rigs'));
//   // });

//   // landRigsObserver.observe(document.querySelector('.land-rigs'));

//   // window.addEventListener('DOMMouseScroll', preventDefault, false); // older FF
//   // window.addEventListener(wheelEvent, preventDefault, wheelOpt);
//   function please(event) {
//       if (event.wheelDeltaY > 0) {
//         console.log('up');
//         if (landRigsSwiper.isBeginning) {
//           console.log('dis');
//           // enableScroll();
//           // landRigsSwiper.mousewheel.disable();
//         } else {
//           console.log('on');
//           // disableScroll();
  
//           event.preventDefault();
//           landRigsSwiper.slidePrev();
//           // landRigsSwiper.mousewheel.enable();
//         }
//       } else {
//         console.log('down');
//         if (landRigsSwiper.isEnd) {
//           console.log('dis');
//           // enableScroll();
//           // landRigsSwiper.mousewheel.disable();
//         } else {
//           console.log('on');
//           // disableScroll();
//           event.preventDefault();
//           landRigsSwiper.slideNext();
//           // landRigsSwiper.mousewheel.enable();
//         }
//       }
//   }


//   // document.addEventListener("wheel", 
//   // function(e) { 
//   //   // console.log('wheel');
//   //   e.stopImmediatePropagation();
//   //   if (e.wheelDeltaY > 0) {
//   //     console.log('up');
//   //     if (landRigsSwiper.isBeginning) {
//   //       console.log('dis');
//   //       // enableScroll();
//   //       // landRigsSwiper.mousewheel.disable();
//   //     } else {
//   //       console.log('on');
//   //       // disableScroll();

//   //       e.preventDefault();
//   //       landRigsSwiper.slidePrev();
//   //       // landRigsSwiper.mousewheel.enable();
//   //     }
//   //   } else {
//   //     console.log('down');
//   //     if (landRigsSwiper.isEnd) {
//   //       console.log('dis');
//   //       // enableScroll();
//   //       // landRigsSwiper.mousewheel.disable();
//   //     } else {
//   //       console.log('on');
//   //       // disableScroll();
//   //       e.preventDefault();
//   //       landRigsSwiper.slideNext();
//   //       // landRigsSwiper.mousewheel.enable();
//   //     }
//   //   }
//   // },{ passive: false });
// });

// function preventDefault(e) {
//   e.preventDefault();
// }

// function preventDefaultForScrollKeys(e) {
//   if (keys[e.keyCode]) {
//     preventDefault(e);
//     return false;
//   }
// }

// // modern Chrome requires { passive: false } when adding event
// var supportsPassive = false;
// try {
//   window.addEventListener("test", null, Object.defineProperty({}, 'passive', {
//     get: function () { supportsPassive = true; } 
//   }));
// } catch(e) {}

// var wheelOpt = supportsPassive ? { passive: false } : false;
// var wheelEvent = 'onwheel' in document.createElement('div') ? 'wheel' : 'mousewheel';

// // call this to Disable
// function disableScroll() {
//   console.log('dis');
//   window.addEventListener('DOMMouseScroll', preventDefault, false); // older FF
//   window.addEventListener(wheelEvent, preventDefault, wheelOpt); // modern desktop
//   // window.addEventListener('touchmove', preventDefault, wheelOpt); // mobile
//   // window.addEventListener('keydown', preventDefaultForScrollKeys, false);
// }

// // call this to Enable
// function enableScroll() {
//   console.log('en');
//   window.removeEventListener('DOMMouseScroll', preventDefault, false);
//   window.removeEventListener(wheelEvent, preventDefault, wheelOpt); 
//   // window.removeEventListener('touchmove', preventDefault, wheelOpt);
//   // window.removeEventListener('keydown', preventDefaultForScrollKeys, false);
// }