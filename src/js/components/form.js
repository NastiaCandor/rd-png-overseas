import $ from "jquery";

document.addEventListener("DOMContentLoaded", function () {
  if (!document.querySelector('.form')) return;
  $('.feedback__tel-block').children('.form__input').mask('(000) 000-00-00');

  $('#feedback').submit(function(e) {
    e.preventDefault();
    if (!validateFeedbackForm()) {
      return false;
    } else {
      $('.modal-thanks').addClass('active');
      return false;
    }
  })

  $('#form-resume').submit(function(e) {
    e.preventDefault();
    if (!validateResumeForm()) {
      return false;
    } else {
      $('.modal-thanks').addClass('active');
      return false;
    }
  })

  if (document.querySelector('#feedback')) validateFeedbackRealtimeForm();

  if (document.querySelector('#form-resume')) validateResumeRealtimeForm();
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

function validateResumeRealtimeForm() {
  const name = $('.feedback__name-block').children('.form__input');
  const nameMsg = $('.feedback__name-block').children('.form__error-msg');
  validationInputRealtimeQuestion(name, nameMsg, validateName);

  const email = $('.feedback__email-block').children('.form__input');
  const emailMsg = $('.feedback__email-block').children('.form__error-msg');
  validationInputRealtimeQuestion(email, emailMsg, validateEmail);

  const resume = $('.feedback__resume-block').find('.form__input_resume');
  const resumeMsg = $('.feedback__resume-block').children('.form__error-msg');
  validationFileInputChange(resume, resumeMsg);
}

function validateFeedbackForm() {
  const name = $('.feedback__name-block').children('.form__input');
  const nameMsg = $('.feedback__name-block').children('.form__error-msg');
  const nameVal = validationInputQuestion(name, nameMsg, validateName);

  const email = $('.feedback__email-block').children('.form__input');
  const emailMsg = $('.feedback__email-block').children('.form__error-msg');
  const emailVal = validationInputQuestion(email, emailMsg, validateEmail);

  const comment = $('.feedback__comment-block').children('.form__input');
  const commentMsg = $('.feedback__comment-block').children('.form__error-msg');
  const commentVal = validationInputQuestion(comment, commentMsg, validateComment);

  return (nameVal && emailVal && commentVal);
}

// Vacancy form validation
function validateResumeForm() {
  const name = $('.feedback__name-block').children('.form__input');
  const nameMsg = $('.feedback__name-block').children('.form__error-msg');
  const nameVal = validationInputQuestion(name, nameMsg, validateName);

  const email = $('.feedback__email-block').children('.form__input');
  const emailMsg = $('.feedback__email-block').children('.form__error-msg');
  const emailVal = validationInputQuestion(email, emailMsg, validateEmail);

  const resume = $('.feedback__resume-block').find('.form__input_resume');
  const resumeMsg = $('.feedback__resume-block').children('.form__error-msg');
  const resumeVal = validationInputQuestion(resume, resumeMsg, validationFileInput);

  return (nameVal && emailVal && resumeVal);
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

function validationFileInputChange(input, msg) {
  input.on('change', function() {
    let file = this.files[0];
    if (file) {
      input.removeClass('active');
      msg.removeClass('active');
      $('.feedback__resume-block').find('.feedback__resume-file').html(file.name);
      $('.feedback__resume-block').find('.feedback__resume-label').html('');
    }
  });
}

function validationFileInput(input) {
  return $('.feedback__resume-file').html().length > 0;
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