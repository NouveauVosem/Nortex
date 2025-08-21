import { getCurrentLang } from './header.js';

function generateGalleryItem (product) {

  const lang = getCurrentLang();

  // Словарь переводов
  const translations = {
    ukr: {
      delivery: 'Доставимо',
      pickup: 'Cамовивіз',
      more: 'Дізнатися більше'
    },
    eng: {
      delivery: 'Delivery',
      pickup: 'Pickup',
      more: 'Learn more'
    }
  };

  const t = translations[lang] || translations.ukr;


  //load parameters
  const parametersHTML = product.parameters
    .slice(0, 3)
    .map(param => `<a>${param.label}: <b>${param.value}</b></a>`)
    .join('<br/>');

  // Определяем страницу продукта в зависимости от языка
  const productPage = lang === 'eng' ? 'product-eng.html' : 'product.html';

  return `            
              <div class="product">
              <div class="product-img">
              <a href="./${productPage}?id=${product.id}">
              <img src=${product.img[0]}>
              </a>
              </div>
              <div class="product-title">
                <a href="./${productPage}?id=${product.id}"><h3><b>${product.name}</b></h3></a>
              </div>
              <div class="product-icon">
                <div>
                <img src="assets/img/icon-delivery-truck.svg">
                <a>${t.delivery}</a>
                </div>
                <div>
                <img src="assets/img/icon-delivery-self.svg">
                <a>${t.pickup}</a>
                </div>
              </div>
              
              <div class="product-info">
                ${parametersHTML}
              </div>

              <div class="product-btn-wrap">
                <button class="btn-product">
                <a href="./${productPage}?id=${product.id}">${t.more}</a>
                </button>
              </div>
              
            </div>`
}

export function generateGallery(products) {
  let galleryHTML = "";
  products.forEach( (product) => {
    galleryHTML += generateGalleryItem(product);
  })
  return galleryHTML;
}