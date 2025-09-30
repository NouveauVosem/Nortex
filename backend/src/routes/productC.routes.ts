import { Router } from "express"
import ProductCController from "../controllers/ProductC.controller"

const router = Router()

// Создать один продукт
router.post("/add", ProductCController.addProduct)

// Создать несколько продуктов
router.post("/addMany", ProductCController.addManyProducts)

// Получить все продукты
router.get("/", ProductCController.getProducts)

// Получить продукт по ID
router.get("/:id", ProductCController.getProductById)

// Удалить продукт по ID
router.delete("/:id", ProductCController.deleteProduct)

export default router
