import { Injectable, NotFoundException } from '@nestjs/common'
import { PaymentRepository } from '../repositories/payment.repository'
import { CreatePaymentDto, UpdatePaymentDto } from '../dtos/payment.dto'
import { Payment } from '../models/payment.model'
import PayOS from '@payos/node'
import { OrderService } from './order.service'
import { ConfigService } from '@nestjs/config'
import { UpdateOrderDto } from '~/dtos/order.dto'

@Injectable()
export class PaymentService {
  private payos: PayOS
  private frontEndUrl: string
  private PAYOS_CLIENT_ID: string
  private PAYOS_API_KEY: string
  private PAYOS_CHECKSUM_KEY: string

  constructor(
    private readonly paymentRepository: PaymentRepository,
    private readonly orderService: OrderService,
    private readonly configService: ConfigService
  ) {
    console.log('PaymentRepository:', paymentRepository)
    console.log('OrderService:', orderService)
    console.log('ConfigService:', configService)
    this.frontEndUrl = this.configService.get<string>('FRONT_END_URL') || 'http://localhost:3000'
    this.PAYOS_CLIENT_ID = this.configService.get<string>('PAYOS_CLIENT_ID') || ''
    this.PAYOS_API_KEY = this.configService.get<string>('PAYOS_API_KEY') || ''
    this.PAYOS_CHECKSUM_KEY = this.configService.get<string>('PAYOS_CHECKSUM_KEY') || ''
    console.log('PayOS credentials:', {
      clientId: this.PAYOS_CLIENT_ID,
      apiKey: this.PAYOS_API_KEY,
      checksumKey: this.PAYOS_CHECKSUM_KEY
    })
    this.payos = new PayOS(this.PAYOS_CLIENT_ID, this.PAYOS_API_KEY, this.PAYOS_CHECKSUM_KEY)
  }

  async createPayment(createPaymentDto: CreatePaymentDto): Promise<any> {
    const { order_id } = createPaymentDto
    await this.paymentRepository.create(createPaymentDto)

    const order = await this.orderService.getOrderById(order_id)
    if (!order) throw new Error('Order not found')

    const requestData = {
      orderCode: parseInt(order_id, 10),
      amount: order.amount,
      description: `Payment for Order #${order_id}`,
      cancelUrl: `${this.frontEndUrl}/cancel`,
      returnUrl: `${this.frontEndUrl}/payment-success?orderId=${order_id}`
    }

    const paymentLinkData = await this.payos.createPaymentLink(requestData)
    return paymentLinkData
  }

  async getAllPayments(): Promise<Payment[]> {
    return this.paymentRepository.findAll()
  }

  async getPaymentById(id: string): Promise<Payment> {
    const payment = await this.paymentRepository.findById(id)
    if (!payment) throw new NotFoundException('Payment not found')
    return payment
  }

  async updatePayment(id: string, updatePaymentDto: UpdatePaymentDto): Promise<Payment> {
    const payment = await this.paymentRepository.update(id, updatePaymentDto)
    if (!payment) throw new NotFoundException('Payment not found')
    return payment
  }

  async deletePayment(id: string): Promise<Payment> {
    const payment = await this.paymentRepository.delete(id)
    if (!payment) throw new NotFoundException('Payment not found')
    return payment
  }

  async verifyPaymentWebhook(webhookData: any): Promise<any> {
    const paymentData = this.payos.verifyPaymentWebhookData(webhookData)

    if (paymentData) {
      const orderCodeString = String(paymentData.orderCode)

      const updateOrderDto: UpdateOrderDto = {
        status: 1
      }

      await this.orderService.updateOrder(orderCodeString, updateOrderDto)
    }

    return paymentData
  }
}
