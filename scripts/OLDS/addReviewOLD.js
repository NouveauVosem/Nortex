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
import { getDatabase, ref, push, set } from "https://www.gstatic.com/firebasejs/12.1.0/firebase-database.js";

// 2. Получаем объект базы данных
const db = getDatabase(app);

// 3. Функция для добавления даты
export function addDate(productId) {
  const dateNow = new Date().toLocaleDateString("uk-UA");

  // Путь в базе: reviews/productId
  const reviewsRef = ref(db, `reviews/${productId}`);

  // Создаём уникальный ключ для новой записи
  const newReviewRef = push(reviewsRef);

  // Сохраняем дату (можно позже расширить объект)
  set(newReviewRef, {
    dateNow: dateNow
  })
    .then(() => console.log("Дата успешно добавлена:", dateNow))
    .catch((error) => console.error("Ошибка при добавлении даты:", error));
}