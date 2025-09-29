import { Router } from "express"
import ProductCController from "../controllers/ProductC.controller"

const router = Router()

// Создать один продукт
router.post("/load", ProductCController.addProduct)

// Создать несколько продуктов
router.post("/many", ProductCController.addManyProducts)

// Получить все продукты
router.get("/products", ProductCController.getProducts)

// Получить продукт по ID
router.get("/:id", ProductCController.getProductById)

// Удалить продукт по ID
router.delete("/:id", ProductCController.deleteProduct)

export default router
