import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose'
import { Document } from 'mongoose'

@Schema()
export class Promotion {
  @Prop({ required: true })
  title!: string

  @Prop()
  description?: string

  @Prop({ required: true })
  discount_percentage!: number

  @Prop({ required: true })
  start_date!: Date

  @Prop({ required: true })
  end_date!: Date
}

export type PromotionDocument = Promotion & Document
export const PromotionSchema = SchemaFactory.createForClass(Promotion)
