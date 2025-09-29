import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from "typeorm"
import { ProductCImage } from "./ProductCImage"
import { ProductCParametr } from "./ProductCParametr"

export type ProductCType = "electronics" | "clothing" | "food" | "other"

@Entity()
export class ProductC {
  @PrimaryGeneratedColumn()
  id: number

  @Column()
  name: string

  @Column({ type: "text" })
  power: string

  @Column({ type: "text" })
  efficiency: string

  @Column({ type: "text" })
  electrodeDiameterMax: string

  @OneToMany(() => ProductCParametr, (parametr) => parametr.product, { cascade: true, eager: true })
  parameters: ProductCParametr[]

  @Column({ type: "text" })
  code: string

  @Column({ type: "text" })
  fullDescription: string

  @Column({ type: "text", nullable: true })
  shortDescription: string

  @Column("decimal", { precision: 10, scale: 2 })
  price: number

  @OneToMany(() => ProductCImage, (image) => image.product, { cascade: true, eager: true })
  images: ProductCImage[]

  @Column({ type: "varchar", length: 50, default: "other" })
  type: ProductCType
}
