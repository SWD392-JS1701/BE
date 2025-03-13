import { Body, Controller, Delete, Get, Param, Patch, Post } from '@nestjs/common';
import { OrderService } from '../services/order.service';
import { CreateOrderDto, UpdateOrderDto } from '../dtos/order.dto';
import { Order } from '../models/order.model';

@Controller('order')
export class OrderController {
  constructor(private readonly orderService: OrderService) {}

  @Post()
  async create(@Body() createOrderDto: CreateOrderDto): Promise<Order> {
    return this.orderService.createOrder(createOrderDto);
  }

  @Get('orders') 
  async findAll(): Promise<Order[]> {
    return this.orderService.getAllOrders();
  }

  @Get(':id')
  async findOne(@Param('id') id: string): Promise<Order> {
    return this.orderService.getOrderById(id);
  }

  @Get('user/:userId')
  async findByUserId(@Param('userId') userId: string): Promise<Order[]> {
    return this.orderService.getOrdersByUserId(userId);
  }

  @Patch(':id')
  async update(@Param('id') id: string, @Body() updateOrderDto: UpdateOrderDto): Promise<Order> {
    return this.orderService.updateOrder(id, updateOrderDto);
  }

  @Delete(':id')
  async remove(@Param('id') id: string): Promise<Order> {
    return this.orderService.deleteOrder(id);
  }
}
