import { products } from "./products.js";
// function generateGalleryItem (product) {
//   return `<div class="product-item" data-id=${product.id}>
//       <div class="product-image">
//         <img src=${product.img} />
//       </div>
//       <div class="product-name">
//         <p>${product.name}</p>
//       </div>
//     </div>`
// }

function generateGalleryItem (product) {
  return `            <div class="product">
              <a href="./product.html?id=${product.id}"><img src=${product.img[0]}></a>
              <div class="product-title">
                <a href="./product.html?id=${product.id}"><h3><b>${product.name}</b></h3></a>
              </div>
              <div class="product-icon">
                <img src="assets/img/icon-delivery-truck.svg">
                <a>Доставимо</a>
                <img src="assets/img/icon-delivery-self.svg">
                <a>Cамовивіз</a>
              </div>
              
              <div class="product-info">
                <a>Напруга живлення: <b>${product.power}</b></a><br/>
                <a>ККД: <b>${product.efficiency}</b></a><br/>
                <a>Максимальний діаметр електрода: <b>${product.electrodeDiameterMax}</b></a>
              </div>

              <div class="product-btn-wrap">
                <button class="btn-product">
                <a href="./product.html?id=${product.id}">Дізнатися більше</a>
                </button>
              </div>
              
            </div>`
}

function generateGallery(products) {
  let galleryHTML = "";
  products.forEach( (product) => {
    galleryHTML += generateGalleryItem(product);
  })
  return galleryHTML;
}

document.querySelector('.product-list').innerHTML=generateGallery(products);

function generateProduct() {
  
}