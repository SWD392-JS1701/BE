import { Controller, Post, Get, Param, Body, Put, Delete, NotFoundException, Req, Res } from '@nestjs/common'
import { PaymentService } from '../services/payment.service'
import { CancelOrderPaymentDto, CreateOrderPaymentDto, UpdateOrderPaymentDto } from '../dtos/payment.dto'
import { Payment } from '../models/payment.model'

@Controller('payment')
export class PaymentController {
  constructor(private readonly paymentService: PaymentService) {}

  @Post('create')
  async createPayment(@Body() createOrderPaymentDto: CreateOrderPaymentDto): Promise<Payment> {
    return this.paymentService.createOrderPayment(createOrderPaymentDto)
  }

  @Get(':id')
  async getPaymentById(@Param('id') id: string): Promise<Payment> {
    return this.paymentService.getOrderPaymentById(id)
  }

  @Post('check/:id')
  async checkPayment(@Param('id') id: string): Promise<any> {
    const paymentData = await this.paymentService.checkPayment(id)
    return paymentData
  }

  @Post('payment-cancel')
  async handlePaymentCancel(@Body() cancelPaymentDto: CancelOrderPaymentDto, @Res() res) {
    try {
      const { order_Id, cancellationReason } = cancelPaymentDto
      await this.paymentService.cancelPaymentLink(order_Id, cancellationReason)
      return res.status(200).send({ message: 'Payment cancelled successfully' })
    } catch (error) {
      return res.status(400).send({ error: error instanceof Error ? error.message : 'An unknown error occurred' })
    }
  }
}
