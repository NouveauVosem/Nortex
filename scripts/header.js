
export function getTranslatedPageLink(targetLang) {
  const path = window.location.pathname;    // например, /product.html или /product-eng.html
  const params = window.location.search;    // например, ?id=123

  const filename = path.substring(path.lastIndexOf('/') + 1);

  const isEng = filename.includes('-eng');
  const baseName = filename.replace('-eng', '').replace('.html', '');

  if (targetLang === 'eng') {
    // Для eng — если уже eng, просто вернуть текущий
    if (isEng) {
      return filename + params;
    } else {
      return `${baseName}-eng.html` + params;
    }
  } else {
    // Для укр — если уже укр, вернуть текущий
    if (!isEng) {
      return filename + params;
    } else {
      return `${baseName}.html` + params;
    }
  }
}

  // Использование:
const translatedLink = getTranslatedPageLink();
console.log(translatedLink);

export function getCurrentLang() {
  const filename = window.location.pathname.substring(window.location.pathname.lastIndexOf('/') + 1);
  return filename.includes('-eng') ? 'eng' : 'ukr';
}

export function generateHeader() {

   const lang = getCurrentLang();

  // Тексты для украинского и английского
  const texts = {
    ukr: {
      gallery: 'Галерея',
      about: 'Про нас',
      contacts: 'Контакти',
      order: 'Замовити',
      askProduct: 'Запитайте про продукт',
      namePlaceholder: "Iм'я",
      emailPlaceholder: 'Email',
      subjectPlaceholder: 'Номер телефону',
      messagePlaceholder: 'Хочу замовити цей товар. Будь ласка, зв’яжіться зі мною для уточнення деталей.',
      send: 'Відправити',
      ukrBtn: 'укр',
      engBtn: 'eng'
    },
    eng: {
      gallery: 'Gallery',
      about: 'About Us',
      contacts: 'Contacts',
      order: 'Order',
      askProduct: 'Ask about product',
      namePlaceholder: 'Name',
      emailPlaceholder: 'Email',
      subjectPlaceholder: 'Phone number',
      messagePlaceholder: 'I want to order this product. Please contact me to clarify details.',
      send: 'Send',
      ukrBtn: 'укр',
      engBtn: 'eng'
    }
  };

  const t = texts[lang];

  function link(page) {
    return lang === 'eng' ? `./${page}-eng.html` : `./${page}.html`;
  }


  return `
        <header>
      <div class="header-top">
        <div id="contacts-phone-header" class="header-phone"></div>
        
         <div class="language-container">
          <button class="btn-light lang-btn" data-lang="ukr">укр</button>
          <button class="btn-light lang-btn" data-lang="eng">eng</button>
      </div>
      </div>
     
      <div class="header-content">
        
        <div class="header-left">
          <div class="logo">
            <a href="${link('index')}"><img src="assets/img/nortex-logo-orange.svg"/></a>
          </div>
        </div>
        <div class="header-right">
          <nav class="navbar-container">
              <li class="navbar-item"><a href="${link('index')}">${t.gallery}</a></li>
              <li class="navbar-item"><a href="${link('about')}">${t.about}</a></li>
              <li class="navbar-item"><a href="${link('contacts')}">${t.contacts}</a></li>
          </nav>
          <button id="openModal" class="btn-orange">${t.order}</button>
          
        </div>
      </div>
      <div class="modal-overlay" id="modalOverlay">
        <div class="modal">
          <span class="close-btn" id="closeModal">&times;</span>
          <h3>${t.askProduct}</h3>
          <form action="https://formsubmit.co/nouveauvosem@gmail.com" method="POST" class="contact-input-form">
            <input class="contact-input" name="name" type="text" placeholder="${t.namePlaceholder}">
            <input class="contact-input" name="email" type="text" placeholder="${t.emailPlaceholder}">
            <input class="contact-input" name="subject" type="text" placeholder="${t.subjectPlaceholder}">
            <textarea name="message" class="contact-textarea" type="text" placeholder="${t.messagePlaceholder}"></textarea>
            <button class="btn-orange">${t.send}</button>
          </form>
        </div>
      </div>
    </header>
  `;
}