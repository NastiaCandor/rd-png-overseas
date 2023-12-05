import $ from "jquery";

document.addEventListener("DOMContentLoaded", function () {
  if (!document.querySelector('.form')) return;
  $('.feedback__tel-block').children('.form__input').mask('+7(000) 000-00-00');

  $('#feedback').submit(function(e) {
    e.preventDefault();
    if (!validateFeedbackForm()) {

      return false;
    }

    return false;
  })

  if (document.querySelector('#feedback')) validateFeedbackRealtimeForm();

  // if (document.querySelector('#resume')) validateResumeForm();
});

  // Feedback form validation
function validateFeedbackRealtimeForm() {

  const name = $('.feedback__name-block').children('.form__input');
  const nameMsg = $('.feedback__name-block').children('.form__error-msg');
  validationInputRealtimeQuestion(name, nameMsg, validateName);

  const email = $('.feedback__email-block').children('.form__input');
  const emailMsg = $('.feedback__email-block').children('.form__error-msg');
  validationInputRealtimeQuestion(email, emailMsg, validateEmail);

  const comment = $('.feedback__comment-block').children('.form__input');
  const commentMsg = $('.feedback__comment-block').children('.form__error-msg');
  validationInputRealtimeQuestion(comment, commentMsg, validateComment);


}

// Vacancy form validation
function validateResumeForm() {

}

function validationInputRealtimeQuestion(input, msg, validate) {
  input.on('focusout', function() {
    if (input.val().length === 0) return;
    if (validate(input)) return;
    input.addClass('active');
    msg.addClass('active');
  });
  input.on('focus', function() {
    if (input.val().length === 0) {
      input.removeClass('active');
      msg.removeClass('active');
    };
  });
  input.on('keyup', function() {
    if (validate(input)) {
      input.removeClass('active');
      msg.removeClass('active');
    };
    if (input.val().length === 0) {
      input.removeClass('active');
      msg.removeClass('active');
    };
  });
}

function validationInputQuestion(input, msg, validate) {
  if (validate(input)) return true;
  input.addClass('active');
  msg.addClass('active');
  return false;
}

function validateTel(input) {
  return input.val().length === 16;
}

function validateEmail(input) {
  const pattern = /^[^ ]+@[^ ]+\.[a-z]{2,20}$/;
  return input.val().match(pattern);
}

function validateName(input) {
  return input.val().length > 0;
}

function validateComment(input) {
  return input.val().length > 10;
}