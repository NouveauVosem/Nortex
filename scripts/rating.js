import { addReview } from "./addReview.js";
import { getReviewsByProduct } from "./addReview.js";
import { RefreshReviewCounter } from "./product.js";



// INIT REVIEW STARS
let currentRating = 0;

function initReviewStars() {
  const stars = document.querySelectorAll(".star");
const ratingValue = document.getElementById("rating-value");

stars.forEach((star, index) => {
  // підсвічування при наведенні
  star.addEventListener("mouseover", () => {
    stars.forEach((s, i) => {
      s.src =
        i <= index
          ? "./assets/icons/icon-star.svg"
          : "./assets/icons/icon-star-empt.svg";
    });
  });

  // повернення до збереженого рейтингу
  star.addEventListener("mouseout", () => {
    stars.forEach((s, i) => {
      s.src =
        i < currentRating
          ? "./assets/icons/icon-star.svg"
          : "./assets/icons/icon-star-empt.svg";
    });
  });

  // збереження рейтингу при кліку
  star.addEventListener("click", () => {
    currentRating = index + 1;
    // ratingValue.textContent = currentRating;
    stars.forEach((s, i) => {
      s.src =
        i < currentRating
          ? "./assets/icons/icon-star.svg"
          : "./assets/icons/icon-star-empt.svg";
    });
  });
});
}

// CREATE REVIEW SECTION

export async function createReviewSection() {

  const productId = window.product.id;
  // фильтруем отзывы под конкретный продукт
  const productReviews = await getReviewsByProduct(productId);

  
  // const productReviews = reviews.filter(r => r.productId === window.product.id);
  // если нет отзывов
  let reviewsHTML = "";
  if (productReviews.length === 0) {
    reviewsHTML = `
      <div class="first-review">
        <div class="first-review-front">
          <p><span>Будь першим !</span></br>Ваш відгук дуже важливий для нас.</p>
        </div>
      </div>
    `;
    } else {
// тут используем функцию для каждого отзыва
    reviewsHTML = productReviews.map(r => renderReview(r)).join("");
  }
  // общий шаблон секции
  return `
    <section class="reviews-section">
      <div class="reviews">${reviewsHTML}</div>
      <div class="add-review">
        <form class="review-input-form">
          <textarea id='message' name="message" class="add-review-textarea" placeholder="Коментар"></textarea>
          <div class="add-review-contacts">
            <input id='name' class="add-review-input" name="name" type="text" placeholder="Iм'я">
            <input id='email' class="add-review-input" name="email" type="text" placeholder="Email">
            <div class="add-review-stars">
              <img src="./assets/icons/icon-star-empt.svg" data-value="1" class="star" alt="зірка 1">
              <img src="./assets/icons/icon-star-empt.svg" data-value="2" class="star" alt="зірка 2">
              <img src="./assets/icons/icon-star-empt.svg" data-value="3" class="star" alt="зірка 3">
              <img src="./assets/icons/icon-star-empt.svg" data-value="4" class="star" alt="зірка 4">
              <img src="./assets/icons/icon-star-empt.svg" data-value="5" class="star" alt="зірка 5">
            </div>
          </div>
        </form>
        <button class="btn-orange-flex">Відправити рецензію</button>
      </div>
    </section>
  `;
}


// REVIEW SUBMITION
function submitForm() {

  const emailInput = document.getElementById("email").value;
  const nameInput = document.getElementById("name").value;
  const messageInput = document.getElementById("message").value;
  const ratingInput = currentRating; // Рейтинг берём из глобальной переменной
  const dateNow = new Date().toLocaleDateString("uk-UA"); // Дата в локальном формате (украинский формат)
  const productName = window.product.name
  const productId = window.product.id

    const reviewData = {
    name: nameInput,
    message: messageInput,
    email: emailInput,
    subject: "new comment" + productName,
    rating: ratingInput,
    dateNow: dateNow,
    productId: productId,
    productName: productName,
  };
  console.log(window.product);
  console.log(reviewData);

  addReview(reviewData); // грузим на Firebase
  addReviewToDOM(reviewData); // ДОРИСОВЫВАЕМ в ДОМ

  fetch("https://formsubmit.co/ajax/nouveauvosem@gmail.com", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
    body: JSON.stringify({
      name: nameInput,
      message: messageInput,
      email:emailInput,
      rating:ratingInput,
      data:JSON.stringify(reviewData)
    }),
  })
    .then((response) => response.json())
    .then((data) => console.log(data))
    .catch((error) => console.log(error));
    
    cleanForm() // чистим форму
    RefreshReviewCounter() // Обновляем счетчик в заголовке

    // 2. Перерисовываем блок отзывов
    // refreshReviewSection()

    
}


function renderReview(review) {
  return `
    <div class="review new">
      <div class="review-top">
        <div class="review-left">
          <div class="review-name"><p><b>${review.name}</b></p></div>
          <div class="review-rating">${"★".repeat(review.rating)}${"☆".repeat(5 - review.rating)}</div>
        </div>
        <div class="review-time"><p>${review.dateNow}</p></div>
      </div>
      <div class="review-text"><p>${review.message}</p></div>
    </div>
  `;
}

function addReviewToDOM(review) {

  const reviewsContainer = document.querySelector("#tab3 .reviews");
  reviewsContainer.insertAdjacentHTML("beforeend", renderReview(review));

  const placeholder = reviewsContainer.querySelector(".first-review");
  if (placeholder) {
    placeholder.remove();
  }

  const lastReview = reviewsContainer.lastElementChild;
  if (lastReview) {
    lastReview.classList.add("new");
    setTimeout(() => lastReview.classList.remove("new"), 1500);
  }
}


function cleanForm() {
  // очищаем форму
  document.getElementById("name").value = "";
  document.getElementById("email").value = "";
  document.getElementById("message").value = "";
  currentRating = 0;
}

async function refreshReviewSection() {

    const tab3 = document.getElementById("tab3");
  
    tab3.innerHTML = await createReviewSection();

        // Сбрасываем анимацию обновления
    tab3.classList.remove("animate-in");
    void tab3.offsetWidth; // 🔥 перезапуск

    // Запускаем анимацию
    tab3.classList.add("animate-in");

    initReviewStars();
    document.querySelector("#tab3 .btn-orange-flex")?.addEventListener("click", submitForm);
}



window.submitForm = submitForm;
window.createReviewSection = createReviewSection;
window.initReviewStars = initReviewStars;