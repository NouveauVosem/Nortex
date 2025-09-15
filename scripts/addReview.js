  // Import the functions you need from the SDKs you need
  import { initializeApp } from "https://www.gstatic.com/firebasejs/12.1.0/firebase-app.js";
  // TODO: Add SDKs for Firebase products that you want to use
  // https://firebase.google.com/docs/web/setup#available-libraries

  // Your web app's Firebase configuration
  const firebaseConfig = {
    apiKey: "AIzaSyCQfytQ4Nsp657sX2Qvh5jon1g40hqRQsE",
    authDomain: "nortex-html.firebaseapp.com",
    databaseURL: "https://nortex-html-default-rtdb.europe-west1.firebasedatabase.app",
    projectId: "nortex-html",
    storageBucket: "nortex-html.firebasestorage.app",
    messagingSenderId: "36107351587",
    appId: "1:36107351587:web:4b8d5dc1c5928d10c2a396"
  };

  // Initialize Firebase
const app = initializeApp(firebaseConfig);


  // 1. Импортируем функции для Realtime Database
import { getDatabase, ref, push, set, onValue, get } from "https://www.gstatic.com/firebasejs/12.1.0/firebase-database.js";

// 2. Получаем объект базы данных
const db = getDatabase(app);

//--------------------------ADD REVIEW--------------------------

// 3. экспортируем Функцию для добавления отзыва в базу данных
export function addReview(reviewData) {
  const dateNow = new Date().toLocaleDateString("uk-UA");

  //Создаём ссылку на ветку в базе данных: reviews/ID_ПРОДУКТА
  const reviewsRef = ref(db, `reviews/${reviewData.productId}`);

  // Создаём уникальный ключ для новой записи
  const newReviewRef = push(reviewsRef);
  
  // Сохраняем переданный объект reviewData под этим уникальным ключом
  return set(newReviewRef, reviewData)
    .then(() => console.log("Отзыв сохранён:", reviewData))
    .catch((error) => console.error("Ошибка сохранения:", error));
}


//--------------------------GET REVIEWS--------------------------

export function getReviews(productId, callback) {
  const reviewsRef = ref(db, `reviews/${productId}`);

  // слушатель: каждый раз при изменении данных будет вызываться
  onValue(reviewsRef, (snapshot) => {
    const data = snapshot.val();

    // если нет отзывов — вернём пустой массив
    if (!data) {
      callback([]);
      return;
    }

    // превращаем объект {key: review} → в массив [review, review...]
    const reviewsArray = Object.values(data);

    callback(reviewsArray);
  });
}


// DEBUG ALL REVIEWS

export async function debugReadAllReviews() {
  try {
    const snapshot = await get(ref(db, "reviews"));
    if (snapshot.exists()) {
      console.log("🔥 reviews data:", snapshot.val());
    } else {
      console.log("⚠️ reviews пусто");
    }
  } catch (err) {
    console.error("❌ Ошибка чтения:", err);
  }
}

// debugReadAllReviews();


export let currentReviews=[];

export async function getReviewsByProduct(productId) {
  try {
    const snapshot = await get(ref(db, `reviews/${productId}`));
    if (!snapshot.exists()) {
      console.log(`⚠️ Для продукта ${productId} отзывов нет`);
      return [];
    }

    // объект с ключами → превращаем в массив
    const data = snapshot.val();
    const reviewsArray = Object.values(data);
    currentReviews=reviewsArray;
    console.log("🔥 Массив отзывов:", reviewsArray);
    return reviewsArray;
  } catch (err) {
    console.error("❌ Ошибка чтения:", err);
    return [];
  }
}

export function addOrder(orderData) {
  const dateNow = new Date().toLocaleDateString("uk-UA");

  //Создаём ссылку на ветку в базе данных: orders/ID_Заказа
  const ordersRef = ref(db, `orders/${orderData.orderId}`);

  // Создаём уникальный ключ для новой записи
  const newReviewRef = push(ordersRef);
  
  // Сохраняем переданный объект reviewData под этим уникальным ключом
  return set(newReviewRef, orderData)
    .then(() => console.log("заказ добавлен:", orderData))
    .catch((error) => console.error("Ошибка сохранения:", error));
}

window.getReviewsByProduct = getReviewsByProduct;