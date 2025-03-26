import { Injectable, NotFoundException } from '@nestjs/common'
import { PaymentRepository } from '../repositories/payment.repository'
import { CreatePaymentDto, UpdatePaymentDto } from '../dtos/payment.dto'
import PayOS from '@payos/node'
import { OrderService } from './order.service'
import { ConfigService } from '@nestjs/config'
import { UpdateOrderDto } from '~/dtos/order.dto'

@Injectable()
export class PaymentService {
  private frontEndUrl: string
  private PAYOS_CLIENT_ID: string
  private PAYOS_API_KEY: string
  private PAYOS_CHECKSUM_KEY: string

  constructor(
    private readonly paymentRepository: PaymentRepository,
    private readonly orderService: OrderService,
    private readonly configService: ConfigService
  ) {
    this.frontEndUrl = this.configService.get<string>('FRONT_END_URL') || 'http://localhost:3000'
    this.PAYOS_CLIENT_ID = this.configService.get<string>('PAYOS_CLIENT_ID') || ''
    this.PAYOS_API_KEY = this.configService.get<string>('PAYOS_API_KEY') || ''
    this.PAYOS_CHECKSUM_KEY = this.configService.get<string>('PAYOS_CHECKSUM_KEY') || ''
  }

  async createPayment(createPaymentDto: CreatePaymentDto): Promise<any> {
    const { order_Id } = createPaymentDto
    await this.paymentRepository.create(createPaymentDto)

    const order = await this.orderService.getOrderById(order_Id)
    if (!order) throw new Error('Order not found')

    const requestData = {
      orderCode: parseInt(order_Id, 10),
      amount: order.amount,
      description: `Payment for Order #${order_Id}`,
      cancelUrl: `${this.frontEndUrl}/cancel`,
      returnUrl: `${this.frontEndUrl}/payment-success?orderId=${order_Id}`
    }

    // Create a local instance of PayOS
    const payOs = new PayOS(this.PAYOS_CLIENT_ID, this.PAYOS_API_KEY, this.PAYOS_CHECKSUM_KEY)
    const paymentLinkData = await payOs.createPaymentLink(requestData)
    return paymentLinkData
  }

  async getPaymentById(id: string): Promise<any> {
    var orderId = parseInt(id, 10)
    const payOs = new PayOS(this.PAYOS_CLIENT_ID, this.PAYOS_API_KEY, this.PAYOS_CHECKSUM_KEY)
    const payment = await payOs.getPaymentLinkInformation(orderId)
    if (!payment) throw new NotFoundException('Payment not found')
    return payment
  }

  async verifyPaymentWebhook(webhookData: any): Promise<any> {
    const payOs = new PayOS(this.PAYOS_CLIENT_ID, this.PAYOS_API_KEY, this.PAYOS_CHECKSUM_KEY)

    try {
      const paymentData = payOs.verifyPaymentWebhookData(webhookData)
      if (!paymentData) {
        throw new Error('Invalid webhook data')
      }

      const orderCode = String(paymentData.orderCode)

      // Update order status in database
      const updateOrderDto: UpdateOrderDto = { status: 1 }
      await this.orderService.updateOrder(orderCode, updateOrderDto)

      return { success: true, paymentData }
    } catch (error) {
      throw new Error('Webhook verification failed')
    }
  }

  async cancelPaymentLink(orderId: string | number, cancellationReason?: string): Promise<any> {
    const payOs = new PayOS(this.PAYOS_CLIENT_ID, this.PAYOS_API_KEY, this.PAYOS_CHECKSUM_KEY)
    const payment = await payOs.cancelPaymentLink(orderId, cancellationReason)
    return payment
  }
}
