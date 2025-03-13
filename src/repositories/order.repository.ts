import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Order, OrderDocument } from '../models/order.model';

@Injectable()
export class OrderRepository {
  constructor(@InjectModel(Order.name) private orderModel: Model<OrderDocument>) {}

  async create(orderData: Partial<Order>): Promise<Order> {
    const newOrder = new this.orderModel(orderData);
    return newOrder.save();
  }

  async findAll(): Promise<Order[]> {
    return this.orderModel.find().exec();
  }

  async findById(id: string): Promise<Order | null> {
    return this.orderModel.findById(id).exec();
  }

  async findByUserId(userId: string): Promise<Order[]> {
    return this.orderModel.find({ user_Id: userId }).exec();
  }

  async update(id: string, orderData: Partial<Order>): Promise<Order | null> {
    return this.orderModel.findByIdAndUpdate(id, orderData, { new: true }).exec();
  }

  async delete(id: string): Promise<Order | null> {
    return this.orderModel.findByIdAndDelete(id).exec();
  }
}
