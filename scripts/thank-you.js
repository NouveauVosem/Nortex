import { getCurrentLang } from "./utils.js";

// Получаем ID заказа из URL
const params = new URLSearchParams(window.location.search);
const orderId = params.get("orderId");

document.getElementById("orderId").textContent = orderId || "Не знайдено";

const orderData = JSON.parse(localStorage.getItem("lastOrder"));
console.log(orderData);


// Словарь переводов
const deliveryTranslations = {
  ukr: {
    store_pickup: "Самовивіз із магазину",
    nova_courier: "Кур'єр Нова Пошта",
    nova_branch: "Самовивіз із відділення «Нова Пошта»",
  },
  en: {
    store_pickup: "Pickup from store",
    nova_courier: "Nova Poshta courier",
    nova_branch: "Pickup from Nova Poshta branch",
  },
};



function getDeliveryText(code, lang = "ukr") {
  return deliveryTranslations[lang]?.[code] || code;
}

function generateOrderSummary() {

const  lang=getCurrentLang();
console.log(lang);

  document.getElementById("order-summary").innerHTML = `
        <div class="order-summary-column">
        <div class="order-summary-line">Товар: <span>${orderData.productName}</span></div>
        <div class="order-summary-line">Спосіб доставки: <span>${getDeliveryText(orderData.delivery, lang)}</span></div>
            <div class="order-summary-line">
            Дата замовлення: <span>${orderData.date}</span>
            </div>      
        </div>
        <div class="order-summary-column">
        <div class="order-summary-line">Покупець: <span>${orderData.firstName} ${orderData.lastName}</span></div>          
      <div class="order-summary-line">Телефон: <span>${orderData.phone || "-"}</span></div>
      <div class="order-summary-line">Email: <span>${orderData.email}</span></div>
        </div>
    `;
}

generateOrderSummary();
