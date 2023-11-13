// Hide construction img
const options = { threshold: [0.5] };
const constructObserver = new IntersectionObserver(approachContractionShow, options);
const constructionImg = document.querySelector('.approach__img-card');

function approachContractionShow(entry) {
  entry.forEach(img => {
    if (img.isIntersecting) {
      img.target.classList.add('hidden');
    }
  });
}

constructObserver.observe(constructionImg);