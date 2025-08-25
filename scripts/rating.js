const stars = document.querySelectorAll('.rating span');
const ratingValue = document.getElementById('rating-value');
let selectedRating = 0;

stars.forEach(star => {
  // Наведение мыши
  star.addEventListener('mouseover', () => {
    stars.forEach(s => {
      s.classList.toggle('hover', s.dataset.value <= star.dataset.value);
    });
  });

  // Убираем наведение мыши
  star.addEventListener('mouseout', () => {
    stars.forEach(s => s.classList.remove('hover'));
  });

  // Клик по звезде
  star.addEventListener('click', () => {
    selectedRating = star.dataset.value;
    ratingValue.textContent = selectedRating;
    stars.forEach(s => {
      s.classList.toggle('selected', s.dataset.value <= selectedRating);
    });
  });
});