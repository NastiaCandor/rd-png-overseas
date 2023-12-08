import $ from "jquery";
// core version + navigation, pagination modules:
import Swiper from 'swiper';
import { Navigation, EffectCoverflow} from 'swiper/modules';
// import Swiper and modules styles
import 'swiper/css';
import 'swiper/css/navigation';

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