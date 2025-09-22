const formData = new FormData()
formData.append('file', file1)
formData.append('file', file2)

const uploadRes = await fetch('http://localhost:4000/upload', {
  method: 'POST',
  body: formData
})
const data = await uploadRes.json()
const imageUrls = data.files  // ['/cdn/uploads/uuid1.png', '/cdn/uploads/uuid2.jpg']


await fetch('http://localhost:3000/products', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
  "name": "Сварочник",
  "power": "2000Вт",
  "efficiency": "85%",
  "electrodeDiameterMax": "4мм",
  "code": "PRD001",
  "fullDescription": "Полное описание продукта",
  "shortDescription": "Краткое описание",
  "price": 1000.00,
  "type": "electronics",
  "images": [
    "/cdn/uploads/uuid1.png",
    "/cdn/uploads/uuid2.jpg"
  ],
  "parameters": [
    { "label": "Мощность", "value": "2000Вт" },
    { "label": "Вес", "value": "15кг" }
  ]
})
})