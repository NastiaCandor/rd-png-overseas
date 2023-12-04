import $ from "jquery";

$(document).ready(function () {
  if (!document.querySelector('.news-list')) return;
  $('.news-list__view-all').click(function() {
    $('.news-list__wrapper').css({'max-height': '100%'});
    // $('.news-list__view-all').css({'display': 'none'});
  });
});