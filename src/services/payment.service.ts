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
    const { order_Id, cancelUrl, returnUrl } = createOrderPaymentDto
    const order = await this.orderService.getOrderById(order_Id)
    if (!order) throw new Error('Order not found')

    const orderPayosCode = createOrderPaymentDto.orderCode || randomInt(10000000, 99999999)

    const requestData = {
      orderCode: orderPayosCode,
      amount: order.amount,
      description: `${order_Id}`,
      cancelUrl: cancelUrl || `${this.frontEndUrl}/cancel`,
      returnUrl: returnUrl || `${this.frontEndUrl}/payment-success/${order_Id}`
    }

    const payOs = new PayOS(this.PAYOS_CLIENT_ID, this.PAYOS_API_KEY, this.PAYOS_CHECKSUM_KEY)
    const paymentLinkData = await payOs.createPaymentLink(requestData)
    const paymentReturnData = await payOs.getPaymentLinkInformation(orderPayosCode)

    const paymentData = {
      order_Id: paymentReturnData.description,
      orderCode: paymentReturnData.orderCode,
      amount: paymentReturnData.amount,
      amountPaid: paymentReturnData.amountPaid || 0,
      amountRemaining: paymentReturnData.amountRemaining || paymentReturnData.amount,
      status: paymentReturnData.status,
      createdAt: paymentReturnData.createdAt || new Date().toISOString(),
      transactions: paymentReturnData.transactions || [],
      cancellationReason: null,
      canceledAt: null
    }

    await this.paymentRepository.create(paymentData)

    return paymentLinkData
  }

  async getOrderPaymentByOrderId(orderId: string): Promise<any> {
    const payment = await this.paymentRepository.findByOrderId(orderId)
    if (!payment) throw new NotFoundException('Payment not found')
    return payment
  }

  async checkPayment(order_Id: string): Promise<any> {
    const payOs = new PayOS(this.PAYOS_CLIENT_ID, this.PAYOS_API_KEY, this.PAYOS_CHECKSUM_KEY)

    try {
      const paymentRecord = await this.getOrderPaymentByOrderId(order_Id)
      if (!paymentRecord) {
        throw new Error('Order not found')
      }

      const orderCode = paymentRecord.orderCode
      console.log('Order Code:', orderCode)
      const paymentData = await payOs.getPaymentLinkInformation(orderCode)
      if (!paymentData) {
        throw new Error('Invalid payment data')
      }

      console.log('Payment Data:', paymentData)

      if (paymentData.status !== 'PAID') {
        console.warn(`Payment status is ${paymentData.status}, not updating order`)
        return { success: false, message: 'Payment not completed' }
      }

      const orderId = paymentData.transactions[0]?.description
      const updateOrderDto: UpdateOrderDto = { status: 1 }
      await this.orderService.updateOrder(orderId, updateOrderDto)

      paymentRecord.status = paymentData.status
      paymentRecord.amountPaid = paymentData.amountPaid
      paymentRecord.amountRemaining = paymentData.amountRemaining
      paymentRecord.transactions = paymentData.transactions
      await this.paymentRepository.update(paymentRecord)

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
