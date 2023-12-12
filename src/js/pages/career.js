import $ from "jquery";

$(document).ready(function () {
  if (!document.querySelector('.vacancies')) return;
  // FILTER FUNCTIONALITY
  $('.vacancies__filter-fieldset').click(function(e) {
    if (e.target.classList.contains('vacancies__filter-input')) {
      const id = e.target.getAttribute('id');
      const value = e.target.getAttribute('value');
      if (e.target.checked) {
        const item = `<div class="vacancies__filter-result-item" id="${id}">${value}<span class="vacancies__filter-close" id=${id}></span></div>`;
        $('.vacancies__filter-result').append(item);
      } else {
        $('.vacancies__filter-result').find(`.vacancies__filter-result-item#${id}`).remove();
      }
    }
  });

  $('.vacancies__filter-result').click(function(e) {
    if (e.target.classList.contains('vacancies__filter-close')) {
      const id = e.target.getAttribute('id');
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
    if ($('.vacancies__filter-box').hasClass('active')) {
      drop.slideUp(300);
      $('.vacancies__filter-box').removeClass('active');
    } else {
      drop.slideDown(300);
      $('.vacancies__filter-box').addClass('active');
    }
  });

  // close filter menu
  document.addEventListener('click', (e) => {
    if ($('.vacancies__filter-box').find(e.target).length === 0) {
      $('.vacancies__filter-box').removeClass('active');
      $('.vacancies__filter-drop').slideUp(300);
    }
  });

  // ITEM view all display
  $('.vacancies__display').click(function(e) {
    if (!e.target.classList.contains('vacancies__item-view-all')) return;
    const item = e.target.parentElement;
    item.classList.add('show');
  });
});