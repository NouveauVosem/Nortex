import { getProductFromURL } from "./utils.js";
import { getCurrentLang } from "./utils.js";
import { formatPrice } from "./utils.js";
import { generateOrderId } from "./utils.js";
import { addOrder } from "./addReview.js";

function generateCheckout() {
  const product = getProductFromURL();
  const taxRate = 0.19;
  const price = parseInt(product.price, 10);
  const tax = price * taxRate;
  const total = price + price * 0.19;

  document.getElementById("checkout-item").innerHTML = `
    <div class="checkout-item-list">
      <div class="checkout-item">
        <div class="checkout-item-image">
          <img src="${product.img[0]}" />
        </div>
        <div class="checkout-item-text">
          <div class="checkout-item-text-name">
            <p><b>${product.name}</b></p>
          </div>
          <div class="checkout-item-text-short">
            <p>
              ${product.shortDescription}
            </p>
          </div>
        </div>
      </div>
    </div>
    <div class="checkout-subtotal">
      <p><b>Проміжна ціна:</b><span>${formatPrice(price)}</span></p>
      <p><b>Доставка:</b><span>безкоштовно</span></p>
      <p><b>Податки(19%):</b><span>${formatPrice(tax)}</span></p>
      <div class="checkout-total">
        <p><b>Всього за товар:</b><span>${formatPrice(total)}</span></p>
      </div>              
    </div>
    <div id= "placeOrderBtn" class="checkout-btn-order">
          Розмістити замовлення
    </div>
  `;

  // вешаем обработчик
  document
    .getElementById("placeOrderBtn")
    .addEventListener("click", checkOrder);
}

function checkOrder() {
  const form = document.getElementById("checkoutForm");
  console.log(form);
  const btn = document.getElementById("placeOrderBtn");

  if (form.checkValidity()) {
    // ✅ все required поля заполнены
    placeOrder(); // твоя функция обработки
  } else {
    // ❌ есть ошибки
    form.reportValidity(); // покажет браузерное предупреждение

    // скроллим к первому невалидному полю
    const firstInvalid = form.querySelector(":invalid");
    if (firstInvalid) {
      firstInvalid.scrollIntoView({ behavior: "smooth", block: "center" });
      firstInvalid.focus();
    }
  }
}

function placeOrder() {
  const product = getProductFromURL();

  const formData = {
    // id заказа
    orderId: generateOrderId(),

    // id и название товара
    productId: product.id,
    productName: product.name,
    productPrice: product.price,

    // сообщение
    orderComment: document.getElementById("orderComment").value,
    // Контакты
    email: document.getElementById("email").value,
    phone: document.getElementById("phone").value,

    // Дата
    dateNow: new Date().toLocaleDateString("uk-UA"),

    // Адрес доставки
    country: document.getElementById("country").value,
    firstName: document.getElementById("fname").value,
    lastName: document.getElementById("lname").value,
    companyOrg: document.getElementById("adressOrg").value,
    address: document.getElementById("adress").value,
    city: document.getElementById("city").value,
    zip: document.getElementById("zip").value,

    // Тип доставки и платника
    delivery: document.querySelector('input[name="delivery"]:checked')?.value,
    payerType: document.querySelector('input[name="payerType"]:checked')?.value,

    // Юридические реквизиты
    companyName: document.getElementById("companyName").value,
    companyNumber: document.getElementById("companyNumber").value,

    // Использовать адрес доставки для счета
    sameAsDelivery: document.getElementById("sameAsDelivery").checked,
  };

  addOrder(formData);

  const emailSubmit = "nouveauvosem@gmail.com";
  // const emailSubmit ="alvla.doprava@seznam.cz";

  fetch(`https://formsubmit.co/ajax/${emailSubmit}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
    body: JSON.stringify({
      orderComment: document.getElementById("orderComment").value,
      email: document.getElementById("email").value,
      phone: document.getElementById("phone").value,
      country: document.getElementById("country").value,
      firstName: document.getElementById("fname").value,
      lastName: document.getElementById("lname").value,
      companyOrg: document.getElementById("adressOrg").value,
      address: document.getElementById("adress").value,
      city: document.getElementById("city").value,
      zip: document.getElementById("zip").value,
      companyName: document.getElementById("companyName").value,
      companyNumber: document.getElementById("companyNumber").value,
      delivery: document.querySelector('input[name="delivery"]:checked')?.value,
      payerType: document.querySelector('input[name="payerType"]:checked')
        ?.value,
      sameAsDelivery: document.getElementById("sameAsDelivery").checked,
      data: JSON.stringify(formData),
    }),
  })
    .then((response) => response.json())
    // .then((formData) => console.log(formData))
    .then((data) => {
      console.log(data);
      // window.location.href = "thank-you.html";
      window.location.href = `thank-you.html?orderId=${encodeURIComponent(formData.orderId)}`;
    })
    .catch((error) => console.log(error));
}

// ORGANIZATION TOGGLE SWITCHER
document.addEventListener("DOMContentLoaded", function () {
  const payerRadios = document.querySelectorAll('input[name="payerType"]');
  const orgBlocks = document.querySelectorAll(".orgRequired");

  // скрыты по умолчанию
  orgBlocks.forEach((block) => {
    block.classList.remove("show");
    const input = block.querySelector("input");
    if (input) input.removeAttribute("required");
  });

  payerRadios.forEach((radio) => {
    radio.addEventListener("change", function () {
      if (this.value === "nova_courier") {
        // Юр. лицо → показать с анимацией
        orgBlocks.forEach((block) => {
          block.classList.add("show");
          const input = block.querySelector("input");
          if (input) input.setAttribute("required", "required");
        });
      } else {
        // Физ. лицо → скрыть с анимацией
        orgBlocks.forEach((block) => {
          block.classList.remove("show");
          const input = block.querySelector("input");
          if (input) input.removeAttribute("required");
        });
      }
    });
  });
});

generateCheckout();
