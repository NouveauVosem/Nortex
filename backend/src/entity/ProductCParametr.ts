import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from "typeorm"
import { ProductC } from "./ProductC"

@Entity()
export class ProductCParametr {
  @PrimaryGeneratedColumn()
  id: number

  @Column()
  label: string

  @Column()
  value: string

  @ManyToOne(() => ProductC, (product) => product.parameters, { onDelete: "CASCADE" })
  product: ProductC
}
