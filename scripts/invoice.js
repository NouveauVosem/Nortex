import { companyTemplate } from "./companyTemplate.js";

const formData = JSON.parse(localStorage.getItem("lastOrder"));
console.log(formData);

function createInvoice(company, formData) {
  return {
    // Дані рахунку
    invoiceId: "INV-" + formData.orderId,
    invoiceDate: formData.dateNow,

    // Продавець
    seller: { ...company },

    // Покупець (заповнюється з форми)
    buyer: {
      companyName: formData.companyName,
      companyNumber: formData.companyNumber,
      firstName: formData.firstName,
      lastName: formData.lastName,
      email: formData.email,
      phone: formData.phone,
      address: {
        country: formData.country,
        city: formData.city,
        zip: formData.zip,
        companyOrg: formData.companyOrg,
        street: formData.address
      }
    },

    // Замовлення
    order: {
      orderId: formData.orderId,
      productId: formData.productId,
      productName: formData.productName,
      productPrice: Number(formData.productPrice).toFixed(2),
      quantity: 1, // якщо замовляється один товар, можна зробити змінним
      total: Number(formData.productPrice).toFixed(2),
      comment: formData.orderComment
    },

    // Умови
    delivery: formData.delivery,
    payerType: formData.payerType,
    sameAsDelivery: formData.sameAsDelivery
  };
}

// ✅ Приклад використання
const invoice = createInvoice(companyTemplate, formData);

console.log(invoice);


function generateInvoice() {


  
}