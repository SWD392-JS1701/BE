import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose'
import { HydratedDocument, Types } from 'mongoose'

export type PaymentDocument = HydratedDocument<Payment>

@Schema()
export class Payment {
  @Prop({ type: Types.ObjectId, required: true, ref: 'Order' }) // Define as ObjectId and reference the Order model
  order_Id!: Types.ObjectId

  @Prop({ default: 1 })
  status!: number
}

export const PaymentSchema = SchemaFactory.createForClass(Payment)
