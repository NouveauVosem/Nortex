import { products as productsEng } from './products-en.js';
import { products as productsUkr } from './products.js';



export function getProductFromURL() {
  const lang = getCurrentLang();
  const products = lang === 'eng' ? productsEng : productsUkr;
  const id = new URLSearchParams(window.location.search).get('id');
  const product = products.find((x) => x.id == id);
  window.product = product;
  return product;
};

export function formatPrice(price) {
  const lang = getCurrentLang();
  const currency = lang === 'eng' ? '$' : '₴';
  const locale = lang === 'eng' ? 'en-US' : 'uk-UA';  
    // форматируем число с пробелами/запятыми по правилам locale
  const formatted = new Intl.NumberFormat(locale, {
    minimumFractionDigits: 0
  }).format(price);

  // возвращаем с кодом валюты в конце
  return `${formatted} ${currency}`;
}

export function getCurrentLang() {
  const filename = window.location.pathname.substring(window.location.pathname.lastIndexOf('/') + 1);
  return filename.includes('-eng') ? 'eng' : 'ukr';
};

