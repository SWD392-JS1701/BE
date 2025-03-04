import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose'
import { Document } from 'mongoose'

@Schema()
export class ProductType {
  @Prop({ required: true })
  name!: string

  @Prop({ required: false })
  description?: string
}

export type ProductTypeDocument = ProductType & Document
export const ProductTypeSchema = SchemaFactory.createForClass(ProductType)
