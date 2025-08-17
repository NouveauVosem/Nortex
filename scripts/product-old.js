import { productTextsUA } from './translations-ua.js';
import { productTextsEN } from './translations-eng.js';
import { getCurrentLang } from './header.js';
import { products as productsEng } from './products-en.js';
import { products as productsUkr } from './products.js';


// Определяем язык
const lang = getCurrentLang();

// Выбираем массив продуктов
const products = lang === 'eng' ? productsEng : productsUkr;
const t = lang === 'eng' ? productTextsEN : productTextsUA;

// Получаем ID из URL
const params = new URLSearchParams(window.location.search);
const id = params.get('id');

// Ищем нужный продукт
const product = products.find((x) => x.id == id);

// Добавляем линк в навигацию
const nav = document.querySelector('.navigation-feed');
const productLink = document.createElement('a');
productLink.href = `./product.html?id=${id}`;
productLink.textContent = product.name;
nav.append(' > ');
nav.appendChild(productLink);


    // 2. Fetch product data (simulate with an object or fetch from API)

    async function loadProduct() {
       
      console.log(product);  
      
      // 3. Render data
      const container = document.getElementById('product');
      container.innerHTML = ` 
        <div class="product-name">
          <h2>${product.name}</h2>
        </div>

        <div class="product-wrap">

          <div class="product-gallery">
            <div class="product-gallery-main">
              <img id="mainImage" src="${product.img[0]}">
            </div>
            <div class="product-gallery-thumbs">
              
            </div>
          </div>

          <div class="product-buy-wrap">
            
            <div class="product-price-row">
              <div class="product-price">
                <a><span>${product.price}</span>${t.currency}</a>
              </div>
              <a href="https://buy.stripe.com/7sY3cu0XO0aLa9v7kD3wQ00" class="product-buy-btn">${t.buy}</a>
            </div>

            <div class="product-short-row">
              <a>${product.shortDescription}</a>
            </div>

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
                <div class="roll-box-line" onclick="toggleCollapse(this)">
                <div class="roll-box-line-head">
                <img src="assets/img/icon-delivery-truck.svg">              
                <a>${t.delivery}</a>
                <img class="icon-arrow" src="assets/img/icon-arrow.svg" ><br>
                </div>
                <div class="roll-box-collapse" >
                ${t.deliveryDetails}
                </div>
              </div>
              <div class="roll-box-line" onclick="toggleCollapse(this)">
                <div class="roll-box-line-head">
                <img src="assets/img/icon-card.svg">              
                <a>${t.payment}</a>
                <img class="icon-arrow" src="assets/img/icon-arrow.svg" ><br>
                </div>
                <div class="roll-box-collapse" >
                  ${t.paymentDetails}
                </div>
              </div>  
            </div>
            
          </div>

        </div>
        
        <div class="product-details-wrap">
          <div class="product-details-switch">
            <h2 onclick="showTab('tab1', this)">${t.fullDescription}</h2>
            <h2 onclick="showTab('tab2', this)">${t.characteristics}</h2>
            <h2 onclick="showTab('tab2', this)">${t.reviews}</h2>
            <div class="underline"></div>
          </div>

          <div id="tab1" class="product-details">
            <a>
              ${product.fullDescription}
            </a>
            
          </div>

          <div id="tab2" class="product-perameters">
          </div>
          
        </div>`;
    }

// Old Load Product Call !!!!
    loadProduct();
    
    const imageContainer = document.querySelector('.product-gallery-thumbs')
    
    let imgs ='';

    product.img.forEach(x=>{
      imgs+= `<img src=${x} onclick="changeImage(this)">`
    })
    imageContainer.innerHTML = imgs;
    
    // generate thumbs with buttons

    const thumbsContainer = document.querySelector('.product-gallery-thumbs');

thumbsContainer.innerHTML = `
  <button class="thumb-arrow left" onclick="scrollThumbs(-1)">&#9664;</button>
  <div class="thumbs-scroll">
    ${product.img.map(src => `
      <img src="${src}" onclick="changeImage(this)" class="thumb-item">`).join('')}
  </div>
  <button class="thumb-arrow right" onclick="scrollThumbs(1)">&#9654;</button>
`;




      // 📌 2. Динамические характеристики

    
    const tab2 = document.getElementById("tab2");
    console.log(tab2);
    tab2.innerHTML = ""; // очищаем (если шаблон в HTML остался)
    product.parameters.forEach((param, index) => {
    const p = document.createElement("p");
    p.className = index % 2 === 0 ? "product-parameters-grey" : "product-parameters-white";
    p.innerHTML = `${param.label}: <b>${param.value}</b>`;
    tab2.appendChild(p);
    
  });


// gallery buttons

  function scrollThumbs(direction) {
  const container = document.querySelector('.thumbs-scroll');
  const scrollAmount = 70; // пикселей за клик
  container.scrollLeft += direction * scrollAmount;
}

  function toggleCollapse(element) {
    element.classList.toggle("active");
  }

  function changeImage(thumb) {
    const mainImage = document.getElementById('mainImage');
    mainImage.src = thumb.src;
  }

  function showTab(tabId,el) {

    document.getElementById('tab1').style.display = 'none';
    document.getElementById('tab2').style.display = 'none';
    document.getElementById(tabId).style.display = 'flex';

    const allTabs = document.querySelectorAll('.product-details-switch h2');
      allTabs.forEach(tab => tab.classList.remove('active'));

      el.classList.add('active');
  }

// fixed CLICK tab 1.
  window.addEventListener("load", () => {
  const firstTab = document.querySelector('.product-details-switch h2');
  if (firstTab) {
    firstTab.click();
  }
});

// THUMBNAILS functions 

// function changeMainImage(src) {
//   document.getElementById('mainImage').src = src;
// }



// Make global functions accessible (optional if using in HTML)
window.toggleCollapse = toggleCollapse;
window.changeImage = changeImage;
window.showTab = showTab;
window.scrollThumbs = scrollThumbs;

    
