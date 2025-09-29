import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from "typeorm"
import { ProductC } from "./ProductC"

@Entity()
export class ProductCImage {
  @PrimaryGeneratedColumn()
  id: number

  @Column()
  url: string

  @ManyToOne(() => ProductC, (product) => product.images, { onDelete: "CASCADE" })
  product: ProductC
}
