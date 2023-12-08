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

// HISTORY slider
$(document).ready(function () {
  if (!document.querySelector('.history')) return;
  let historySwiper;

  if (!$(".history__swiper").data("platform")) {
		screen.width < 769
			? $(".history__swiper").data("platform", "mobile")
			: $(".history__swiper").data("platform", "desktop");
	}
  if (screen.width > 769) {
    historySwiper = new Swiper('.history__swiper', {
      modules: [Navigation],
      slidesPerView: 2.25,
      speed: 600,
      // centeredSlides: true,
      navigation: {
        nextEl: '.history__swiper-btn-next',
        prevEl: '.history__swiper-btn-prev',
      },
      // spaceBetween: 30,
    });
  } else {
    // historySwiper = new Swiper('.history__swiper', {
    //   modules: [Navigation],
    //   slidesPerView: '2.1',
    //   navigation: {
    //     nextEl: '.history__swiper-btn-next',
    //     prevEl: '.history__swiper-btn-prev',
    //   },
    //   spaceBetween: 30,
    // });
  }

  // $(window).resize(function () {
	// 	changeSlider();
	// });

  function changeSlider() {
    if (screen.width < 769) {
      if ($('.history__swiper').data('platform') != 'desktop') return;
      $(".history__swiper").data("platform", "mobile");
      historySwiper.destroy();
      historySwiper = new Swiper('.history__swiper', {
        modules: [Navigation],
        slidesPerView: '2.1',
        navigation: {
          nextEl: '.history__swiper-btn-next',
          prevEl: '.history__swiper-btn-prev',
        },
        spaceBetween: 30,
      });
    } else {
      if ($('.history__swiper').data('platform') != 'mobile') return;
      $(".history__swiper").data("platform", "desktop");
      historySwiper.destroy();
      historySwiper = new Swiper('.history__swiper', {
        modules: [Navigation],
        slidesPerView: '2.1',
        navigation: {
          nextEl: '.history__swiper-btn-next',
          prevEl: '.history__swiper-btn-prev',
        },
        spaceBetween: 30,
      });
    }
  }
});

// ABOUT-ADV section
$(document).ready(function () {
  if (!document.querySelector('.about-adv')) return;

  // display
  $('.about-adv__item-top').click(function(e) {
    e.preventDefault();
    if($(this).hasClass('active')){
      $(this).removeClass("active");
      $(this).siblings('.about-adv__item-info').slideUp(400);
    } else {
      $(".about-adv__item-top").removeClass("active");
      $(this).addClass("active");
      $('.about-adv__item-info').slideUp(400);
      $(this).siblings('.about-adv__item-info').slideDown(400);
    }
  });

  // view all btn
  $('.about-adv__item-view-all').click(function(e) {
    e.preventDefault();
    $(this).siblings('.about-adv__item-text').addClass('show');
    // $(this).siblings('.licenses__item-text').slideDown(400);
    $(this).hide();
  });
});

// LICENSES section
$(document).ready(function () {
  if (!document.querySelector('.licenses')) return;
  let licensesSwiper;

  if (!$(".licenses__swiper").data("platform")) {
		screen.width < 769
			? $(".licenses__swiper").data("platform", "mobile")
			: $(".licenses__swiper").data("platform", "desktop");
	}
  if (screen.width > 769) {
    licensesSwiper = new Swiper('.licenses__swiper', {
      modules: [Navigation],
      slidesPerView: 3.3,
      speed: 500,
      navigation: {
        nextEl: '.licenses__swiper-btn-next',
        prevEl: '.licenses__swiper-btn-prev',
      },
    });
  } else {
    // historySwiper = new Swiper('.history__swiper', {
    //   modules: [Navigation],
    //   slidesPerView: '2.1',
    //   navigation: {
    //     nextEl: '.history__swiper-btn-next',
    //     prevEl: '.history__swiper-btn-prev',
    //   },
    //   spaceBetween: 30,
    // });
  }
});