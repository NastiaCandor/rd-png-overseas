import $ from "jquery";
import Swiper from 'swiper';
import { Mousewheel } from 'swiper/modules';

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
});

$(document).ready(function () {
  if (!document.querySelector('.land-rigs')) return;
  const landRigs = document.querySelector('.land-rigs');
  const landRigsSwiper = new Swiper('.land-rigs__info-slider', {
    modules: [Mousewheel],
    slidesPerView: 1,
    speed: 1000,
    direction: "vertical",
    mousewheel: {
      // releaseOnEdges: true,
      eventsTarget: '.land-rigs',
      // thresholdDelta: 1,
    },
    // releaseOnEdges: true,
    spaceBetween: 30,
    // on: {
    //   slideChange: function(e) {
    //     console.log(e)
    //   },
    //   // reachEnd: function () {
    //   //   this.mousewheel.disable();
    //   // }
    // }
  });

  document.addEventListener("wheel", 
    function(e) { 
      if (e.wheelDeltaY > 0) {
        if (landRigsSwiper.isBeginning) {
          landRigsSwiper.mousewheel.disable();
        } else {
          landRigsSwiper.mousewheel.enable();
        }
      } else {
        if (landRigsSwiper.isEnd) {
          landRigsSwiper.mousewheel.disable();
        } else {
          landRigsSwiper.mousewheel.enable();
        }
      }
    },{ passive: false });

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