import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose'
import { HydratedDocument } from 'mongoose'

export type ProductDocument = HydratedDocument<Product>

@Schema()
export class Product {
  @Prop()
  name!: string

  @Prop()
  product_rating!: number

  @Prop()
  description?: string

  @Prop()
  price!: number

  @Prop()
  stock!: number

  @Prop()
  product_type_id!: number

  @Prop()
  image_url?: string

  @Prop()
  Supplier!: string

  @Prop()
  expired_date!: Date

  @Prop()
  volume!: number

  @Prop({ default: Date.now })
  created_at!: Date

  @Prop({ default: Date.now })
  updated_at!: Date
}

export const ProductSchema = SchemaFactory.createForClass(Product)
