import { Injectable, NotFoundException } from '@nestjs/common'
import { PaymentRepository } from '../repositories/payment.repository'
import { CreateOrderPaymentDto, UpdateOrderPaymentDto } from '../dtos/payment.dto'
const PayOS = require('@payos/node')
console.log(PayOS)
import { OrderService } from './order.service'
import { ConfigService } from '@nestjs/config'
import { UpdateOrderDto } from '~/dtos/order.dto'
import { Types } from 'mongoose'
import { randomInt } from 'crypto'

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

  async createOrderPayment(createOrderPaymentDto: CreateOrderPaymentDto): Promise<any> {
    const { order_Id } = createOrderPaymentDto
    const order = await this.orderService.getOrderById(order_Id)
    if (!order) throw new Error('Order not found')

    const orderPayosCode = randomInt(10000000, 99999999)
    const requestData = {
      orderCode: orderPayosCode,
      amount: order.amount,
      description: `${order_Id}`,
      cancelUrl: `${this.frontEndUrl}/cancel`,
      returnUrl: `${this.frontEndUrl}/payment-success?orderId=${order_Id}`
    }

    const payOs = new PayOS(this.PAYOS_CLIENT_ID, this.PAYOS_API_KEY, this.PAYOS_CHECKSUM_KEY)
    const paymentLinkData = await payOs.createPaymentLink(requestData)
    const orderObjectId = new Types.ObjectId(order_Id)

    await this.paymentRepository.create({
      ...createOrderPaymentDto,
      order_Id: orderObjectId.toString(),
      orderCode: orderPayosCode
    })
    return paymentLinkData
  }

  async getOrderPaymentById(id: number): Promise<any> {
    var orderId = id
    const payOs = new PayOS(this.PAYOS_CLIENT_ID, this.PAYOS_API_KEY, this.PAYOS_CHECKSUM_KEY)
    const payment = await payOs.getPaymentLinkInformation(orderId)
    if (!payment) throw new NotFoundException('Payment not found')
    return payment
  }

  async getOrderPaymentByOrderId(orderId: string): Promise<any> {
    const payment = await this.paymentRepository.findByOrderId(orderId)
    if (!payment) throw new NotFoundException('Payment not found')
    return payment
  }

  async checkPayment(order_Id: string): Promise<any> {
    const payOs = new PayOS(this.PAYOS_CLIENT_ID, this.PAYOS_API_KEY, this.PAYOS_CHECKSUM_KEY)

    try {
      const order = await this.getOrderPaymentByOrderId(order_Id)
      if (!order) {
        throw new Error('Order not found')
      }

      console.log('Order:', order)
      const orderCode = order.orderCode
      const paymentData = payOs.getPaymentLinkInformation(orderCode)
      if (!paymentData) {
        throw new Error('Invalid payment data')
      }

      console.log('Payment Data:', paymentData)

      if (paymentData.status !== 'PAID') {
        console.warn(`Payment status is ${paymentData.status}, not updating order`)
        return { success: false, message: 'Payment not completed' }
      }

      const description = paymentData.transactions[0]?.description
      const updateOrderDto: UpdateOrderDto = { status: 1 }
      await this.orderService.updateOrder(description, updateOrderDto)

      return { success: true, paymentData }
    } catch (error) {
      console.error('Payment verification failed:', error)
      throw new Error('Payment verification failed')
    }
  }

  async cancelPaymentLink(orderId: string, cancellationReason?: string): Promise<any> {
    const payOs = new PayOS(this.PAYOS_CLIENT_ID, this.PAYOS_API_KEY, this.PAYOS_CHECKSUM_KEY)
    const payment = await payOs.cancelPaymentLink(orderId, cancellationReason)
    return payment
  }
}
