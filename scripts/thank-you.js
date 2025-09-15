// Получаем ID заказа из URL
    const params = new URLSearchParams(window.location.search);
    const orderId = params.get("orderId");

    document.getElementById("orderId").textContent = "Номер замовлення: " + orderId || "Не знайдено";