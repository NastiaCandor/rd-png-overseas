import $ from "jquery";

// mobile menu accordion
$(document).ready(function () {
  if (!document.querySelector('.header__mobile-nav')) return;

  $('.header__mobile-nav-sub').click(function(e) {
    e.preventDefault();
    if($(this).hasClass('active')){
      $(this).removeClass("active");
      $(this).siblings('.header__mobile-submenu').slideUp(400);
    } else {
      $(".header__mobile-nav-sub").removeClass("active");
      $(this).addClass("active");
      $('.header__mobile-submenu').slideUp(400);
      $(this).siblings('.header__mobile-submenu').slideDown(400);
    }
  })
});