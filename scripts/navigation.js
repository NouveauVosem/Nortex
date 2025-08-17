import { products } from './products.js';

/**
 * Инициализация хлебных крошек.
 * @param {Object} options
 * @param {string} options.homeUrl - Ссылка на главную.
 * @param {string} options.galleryUrl - Ссылка на галерею.
 * @returns {Object|null} - Найденный продукт или null.
 */
export function initBreadcrumbs({ homeUrl = './index.html', galleryUrl = './gallery.html' }) {
  const params = new URLSearchParams(window.location.search);
  const productId = parseInt(params.get('id'), 10);
  const nav = document.querySelector('.navigation-feed');

  if (!nav) {
    console.warn('Элемент с классом ".navigation-feed" не найден');
    return null;
  }

  if (!isNaN(productId)) {
    const product = products.find(p => p.id === productId);

    if (product) {
      nav.innerHTML = `
        <a href="${homeUrl}">Дом</a> > 
        <a href="${galleryUrl}">Галерея</a> > 
        <span>${product.name}</span>
      `;
      return product;
    }
  }

  nav.innerHTML = `
    <a href="${homeUrl}">Дом</a> > 
    <span>Галерея</span>
  `;
  return null;
}