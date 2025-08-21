// import { products } from "./products.js";
import { contacts } from "./contacts.js";
import { generateHeader } from "./header.js";
import { generateFooter } from "./footer.js";
import { generateGallery } from "./gallery.js";
import { getTranslatedPageLink } from "./header.js";
import { getCurrentLang } from './header.js';
import { products as productsEng } from './products-en.js';
import { products as productsUkr } from './products.js';


document.getElementById('header').innerHTML = generateHeader();
document.getElementById('footer').innerHTML = generateFooter();

window.onload = function () {
   function renderPhones(containerId) {
    const container = document.getElementById(containerId);
    container.textContent = ""; // Очищаем контейнер

    contacts.phones.forEach((number) => {
      const link = document.createElement("a");
      link.textContent = number;
      link.href = "tel:" + number.replace(/\D/g, "");
      container.appendChild(link);
    });
  }

  // Рендерим телефоны в шапке и футере
  renderPhones("contacts-phone-header");
  renderPhones("contacts-phone-footer");

  console.log(contacts.email);
    document.getElementById("contacts-email-footer").innerText = contacts.email;


// set adress    
    const addressElement = document.getElementById("address");
if (addressElement) {
  addressElement.textContent = "Адрес: " + contacts.address;
}
};

// create Gallery with current language

const lang = getCurrentLang();
const products = lang === 'eng' ? productsEng : productsUkr;

const productList = document.querySelector('.product-list');
if (productList) {
  productList.innerHTML = generateGallery(products);
}

// modal
const openModal = document.getElementById('openModal');
  const closeModal = document.getElementById('closeModal');
  const modalOverlay = document.getElementById('modalOverlay');

  openModal.addEventListener('click', () => {
    modalOverlay.style.display = 'flex';
  });

  closeModal.addEventListener('click', () => {
    modalOverlay.style.display = 'none';
  });

  modalOverlay.addEventListener('click', (e) => {
    if (e.target === modalOverlay) {
      modalOverlay.style.display = 'none';
    }
  });

// **********activate language buttons
  document.querySelectorAll('.lang-btn').forEach(button => {
  button.addEventListener('click', () => {
    const targetLang = button.getAttribute('data-lang');
    const newUrl = getTranslatedPageLink(targetLang);
    window.location.href = newUrl;
  });
});








