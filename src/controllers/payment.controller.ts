import { Controller, Post, Get, Param, Body, Put, Delete, NotFoundException, Req, Res } from '@nestjs/common'
import { PaymentService } from '../services/payment.service'
import { CancelPaymentDto, CreatePaymentDto, UpdatePaymentDto } from '../dtos/payment.dto'
import { Payment } from '../models/payment.model'

@Controller('payment')
export class PaymentController {
  constructor(private readonly paymentService: PaymentService) {}

  @Post('create')
  async createPayment(@Body() createPaymentDto: CreatePaymentDto): Promise<Payment> {
    return this.paymentService.createPayment(createPaymentDto)
  }

  @Get(':id')
  async getPaymentById(@Param('id') id: string): Promise<Payment> {
    return this.paymentService.getPaymentById(id)
  }

  @Post('payment')
  async handlePaymentWebhook(@Req() req, @Res() res) {
    try {
      const webhookBody = req.body
      await this.paymentService.verifyPaymentWebhook(webhookBody)
      return res.status(200).send({ message: 'Webhook processed successfully' })
    } catch (error) {
      return res.status(400).send({ error: error instanceof Error ? error.message : 'An unknown error occurred' })
    }
  }

  @Post('payment-cancel')
  async handlePaymentCancel(@Body() cancelPaymentDto: CancelPaymentDto, @Res() res) {
    try {
      const { order_Id, cancellationReason } = cancelPaymentDto
      await this.paymentService.cancelPaymentLink(order_Id, cancellationReason)
      return res.status(200).send({ message: 'Payment cancelled successfully' })
    } catch (error) {
      return res.status(400).send({ error: error instanceof Error ? error.message : 'An unknown error occurred' })
    }
  }
}
