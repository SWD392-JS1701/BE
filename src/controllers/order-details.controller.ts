import { Body, Controller, Delete, Get, Param, Patch, Post } from '@nestjs/common';
import { OrderDetailsService } from '../services/order-details.service';
import { CreateOrderDetailsDto, UpdateOrderDetailsDto } from '../dtos/order-details.dto';
import { OrderDetails } from '../models/order-details.model';

@Controller('order-details')
export class OrderDetailsController {
  constructor(private readonly orderDetailsService: OrderDetailsService) {}

  @Post()
  async create(@Body() createOrderDetailsDto: CreateOrderDetailsDto): Promise<OrderDetails> {
    console.log(createOrderDetailsDto);
    return this.orderDetailsService.createOrderDetails(createOrderDetailsDto);
  }

  @Get()
  async findAll(): Promise<OrderDetails[]> {
    return this.orderDetailsService.getAllOrderDetails();
  }

  @Get(':id')
  async findOne(@Param('id') id: string): Promise<OrderDetails> {
    return this.orderDetailsService.getOrderDetailsById(id);
  }

  @Get('order/:orderId')
  async findByOrderId(@Param('orderId') orderId: string): Promise<{ orderDetails: OrderDetails[] }> {
    return this.orderDetailsService.getOrderDetailsByOrderId(orderId);
  }

  @Patch(':id')
  async update(@Param('id') id: string, @Body() updateOrderDetailsDto: UpdateOrderDetailsDto): Promise<OrderDetails> {
    return this.orderDetailsService.updateOrderDetails(id, updateOrderDetailsDto);
  }

  @Delete(':id')
  async remove(@Param('id') id: string): Promise<OrderDetails> {
    return this.orderDetailsService.deleteOrderDetails(id);
  }
}
