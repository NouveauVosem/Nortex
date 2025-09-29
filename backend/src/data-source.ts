
import 'reflect-metadata'
import { DataSource } from 'typeorm'
import { ProductC } from './entity/ProductC'
import { ProductCImage } from './entity/ProductCImage'
import { ProductCParametr } from './entity/ProductCParametr'

const dataSource = new DataSource({
  type: "postgres",
  host: process.env.DB_HOST,
  port: parseInt("5432"),
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE,
  synchronize: true,
  logging: true,
  entities: [ProductC, ProductCImage, ProductCParametr],
})

export default dataSource

