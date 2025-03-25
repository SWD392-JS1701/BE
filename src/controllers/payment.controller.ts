import { Controller, Post, Get, Param, Body, Put, Delete, NotFoundException } from '@nestjs/common'
import { PaymentService } from '../services/payment.service'
import { CreatePaymentDto, UpdatePaymentDto } from '../dtos/payment.dto'
import { Payment } from '../models/payment.model'

@Controller('payments')
export class PaymentController {
  constructor(private readonly paymentService: PaymentService) {}

  @Post('create')
  async createPayment(@Body() createPaymentDto: CreatePaymentDto): Promise<Payment> {
    return this.paymentService.createPayment(createPaymentDto)
  }

  @Get()
  async getAllPayments(): Promise<Payment[]> {
    return this.paymentService.getAllPayments()
  }

  @Get(':id')
  async getPaymentById(@Param('id') id: string): Promise<Payment> {
    return this.paymentService.getPaymentById(id)
  }

  @Put(':id')
  async updatePayment(@Param('id') id: string, @Body() updatePaymentDto: UpdatePaymentDto): Promise<Payment> {
    return this.paymentService.updatePayment(id, updatePaymentDto)
  }

  @Delete(':id')
  async deletePayment(@Param('id') id: string): Promise<Payment> {
    return this.paymentService.deletePayment(id)
  }
}
