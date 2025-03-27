import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose'
import { HydratedDocument } from 'mongoose'

export type PaymentDocument = HydratedDocument<Payment>

@Schema()
export class Payment {
  @Prop({ required: true })
  order_Id!: string

  @Prop({ default: 0 })
  status!: number

  @Prop()
  orderCode?: number
}
export const PaymentSchema = SchemaFactory.createForClass(Payment)
