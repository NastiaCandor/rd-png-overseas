import $ from "jquery";
import Swiper from 'swiper';
import { Navigation} from 'swiper/modules';
// CARING section
$(document).ready(function() {
  if (!document.querySelector('.caring')) return;
  let caringSwiper;

  if (!$(".caring__swiper").data("platform")) {
		screen.width < 769
			? $(".caring__swiper").data("platform", "mobile")
			: $(".caring__swiper").data("platform", "desktop");
	}
  if (screen.width < 769) {
    caringSwiper = new Swiper('.caring__swiper', {
      modules: [Navigation],
      slidesPerView: 1,
      speed: 400,
      navigation: {
        nextEl: '.caring__swiper-btn-next',
        prevEl: '.caring__swiper-btn-prev',
      },
    });
  }

  $(window).resize(function () {
		changeSlider();
	});

  function changeSlider() {
    if (screen.width < 769) {
      if ($('.caring__swiper').data('platform') != 'desktop') return;
      $(".caring__swiper").data("platform", "mobile");
      if (caringSwiper) caringSwiper.destroy();
      caringSwiper = new Swiper('.caring__swiper', {
        modules: [Navigation],
        slidesPerView: 1,
        speed: 400,
        navigation: {
          nextEl: '.caring__swiper-btn-next',
          prevEl: '.caring__swiper-btn-prev',
        },
      });
    } else {
      if ($('.caring__swiper').data('platform') != 'mobile') return;
      $(".caring__swiper").data("platform", "desktop");caringSwiper.destroy();
    }
  }
});

// VACANCIES section
$(document).ready(function () {
  if (!document.querySelector('.vacancies')) return;
  // FILTER FUNCTIONALITY
  $('.vacancies__filter-fieldset').click(function(e) {
    if (e.target.classList.contains('vacancies__filter-input')) {
      const id = e.target.getAttribute('id');
      const value = e.target.getAttribute('value');
      if (e.target.checked) {
        $('.vacancies__filter-box').find(`.vacancies__filter-input#${id}`).prop('checked', true);
        $('.modal-filter').find(`.vacancies__filter-input#${id}`).prop('checked', true);
        $('.modal-filter').find(`.vacancies__form-label#${id}`).addClass('active');
        const item = `<div class="vacancies__filter-result-item" id="${id}">${value}<span class="vacancies__filter-close" id=${id}></span></div>`;
        $('.vacancies__filter-result').append(item);
      } else {
        $('.vacancies__filter-box').find(`.vacancies__filter-input#${id}`).prop('checked', false);
        $('.modal-filter').find(`.vacancies__filter-input#${id}`).prop('checked', false);
        $('.modal-filter').find(`.vacancies__form-label#${id}`).removeClass('active');
        $('.vacancies__filter-result').find(`.vacancies__filter-result-item#${id}`).remove();
      }
    }
  });

  $('.vacancies__filter-result').click(function(e) {
    if (e.target.classList.contains('vacancies__filter-close')) {
      const id = e.target.getAttribute('id');
      $('.modal-filter').find(`.vacancies__form-label#${id}`).removeClass('active');
      $(`.vacancies__filter-result-item#${id}`).remove();
      $(`.vacancies__filter-input#${id}`).prop('checked', false);
    }
  });

  // open filter inner drop down
  $('.vacancies__filter-legend').click(function(e) {
    const drop = $(this).siblings('.vacancies__filter-second');
    if ($(this).hasClass('active')) {
      drop.slideUp(300);
      $(this).removeClass('active');
    } else {
      $('.vacancies__filter-legend').removeClass('active');
      $('.vacancies__filter-second').slideUp(300);
      drop.slideDown(300);
      $(this).addClass('active');
    }
  });

  // open filter dropdown
  $('.vacancies__filter-title').click(function(e) {
    const drop = $(this).siblings('.vacancies__filter-drop');
    if (screen.width < 768) {
      $('.modal-filter').addClass('active');
      $(document.body).css('overflow', 'hidden');
    } else {
      if ($('.vacancies__filter-box').hasClass('active')) {
        drop.slideUp(300);
        $('.vacancies__filter-box').removeClass('active');
      } else {
        drop.slideDown(300);
        $('.vacancies__filter-box').addClass('active');
      }
    }
  });

  // // modal functionality
  $('.modal-filter').find('.modal__close').click(function() {
    $(document.body).css('overflow', 'auto');
    $('.modal-filter').removeClass('active');
  });
  $('.vacancies__form-apply-btn').click(function(e) {
    e.preventDefault();
    $(document.body).css('overflow', 'auto');
    $('.modal-filter').removeClass('active');
  });

  $(window).resize(function () {
		hideModal();
	});

  function hideModal() {
    if (screen.width > 768) {
      if (!$('.modal-filter').hasClass('active')) return;
      $('.modal-filter').removeClass('active');
      $(document.body).css('overflow', 'auto');
    }
  }

  // close filter menu
  document.addEventListener('click', (e) => {
    if (screen.width < 768) return;
    if ($('.vacancies__filter-box').find(e.target).length === 0) {
      $('.vacancies__filter-box').removeClass('active');
      $('.vacancies__filter-drop').slideUp(300);
    }
  });

  // ITEM view all display
  $('.vacancies__display').click(function(e) {
    if (!e.target.classList.contains('vacancies__item-view-all')) return;
    const item = e.target.parentElement;
    const btn = e.target;
    if (item.classList.contains('show')) {
      item.classList.remove('show');
      btn.textContent = 'View all';
    } else {
      item.classList.add('show');
      btn.textContent = 'Hide';
    }
  });
});