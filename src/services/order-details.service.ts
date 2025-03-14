import { Injectable, NotFoundException } from '@nestjs/common';
import { OrderDetailsRepository } from '../repositories/order-details.repository';
import { CreateOrderDetailsDto, UpdateOrderDetailsDto } from '../dtos/order-details.dto';
import { OrderDetails } from '../models/order-details.model';

@Injectable()
export class OrderDetailsService {
  constructor(private readonly orderDetailsRepository: OrderDetailsRepository) {}

  async createOrderDetails(createOrderDetailsDto: CreateOrderDetailsDto): Promise<OrderDetails> {
    return this.orderDetailsRepository.create(createOrderDetailsDto);
  }

  async getAllOrderDetails(): Promise<OrderDetails[]> {
    return this.orderDetailsRepository.findAll();
  }

  async getOrderDetailsById(id: string): Promise<OrderDetails> {
    const orderDetails = await this.orderDetailsRepository.findById(id);
    if (!orderDetails) {
      throw new NotFoundException('Order Details not found');
    }
    return orderDetails;
  }

  async getOrderDetailsByOrderId(orderId: string): Promise<{ orderDetails: OrderDetails[] }> {
    const orderDetails = await this.orderDetailsRepository.findByOrderId(orderId);
    return { orderDetails };
  }

  async updateOrderDetails(id: string, updateOrderDetailsDto: UpdateOrderDetailsDto): Promise<OrderDetails> {
    const updatedOrderDetails = await this.orderDetailsRepository.update(id, updateOrderDetailsDto);
    if (!updatedOrderDetails) {
      throw new NotFoundException('Order Details not found');
    }
    return updatedOrderDetails;
  }

  async deleteOrderDetails(id: string): Promise<OrderDetails> {
    const deletedOrderDetails = await this.orderDetailsRepository.delete(id);
    if (!deletedOrderDetails) {
      throw new NotFoundException('Order Details not found');
    }
    return deletedOrderDetails;
  }
}
