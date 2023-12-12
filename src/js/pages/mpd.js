import $ from "jquery";

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

// MPD ADVAN tab functionality
// desc display
$(document).ready(function () {
  if (!document.querySelector('.mpd-advan')) return;
  
  const tabs = document.querySelectorAll('.mpd-advan__tab-item');
  let tabId = '0';
  let tabMap = new Map();
  const infoHeight = $('.mpd-advan__tab-info[data-mpd-advan="0"]').css('height');
  $('.mpd-advan__tabs-display').css('height', `${toRem(infoHeight)}rem`);
  
  const changeTabInfo = (item, id) => {
    $(`.mpd-advan__tab-item[data-mpd-advan="${tabId}"]`)[0].classList.remove('active');
    $(`.mpd-advan__tab-info[data-mpd-advan="${tabId}"]`)[0].classList.remove('active');

    item.classList.add('active');
  
    const info = tabMap.get(item);
  
    info[0].classList.add('active');
  
    const infoHeight = info.css('height');
    $('.mpd-advan__tabs-display').css('height', `${toRem(infoHeight)}rem`);
  
    tabId = id;
  };
  
  tabs.forEach((item, ind) => {
    const id = item.getAttribute('data-mpd-advan');
    tabMap.set(item, $(`.mpd-advan__tab-info[data-mpd-advan="${id}"]`));
    item.addEventListener('click', (e) => {
      changeTabInfo(item, id);
    });
  });

  if (!$(".mpd-advan__tabs-display").data("platform")) {
		screen.width < 769
			? $(".mpd-advan__tabs-display").data("platform", "mobile")
			: $(".mpd-advan__tabs-display").data("platform", "desktop");
	}

  $(window).resize(function () {
		resizeTabDisplay();
	});

  function resizeTabDisplay() {
    if (screen.width < 769) {
      if ($('.mpd-advan__tabs-display').data('platform') != 'desktop') return;
      $(".mpd-advan__tabs-display").data("platform", "mobile");
      const infoHeight = $('.mpd-advan__tab-info[data-mpd-advan="0"]').css('height');
      $('.mpd-advan__tabs-display').css('height', `${toRem(infoHeight)}rem`);
    } else {
      if ($('.mpd-advan__tabs-display').data('platform') != 'mobile') return;
      $(".mpd-advan__tabs-display").data("platform", "desktop");
      const infoHeight = $(`.mpd-advan__tab-info[data-mpd-advan="${tabId}"]`).css('height');
      $('.mpd-advan__tabs-display').css('height', `${toRem(infoHeight)}rem`);
    }
  }
});
// mobile accordion
$(document).ready(function () {
  if (!document.querySelector('.mpd-advan')) return;

  $('.mpd-advan__item-title').click(function(e) {
    e.preventDefault();
    if($(this).hasClass('active')){
      $(this).removeClass("active");
      $(this).siblings('.mpd-advan__item-info').slideUp(400);
    } else {
      $(".mpd-advan__item-title").removeClass("active");
      $(this).addClass("active");
      $('.mpd-advan__item-info').slideUp(400);
      $(this).siblings('.mpd-advan__item-info').slideDown(400);
    }
  })
});