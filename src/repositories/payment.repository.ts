import { Injectable, NotFoundException } from '@nestjs/common'
import { InjectModel } from '@nestjs/mongoose'
import { Model } from 'mongoose'
import { Payment, PaymentDocument } from '../models/payment.model'
import { CreatePaymentDto, UpdatePaymentDto } from '../dtos/payment.dto'

@Injectable()
export class PaymentRepository {
  constructor(@InjectModel(Payment.name) private readonly paymentModel: Model<PaymentDocument>) {}

  async create(createPaymentDto: CreatePaymentDto): Promise<Payment> {
    const payment = new this.paymentModel(createPaymentDto)
    return payment.save()
  }

  async findAll(): Promise<Payment[]> {
    return this.paymentModel.find().lean().exec() // Use lean() for performance
  }

  async findById(id: string): Promise<Payment> {
    const payment = await this.paymentModel.findById(id).lean().exec()
    if (!payment) throw new NotFoundException(`Payment with ID ${id} not found`)
    return payment
  }

  async update(id: string, updateData: UpdatePaymentDto): Promise<Payment> {
    const updatedPayment = await this.paymentModel.findByIdAndUpdate(id, updateData, { new: true, lean: true }).exec()
    if (!updatedPayment) throw new NotFoundException(`Payment with ID ${id} not found`)
    return updatedPayment
  }

  async delete(id: string): Promise<Payment> {
    const deletedPayment = await this.paymentModel.findByIdAndDelete(id).lean().exec()
    if (!deletedPayment) throw new NotFoundException(`Payment with ID ${id} not found`)
    return deletedPayment
  }
}
