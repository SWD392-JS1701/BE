import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose'
import { HydratedDocument, Mongoose, Types } from 'mongoose'

export type OrderDocument = HydratedDocument<Order>
@Schema({ timestamps: true })
export class Order {
    @Prop({ required: true })
    user_Id!: string

    @Prop()
    amount!: number

    @Prop({default: 1})
    status!: number

    createdAt!: Date
    updatedAt!: Date
}
export const OrderSchema = SchemaFactory.createForClass(Order)