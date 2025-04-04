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
      order_Id: order_Id || paymentReturnData.description,
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

  async getOrderPaymentByOrderCode(orderCode: number): Promise<any> {
    const payOs = new PayOS(this.PAYOS_CLIENT_ID, this.PAYOS_API_KEY, this.PAYOS_CHECKSUM_KEY)
    const payment = await payOs.getPaymentLinkInformation(orderCode)
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

      console.log('PayOS Status Response:', paymentData)

      // Create updated payment data from PayOS response
      const updatedPaymentData = {
        order_Id: order_Id,
        orderCode: paymentData.orderCode,
        amount: paymentData.amount,
        amountPaid: paymentData.amountPaid,
        amountRemaining: paymentData.amountRemaining,
        status: paymentData.status,
        createdAt: paymentData.createdAt,
        transactions: paymentData.transactions || [],
        cancellationReason: paymentData.cancellationReason,
        canceledAt: paymentData.canceledAt
      }

      // Update payment record in database
      await this.paymentRepository.update(updatedPaymentData)

      // If payment is PAID, update order status
      if (paymentData.status === 'PAID') {
        const updateOrderDto: UpdateOrderDto = { status: 2 } // Set order status to completed
        await this.orderService.updateOrder(order_Id, updateOrderDto)
      }

      // Verify the update was successful
      const verifiedPayment = await this.getOrderPaymentByOrderId(order_Id)
      console.log('Updated Payment Record:', verifiedPayment)

      return {
        success: true,
        paymentStatus: paymentData.status,
        paymentDetails: {
          orderCode: paymentData.orderCode,
          amount: paymentData.amount,
          amountPaid: paymentData.amountPaid,
          status: paymentData.status,
          createdAt: paymentData.createdAt
        }
      }
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
