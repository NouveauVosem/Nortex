// ===== 1. Импорты и данные =====
import { productTextsUA } from './translations-ua.js';
import { productTextsEN } from './translations-eng.js';
import { getCurrentLang } from './header.js';
import { products as productsEng } from './products-en.js';
import { products as productsUkr } from './products.js';

const lang = getCurrentLang();
const products = lang === 'eng' ? productsEng : productsUkr;
const t = lang === 'eng' ? productTextsEN : productTextsUA;

const id = new URLSearchParams(window.location.search).get('id');
const product = products.find((x) => x.id == id);

// ===== 2. Генерация HTML (NAVIGATION + GALLERY)=====

function createNavigation(product) {
  const productPage = lang === 'eng' ? 'product-eng.html' : 'product.html';
  const nav = document.querySelector('.navigation-feed');
  const productLink = document.createElement('a');
  productLink.href = `./${productPage}?id=${product.id}`;
  productLink.textContent = product.name;
  nav.append(' > ', productLink);
}

function createGallery(images) {
  return `
    <div class="product-gallery-main">
      <button class="gallery-arrow left">&#10094;</button>
      <img id="mainImage" src="${product.img[0]}">
      <button class="gallery-arrow right">&#10095;</button>
    </div>
    <div class="product-gallery-thumbs">
      <button class="thumb-arrow left">&#9664;</button>
      <div class="thumbs-scroll">
        ${images.map(src => `<img src="${src}" class="thumb-item">`).join('')}
      </div>
      <button class="thumb-arrow right">&#9654;</button>
    </div>
  `;
}


function createParameters(parameters) {
  return parameters.map((param, index) => `
    <p class="${index % 2 === 0 ? 'product-parameters-grey' : 'product-parameters-white'}">
      ${param.label}: <b>${param.value}</b>
    </p>
  `).join('');
}

// ===== 3. Рендеринг =====
function renderProduct(product) {
  document.getElementById('product').innerHTML = `
    <div class="product-name"><h2>${product.name}</h2></div>
    <div class="product-wrap">
      <div class="product-gallery">${createGallery(product.img)}</div>
      <div class="product-buy-wrap">
        <div class="product-price-row">
          <div class="product-price">
            <a><span>${product.price}</span>${t.currency}</a>
          </div>
          <a href="https://buy.stripe.com/7sY3cu0XO0aLa9v7kD3wQ00" class="product-buy-btn">${t.buy}</a>
        </div>
        <div class="product-short-row"><a>${product.shortDescription}</a></div>
        <div class="product-phone-row">
  <div class="product-phone-icon">
    <img src="assets/img/icon-phone-girl.svg">
  </div>
  <div class="product-phone-text">
    <a>
      ${t.oneClick}<br>
      <span>${t.oneClickSub}</span>
    </a>
  </div>
</div>

<div class="phone-input-row">
  <input class="phone-buy-input" name="subject" type="text" placeholder="${t.phoneNumber}">
  <div class="phone-buy-btn">${t.buy}</div>
</div>

<div class="roll-box-row">  
  <div class="roll-box-line">
    <div class="roll-box-line-head">
      <img src="assets/img/icon-delivery-truck.svg">              
      <a>${t.delivery}</a>
      <img class="icon-arrow" src="assets/img/icon-arrow.svg"><br>
    </div>
    <div class="roll-box-collapse">
      ${t.deliveryDetails}
    </div>
  </div>
  
  <div class="roll-box-line">
    <div class="roll-box-line-head">
      <img src="assets/img/icon-card.svg">              
      <a>${t.payment}</a>
      <img class="icon-arrow" src="assets/img/icon-arrow.svg"><br>
    </div>
    <div class="roll-box-collapse">
      ${t.paymentDetails}
    </div>
  </div>  
</div>
      </div>
    </div>
    <div class="product-details-wrap">
      <div class="product-details-switch">
        <h2 data-tab="tab1">${t.fullDescription}</h2>
        <h2 data-tab="tab2">${t.characteristics}</h2>
        <h2 data-tab="tab3">${t.reviews}</h2>
        <div class="underline"></div>
      </div>
      <div id="tab1" class="product-details"><a>${product.fullDescription}</a></div>
      <div id="tab2" class="product-perameters">${createParameters(product.parameters)}</div>
      <div id="tab3" class="product-reviews"></div>
    </div>
  `;
}

// ===== 4. Обработчики =====

// ===== 4. Roll-box =====
function initRollBoxes() {
  document.querySelectorAll('.roll-box-line-head').forEach(head => {
    head.addEventListener('click', () => {
      const collapse = head.nextElementSibling;
      if (!collapse) return;
      collapse.style.display = (collapse.style.display === 'flex') ? 'none' : 'flex';
      const arrow = head.querySelector('.icon-arrow');
      if (arrow) arrow.style.transform = collapse.style.display === 'flex' ? 'rotate(180deg)' : 'rotate(0deg)';
    });
  });
}


function initEvents() {
  document.querySelectorAll('.product-details-switch h2').forEach(tab => {
    tab.addEventListener('click', () => showTab(tab.dataset.tab, tab));
  });

  document.querySelector('.thumbs-scroll')?.addEventListener('click', (e) => {
    if (e.target.tagName === 'IMG') changeImage(e.target.src);
  });

  document.querySelector('.thumb-arrow.left')?.addEventListener('click', () => scrollThumbs(-1));
  document.querySelector('.thumb-arrow.right')?.addEventListener('click', () => scrollThumbs(1));
}

function scrollThumbs(direction) {
  const container = document.querySelector('.thumbs-scroll');
  container.scrollLeft += direction * 70;
}

function changeImage(src) {
  document.getElementById('mainImage').src = src;
}

function showTab(tabId, el) {
  document.querySelectorAll('#tab1, #tab2, #tab3').forEach(tab => tab.style.display = 'none');
  document.getElementById(tabId).style.display = 'flex';
  document.querySelectorAll('.product-details-switch h2').forEach(t => t.classList.remove('active'));
  el.classList.add('active');
}

// ===== 5. Инициализация =====
function init() {

  console.log("LANG =", lang);
  console.log('t', t);
  console.log('products', products);

  if (!product) return console.error('Product not found');
  createNavigation(product);
  renderProduct(product);
  initEvents();
  document.querySelector('.product-details-switch h2')?.click();
  initArrowControls(product.img);
  initRollBoxes()
}

function initArrowControls(images) {
  let currentIndex = 0;
  const mainImage = document.getElementById('mainImage');
  const thumbs = document.querySelectorAll('.thumb-item');
  const leftBtn = document.querySelector('.gallery-arrow.left');
  const rightBtn = document.querySelector('.gallery-arrow.right');

  function updateImage(index) {
    currentIndex = index;
    mainImage.src = images[currentIndex];
    thumbs.forEach((thumb, i) => {
      thumb.classList.toggle('active', i === currentIndex);
    });
  }

  leftBtn.addEventListener('click', () => {
    if (currentIndex > 0) {
      updateImage(currentIndex - 1);
    }
  });

  rightBtn.addEventListener('click', () => {
    if (currentIndex < images.length - 1) {
      updateImage(currentIndex + 1);
    }
  });

  thumbs.forEach((thumb, i) => {
    thumb.addEventListener('click', () => updateImage(i));
  });
}



window.addEventListener('load', init);
