const stars = document.querySelectorAll(".star");
const ratingValue = document.getElementById("rating-value");
let currentRating = 0;

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
    ratingValue.textContent = currentRating;
    stars.forEach((s, i) => {
      s.src =
        i < currentRating
          ? "./assets/icons/icon-star.svg"
          : "./assets/icons/icon-star-empt.svg";
    });
  });
});


// REVIEW SUBMITION
function submitForm() {
  const emailInput = document.getElementById("email").value;
  const nameInput = document.getElementById("name").value;
  const messageInput = document.getElementById("message").value;
  const ratingInput = currentRating;

    const formData = {
    name: nameInput,
    message: messageInput,
    email: emailInput,
    subject: ratingInput,
    rating: ratingInput,
    product:product
  };

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
      data:JSON.stringify(formData)
    }),
  })
    .then((response) => response.json())
    .then((data) => console.log(data))
    .catch((error) => console.log(error));
}



// CREATE REVIEW SECTION

function createReviewSection() {
  return `<section class="reviews-section">
          
          <div class="first-review">
            <div class="first-review-front">
              <p><span>Будь першим !</span></br>Ваш відгук дуже важливий для нас.</p>
            </div>
            
          </div>

          <div class="reviews">

            <div class="review">
              <div class="review-top">
                <div class="review-left">
                  <div class = "review-name">
                  <p><b>Steve Stark</b></p>
                  </div>
                  <div class="review-rating">
                  ★★★★☆
                  </div>
                </div>
                
                <div class="review-time">
                  <p>7.11.2024</p>
                </div>

              </div>
              <div class="review-text">
                <p>The best tool I ever worked with !!! Love it. Best ever ever ever ever.</p>
                
              </div>
            </div>

            <div class="review">
              <div class="review-top">
                <div class="review-left">
                  <div class = "review-name">
                  <p><b>Steve Stark</b></p>
                  </div>
                  <div class="review-stars">
                  ★★★★☆
                  </div>
                </div>
                
                <div class="review-time">
                  <p>7.11.2024</p>
                </div>

              </div>
              <div class="review-text">
                <p>The best tool I ever worked with !!! Love it. Best ever ever ever ever.</p>
                
              </div>
            </div>
          

          </div>

          <div class="add-review">
            <form class="review-input-form" action="https://formsubmit.co/nouveauvosem@gmail.com" method="POST" >
              
              <textarea id='message' name="message" class="add-review-textarea" type="text" placeholder="Коментар"></textarea>
              
              
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
            <button class="btn-orange-flex" onclick={submitForm()}>Відправити рецензію</button>
          </div>
          
        </section>`;
}

window.submitForm = submitForm;
window.createReviewSection = createReviewSection;