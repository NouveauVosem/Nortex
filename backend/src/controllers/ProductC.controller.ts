import { Request, Response } from "express"
import ds from "../data-source"
import { ProductC } from "../entity/ProductC"
import { ProductCImage } from "../entity/ProductCImage"
import { ProductCParametr } from "../entity/ProductCParametr"

const productRepo = ds.getRepository(ProductC)

class ProductCController {
  // Добавление одного продукта
  async addProduct(req: Request, res: Response) {
    try {
      const {
        name,
        power,
        efficiency,
        electrodeDiameterMax,
        code,
        fullDescription,
        shortDescription,
        price,
        type,
        images,
        parameters,
      } = req.body

      // Проверка картинок
      if (!images || !Array.isArray(images) || images.length === 0) {
        return res.status(400).json({ message: "At least one image is required" })
      }
      if (images.length > 4) {
        return res.status(400).json({ message: "Maximum 4 images allowed" })
      }

      const product = productRepo.create({
        name,
        power,
        efficiency,
        electrodeDiameterMax,
        code,
        fullDescription,
        shortDescription,
        price,
        type,
        images: images.map((url: string) => {
          const img = new ProductCImage()
          img.url = url
          return img
        }),
        parameters: parameters?.map((p: { label: string; value: string }) => {
          const param = new ProductCParametr()
          param.label = p.label
          param.value = p.value
          return param
        }) || [],
      })

      await productRepo.save(product)
      res.json(product)
    } catch (err: any) {
      console.error(err)
      res.status(500).json({ error: err.message })
    }
  }

  // Добавление нескольких продуктов
  async addManyProducts(req: Request, res: Response) {
    try {
      const productsData = req.body

      const products = productsData.map((p: any) => {
        if (!p.images || !Array.isArray(p.images) || p.images.length === 0) {
          throw new Error("Each product must have at least one image")
        }
        if (p.images.length > 4) {
          throw new Error("Maximum 4 images allowed per product")
        }

        return productRepo.create({
          ...p,
          images: p.images.map((url: string) => {
            const img = new ProductCImage()
            img.url = url
            return img
          }),
          parameters: p.parameters?.map((param: any) => {
            const paramObj = new ProductCParametr()
            paramObj.label = param.label
            paramObj.value = param.value
            return paramObj
          }) || [],
        })
      })

      await productRepo.save(products)
      res.json(products)
    } catch (err: any) {
      console.error(err)
      res.status(500).json({ error: err.message })
    }
  }

  // Получение всех продуктов
  async getProducts(req: Request, res: Response) {
    try {
      const products = await productRepo.find({ relations: ['images', 'parameters'] })
      res.json(products)
    } catch (err: any) {
      console.error(err)
      res.status(500).json({ error: err.message })
    }
  }

  // Получение одного продукта по ID
  async getProductById(req: Request, res: Response) {
    try {
      const { id } = req.params
      const product = await productRepo.findOne({
        where: { id: parseInt(id) },
        relations: ['images', 'parameters'],
      })
      if (!product) return res.status(404).json({ message: "Product not found" })
      res.json(product)
    } catch (err: any) {
      console.error(err)
      res.status(500).json({ error: err.message })
    }
  }

  // Удаление продукта
  async deleteProduct(req: Request, res: Response) {
    try {
      const { id } = req.params
      const result = await productRepo.delete(id)
      if (result.affected === 0) return res.status(404).json({ message: "Product not found" })
      res.json({ message: "Product deleted" })
    } catch (err: any) {
      console.error(err)
      res.status(500).json({ error: err.message })
    }
  }
}

export default new ProductCController()
