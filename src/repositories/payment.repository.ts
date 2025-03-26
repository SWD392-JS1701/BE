import { Injectable } from '@nestjs/common'
import { InjectModel } from '@nestjs/mongoose'
import { Model } from 'mongoose'
import { Payment, PaymentDocument } from '../models/payment.model'
import { CreatePaymentDto } from '../dtos/payment.dto'

@Injectable()
export class PaymentRepository {
  constructor(@InjectModel(Payment.name) private paymentModel: Model<PaymentDocument>) {}

  async create(createPaymentDto: CreatePaymentDto): Promise<Payment> {
    const payment = new this.paymentModel(createPaymentDto)
    return payment.save()
  }
}
