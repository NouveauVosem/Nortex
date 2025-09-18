import { companyTemplate } from "./companyTemplate.js";

const orderData = JSON.parse(localStorage.getItem("lastOrder"));
console.log(orderData);

const company = companyTemplate;

// function createInvoice(company, formData) {
//   return {
//     // Дані рахунку
//     invoiceId: "INV-" + formData.orderId,
//     invoiceDate: formData.dateNow,

//     // Продавець
//     seller: { ...company },

//     // Покупець (заповнюється з форми)
//     buyer: {
//       companyName: formData.companyName,
//       companyNumber: formData.companyNumber,
//       firstName: formData.firstName,
//       lastName: formData.lastName,
//       email: formData.email,
//       phone: formData.phone,
//       address: {
//         country: formData.country,
//         city: formData.city,
//         zip: formData.zip,
//         companyOrg: formData.companyOrg,
//         street: formData.address,
//       },
//     },

//     // Замовлення
//     order: {
//       orderId: formData.orderId,
//       productId: formData.productId,
//       productName: formData.productName,
//       productPrice: Number(formData.productPrice).toFixed(2),
//       quantity: 1, // якщо замовляється один товар, можна зробити змінним
//       total: Number(formData.productPrice).toFixed(2),
//       comment: formData.orderComment,
//     },

//     // Умови
//     delivery: formData.delivery,
//     payerType: formData.payerType,
//     sameAsDelivery: formData.sameAsDelivery,
//   };
// }

// ✅ Приклад використання

// const invoice = createInvoice(companyTemplate, formData);

// console.log("invoice:" + invoice);

function generateInvoice() {
  const priceWithVat = Number(orderData.productPrice); 
  const vatRateString= company.vatRate;
  const vatRate = parseFloat(vatRateString) / 100; // 20% → 0.2

  const priceWithoutVat = priceWithVat / (1 + vatRate);
  const vatValue = priceWithVat - priceWithoutVat;

  document.getElementById("invoice").innerHTML = `
  <div class="invoice">
                <div class="invoice-head">
                  <div class="invoice-side-title">Ідентифікаційні дані</div>
                  <div class="invoice-head-left">
                    <div class="invoice-column-wrap">
                      <div class="invoice-column">
                        <div class="invoice-head-logo">
                          <img src="./assets/img/nortex-logo-orange.png" />
                        </div>
                        <div class="invoice-head-line">Продавець</div>
                        <div class="invoice-line">
                          <strong> ТОВ «Nortex»</strong>
                        </div>
                        <div class="invoice-line">
                          Адреса: <span>вул. Автотранспортна, 8а</br> м.Днірпо, Україна</span>
                        </div>
                        <div class="invoice-line">
                          ЄДРПОУ: <span> ${company.taxId}</span>
                        </div>
                      </div>
                      <div class="invoice-column invoice-column-last">
                        <div class="invoice-head-line">Контакти</div>

                        <div class="invoice-line">
                          Тел: <span> ${company.phone}</span>
                        </div>
                        <div class="invoice-line">
                          E-mail: <span> ${company.email}</span>
                        </div>
                      </div>
                      <div class="invoice-data-wrap">
                        <div class="invoice-data">
                          Дата виставлення: <span> ${orderData.date}</span>
                        </div>
                        <div class="invoice-data">
                          Строк оплати:<span> ${orderData.payDate}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div class="invoice-head-right">
                    <div class="invoice-head-line-r-wrap">
                      <div class="invoice-head-line-r-title">
                        <b>Рахунок-фактура</b>
                      </div>
                      <div class="invoice-head-code">
                        <b>${orderData.orderId}</b>
                      </div>
                    </div>
                    <div class="invoice-column-r">
                      <div class="invoice-head-line-r">Покупець</div>
                      <div class="invoice-line">
                        <strong> ${orderData.firstName} ${orderData.lastName}</strong>
                      </div>
                      <div class="invoice-line">
                        ЄДРПОУ: <span> ${orderData.companyNumber}</span>
                      </div>
                      <div class="invoice-line">
                        Адреса: <span> ${orderData.address}, ${orderData.city}, ${orderData.zip}</span>
                      </div>
                      <div class="invoice-line">
                        Тел: <span> ${orderData.phone}</span>
                      </div>
                    </div>
                  </div>
                </div>
                <div class="invoice-main">
                  <div class="invoice-side-title white">Реквізитні дані</div>
                  <div class="invoice-main-wrap">
                    <div class="invoice-main-column">
                      <div class="invoice-main-headline">Рахунок</div>
                      <div class="invoice-main-line">
                        <span> ${company.accNumber} / ${company.bankNumber}</span>
                      </div>
                      <div class="invoice-main-line">
                        IBAN: <span> ${company.bankAccount}</span>
                      </div>
                      <div class="invoice-main-line">
                        SWIFT: <span> ${company.swift}</span>
                      </div>
                    </div>

                    <div class="invoice-main-column">
                      <div class="invoice-main-headline">Cимвол</div>
                      <div class="invoice-main-line">
                        Варіабельний: <span> ${orderData.orderId}</span>
                      </div>
                      <div class="invoice-main-line">
                        Константний: <span> ${company.constSymbol}</span>
                      </div>
                    </div>
                    <div class="invoice-main-column-last">
                      <div class="invoice-main-line">
                        спосіб оплати: готівкою
                      </div>
                      <div class="invoice-main-total">
                        До оплати: <span> ${orderData.productPrice},- грн</span>
                      </div>
                    </div>
                  </div>
                  <div class="invoice-main-qr-code"></div>
                </div>
                <div class="invoice-list">
                  <div class="invoice-side-title">Фактуруємо вам</div>
                  <div class="invoice-list-wrap">
                    <div class="invoice-list-title">
                      Надсилаємо вам авансовий рахунок за замовлений товар або
                      послугу:
                    </div>
                    <table class="invoice-table">
                      <thead>
                        <tr class="tr-first">
                          <th class="th-first">Ідентифікатор поставки</th>
                          <th>Кількість</th>
                          <th>Ціна за од.</th>
                          <th>ПДВ</th>
                          <th>Без ПДВ</th>
                          <th>Всього</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr>
                          <td class="th-first">
                            ${orderData.productName}
                          </td>
                          <td>1 шт.</td>
                          <td>${orderData.productPrice},-</td>
                          <td>${company.vatRate}</td>
                          <td>${priceWithoutVat},- </td>
                          <td class="td-last">${orderData.productPrice},- грн</td>
                        </tr>

                      </tbody>
                    </table>
                    <div class="invoice-list-message">
                      Товар буде надіслано вам після отримання платежу на наш
                      рахунок.
                    </div>
                  </div>
                </div>
                <div class="invoice-summary">
                  <div class="invoice-side-title">Підсумок</div>

                  <div class="invoice-summary-left">
                    <div class="sign-text">Печатка і підпис:</div>
                    <div class="sign-image">
                      <img src="./assets/img/my-sign.jpg" />
                    </div>
                  </div>
                  <div class="invoice-summary-right">
                    <div class="invoice-summary-wrap">
                      <table class="invoice-table">
                        <thead>
                          <tr class="tr-first">
                            <th class="th-first">Ставка ПДВ</th>
                            <th>Ціна без ПДВ</th>
                            <th>Сума ПДВ</th>
                            <th>Всього</th>
                          </tr>
                        </thead>
                        <tbody>
                          <tr>
                            <td>${company.vatRate}</td>
                            <td>${priceWithoutVat},- грн</td>
                            <td>${vatValue},- грн</td>
                            <td>${orderData.productPrice},- грн</td>
                          </tr>
                        </tbody>
                      </table>
                      <div class="summary-total-box">
                        <div class="summary-total-box-text">
                          Разом до сплати:
                        </div>
                        <div class="summary-total-box-number">${orderData.productPrice},- грн</div>
                      </div>
                    </div>
                  </div>
                </div>
                <div class="invoice-footer">
                  Дякуємо за замовлення у ТОВ «Nortex»
                </div>
              </div>
              `;
}

generateInvoice();
