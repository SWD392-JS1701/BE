import { Injectable, NotFoundException } from '@nestjs/common';
import { OrderRepository } from '../repositories/order.repository';
import { CreateOrderDto, UpdateOrderDto } from '../dtos/order.dto';
import { Order } from '../models/order.model';

@Injectable()
export class OrderService {
  constructor(private readonly orderRepository: OrderRepository) {}

  async createOrder(createOrderDto: CreateOrderDto): Promise<Order> {
    return this.orderRepository.create(createOrderDto);
  }

  async getAllOrders(): Promise<Order[]> {
    return this.orderRepository.findAll();
  }

  async getOrderById(id: string): Promise<Order> {
    const order = await this.orderRepository.findById(id);
    if (!order) {
      throw new NotFoundException('Order not found');
    }
    return order;
  }

  async getOrdersByUserId(userId: string): Promise<Order[]> {
    return this.orderRepository.findByUserId(userId);
  }

  async updateOrder(id: string, updateOrderDto: UpdateOrderDto): Promise<Order> {
    const updatedOrder = await this.orderRepository.update(id, updateOrderDto);
    if (!updatedOrder) {
      throw new NotFoundException('Order not found');
    }
    return updatedOrder;
  }

  async deleteOrder(id: string): Promise<Order> {
    const deletedOrder = await this.orderRepository.delete(id);
    if (!deletedOrder) {
      throw new NotFoundException('Order not found');
    }
    return deletedOrder;
  }
}
