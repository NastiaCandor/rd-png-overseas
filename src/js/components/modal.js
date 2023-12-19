import $ from "jquery";

// PERSON modal
$(document).ready(function () {
  if (!document.querySelector('.modal-person')) return;

  const personModal = document.querySelector('.modal-person');
  const modal = document.querySelector('.modal');
  const closeModalBtn = document.querySelector('.modal__close')
  
  const closeModal = () => {
    personModal.classList.remove('active');
  };
  
  const openPersonModal = (item) => {
    const type = item.attr('data-people');
    const imgBox = item.children('.people__item-photo-box');
    let src;
    if (imgBox.children('.people__item-img').length > 0) {
      $('.modal-person__img-box').removeClass('modal-person_man');
      $('.modal-person__img-box').removeClass('modal-person_woman');
      src = imgBox.children('.people__item-img')[0].src;
      $('.modal-person__img').attr('src' ,src);
    } else {
      const oldType = type == 'man' ? 'woman' : 'man';
      $('.modal-person__img-box').removeClass(`modal-person_${oldType}`);
      $('.modal-person__img-box').addClass(`modal-person_${type}`);
    }

    const name = item.find('.people__item-name').text();
    $('.modal-person__name').text(name);
    
    const position = item.find('.people__item-position').text();
    $('.modal-person__position').text(position);

    const text = item.find('.people__item-text').html();
    $('.modal-person__text').html(text);

    personModal.classList.add('active');
  };
  
  $('.people-open-modal').click(function() {
    openPersonModal($(this));
  });
  
  closeModalBtn.addEventListener('click', () => {
    closeModal();
  });
  
  document.body.addEventListener('click', (event) => {
    if (event.target === modal) closeModal();
  });
});

// THANKS modal
$(document).ready(function () {
  if (!document.querySelector('.modal-thanks')) return;

  const thanksModal = document.querySelector('.modal-thanks');
  const closeModalBtn = $('.modal-thanks').find('.modal__close');
  
  const closeModal = () => {
    thanksModal.classList.remove('active');
  };
  
  const openPersonModal = (item) => {
    thanksModal.classList.add('active');
  };
  
  
  closeModalBtn.click(function() {
    closeModal();
  });
  
  document.body.addEventListener('click', (event) => {
    if (event.target === thanksModal) closeModal();
  });
});