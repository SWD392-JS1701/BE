import { Injectable } from '@nestjs/common'
import { InjectModel } from '@nestjs/mongoose'
import { Model } from 'mongoose'
import { Payment, PaymentDocument } from '../models/payment.model'
import { CreateOrderPaymentDto } from '../dtos/payment.dto'

@Injectable()
export class PaymentRepository {
  constructor(@InjectModel(Payment.name) private paymentModel: Model<PaymentDocument>) {}

  async create(createOrderPaymentDto: CreateOrderPaymentDto): Promise<Payment> {
    const payment = new this.paymentModel(createOrderPaymentDto)
    return payment.save()
  }

  async findByOrderId(orderId: string): Promise<Payment | null> {
    return this.paymentModel.findOne({ order_Id: orderId }).exec()
  }

  async update(payment: Payment): Promise<Payment | null> {
    return this.paymentModel.findOneAndUpdate({ order_Id: payment.order_Id }, payment, { new: true }).exec()
  }
}
