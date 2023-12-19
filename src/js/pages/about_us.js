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
      navigation: {
        nextEl: '.history__swiper-btn-next',
        prevEl: '.history__swiper-btn-prev',
      },
    });
  } else {
    historySwiper = new Swiper('.history__swiper', {
      modules: [Navigation],
      slidesPerView: 1.1,
      speed: 400,
      navigation: {
        nextEl: '.history__swiper-btn-next',
        prevEl: '.history__swiper-btn-prev',
      },
    });
  }

  $(window).resize(function () {
		changeSlider();
	});

  function changeSlider() {
    if (screen.width < 769) {
      if ($('.history__swiper').data('platform') != 'desktop') return;
      $(".history__swiper").data("platform", "mobile");
      historySwiper.destroy();
      historySwiper = new Swiper('.history__swiper', {
        modules: [Navigation],
        slidesPerView: 1.1,
        speed: 400,
        navigation: {
          nextEl: '.history__swiper-btn-next',
          prevEl: '.history__swiper-btn-prev',
        },
      });
    } else {
      if ($('.history__swiper').data('platform') != 'mobile') return;
      $(".history__swiper").data("platform", "desktop");
      historySwiper.destroy();
      historySwiper = new Swiper('.history__swiper', {
        modules: [Navigation],
        slidesPerView: 2.25,
        speed: 600,
        navigation: {
          nextEl: '.history__swiper-btn-next',
          prevEl: '.history__swiper-btn-prev',
        },
      });
    }
  }
});

// PEOPLE section
$(document).ready(function () {
  if (!document.querySelector('.people')) return;

  $('.people__view-all-btn').click(function() {
    if ($('.people__wrapper').hasClass('show')) {
      $('.people__wrapper').removeClass('show');
      $(this).html('View all employees');
    } else {
      $('.people__wrapper').addClass('show');
      $(this).html('Hide');
    }
  });
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
  $('.about-adv__item-view-all').click(function() {
    if ($(this).hasClass('hide')) {
      $(this).siblings('.about-adv__item-info-more').removeClass('show');
      $(this).removeClass('hide');
      $(this).html('View all');
    } else {
      $(this).siblings('.about-adv__item-info-more').addClass('show');
      $(this).addClass('hide');
      $(this).html('Hide');
    }
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
      slidesPerView: 3,
      speed: 500,
      navigation: {
        nextEl: '.licenses__swiper-btn-next',
        prevEl: '.licenses__swiper-btn-prev',
      },
    });
  } else {
    licensesSwiper = new Swiper('.licenses__swiper', {
      modules: [Navigation],
      slidesPerView: 1.4,
      speed: 500,
      navigation: {
        nextEl: '.licenses__swiper-btn-next',
        prevEl: '.licenses__swiper-btn-prev',
      },
    });
  }

  $(window).resize(function () {
		changeSlider();
	});

  function changeSlider() {
    if (screen.width < 769) {
      if ($('.licenses__swiper').data('platform') != 'desktop') return;
      $(".licenses__swiper").data("platform", "mobile");
      licensesSwiper.destroy();
      licensesSwiper = new Swiper('.licenses__swiper', {
        modules: [Navigation],
        slidesPerView: 1.4,
        speed: 500,
        navigation: {
          nextEl: '.licenses__swiper-btn-next',
          prevEl: '.licenses__swiper-btn-prev',
        },
      });
    } else {
      if ($('.licenses__swiper').data('platform') != 'mobile') return;
      $(".licenses__swiper").data("platform", "desktop");
      licensesSwiper.destroy();
      licensesSwiper = new Swiper('.licenses__swiper', {
        modules: [Navigation],
        slidesPerView: 3,
        speed: 500,
        navigation: {
          nextEl: '.licenses__swiper-btn-next',
          prevEl: '.licenses__swiper-btn-prev',
        },
      });
    }
  }
});