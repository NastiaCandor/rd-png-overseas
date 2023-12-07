
document.addEventListener("DOMContentLoaded", function () {
  if (!document.querySelector('.hamburger')) return;
  const hamburger = document.querySelector('.hamburger');
  const burgerMenu = document.querySelector('.header__burger-menu');
  const hamburgerClose = document.querySelector('.header__burger-close');
  
  function closeBurgerMenu() {
    burgerMenu.classList.remove('active');
  };
  
  function openBurgerMenu() {
    burgerMenu.classList.add('active');
  };
  
  hamburger.addEventListener('click', openBurgerMenu);
  
  hamburgerClose.addEventListener('click', closeBurgerMenu);
});