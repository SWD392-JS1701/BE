import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose'
import { Document } from 'mongoose'

@Schema()
export class PromotedProduct {
  @Prop({ required: true })
  promotion_id!: number

  @Prop({ required: true })
  product_id!: number
}

export type PromotedProductDocument = PromotedProduct & Document
export const PromotedProductSchema = SchemaFactory.createForClass(PromotedProduct)
