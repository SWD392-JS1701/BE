import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { OrderDetails, OrderDetailsDocument } from '../models/order-details.model';

@Injectable()
export class OrderDetailsRepository {
  constructor(@InjectModel(OrderDetails.name) private orderDetailsModel: Model<OrderDetailsDocument>) {}

  async create(orderDetailsData: Partial<OrderDetails>): Promise<OrderDetails> {
    const newOrderDetails = new this.orderDetailsModel(orderDetailsData);
    return newOrderDetails.save();
  }

  async findAll(): Promise<OrderDetails[]> {
    return this.orderDetailsModel.find().exec();
  }

  async findById(id: string): Promise<OrderDetails | null> {
    return this.orderDetailsModel.findById(id).exec();
  }

  async findByOrderId(orderId: string): Promise<OrderDetails[]> {
    return this.orderDetailsModel.find({ order_Id: orderId }).exec();
  }

  async update(id: string, orderDetailsData: Partial<OrderDetails>): Promise<OrderDetails | null> {
    return this.orderDetailsModel.findByIdAndUpdate(id, orderDetailsData, { new: true }).exec();
  }

  async delete(id: string): Promise<OrderDetails | null> {
    return this.orderDetailsModel.findByIdAndDelete(id).exec();
  }
}
