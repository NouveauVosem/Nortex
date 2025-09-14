import { getCurrentLang } from './utils.js';

export function generateFooter() {

  const lang = getCurrentLang();

  const texts = {
    ukr: {
      assortment: 'Асортимент',
      products: [
        { id: 1, name: 'Зварювальний апарат MIG 250P' },
        { id: 2, name: 'Зварювальний апарат MIG 250' },
        { id: 4, name: 'Плазморіз інверторний Nortex CUT-80 (80А)' }
      ],
      info: 'Інформація',
      contacts: 'Контакти',
      about: 'Про нас'
    },
    eng: {
      assortment: 'Assortment',
      products: [
        { id: 1, name: 'Welding machine MIG 250P' },
        { id: 2, name: 'Welding machine MIG 250' },
        { id: 4, name: 'Inverter plasma cutter Nortex CUT-80 (80A)' }
      ],
      info: 'Information',
      contacts: 'Contacts',
      about: 'About Us'
    }
  };

  const t = texts[lang];

  // Функция формирования ссылки на страницу с учётом языка
  function link(page) {
    return lang === 'eng' ? `./${page}-eng.html` : `./${page}.html`;
  }

  return `
            <div class="footer-logo">
          <img src="./assets/img/nortex-logo-white.svg" />
        </div>
        <div class="footer-assortment">
          <h4>${t.assortment}</h4>
          ${t.products
        .map(p => `<a href="${link('product')}?id=${p.id}" class="footer-text-white">${p.name}</a>`)
        .join('')}
        </div>
        <div class="footer-info">
          <h4>${t.info}</h4>
          <a href="${link('contacts')}" class="footer-text-white">${t.contacts}</a>
          <a href="${link('about')}" class="footer-text-white">${t.about}</a>
        </div>
        <div class="footer-contacts">
          <h4>${t.contacts}</h4>
          <p id='contacts-email-footer' class="footer-text-white">nortex@gmail.com</p>
          <p id='contacts-phone-footer' class="footer-text-white">+4 000 00 00 00</p>
        </div>
  `;
}