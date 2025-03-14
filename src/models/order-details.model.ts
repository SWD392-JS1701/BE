import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose'
import { HydratedDocument, Mongoose, Types } from 'mongoose'

@Schema()
export class ProductList {
  @Prop({ required: true })
  product_Id!: string; 

  @Prop({ required: true })
  quantity!: number;
}

export const ProductListSchema = SchemaFactory.createForClass(ProductList);

export type OrderDetailsDocument = HydratedDocument<OrderDetails>
@Schema()
export class OrderDetails{
    @Prop({required: true})
    order_Id! : string

    @Prop({ type: [ProductListSchema], default: [] })
    product_List!: ProductList[];

}
export const OrderDetailsSchema = SchemaFactory.createForClass(OrderDetails)


