import { Module } from '@nestjs/common'
import { MongooseModule } from '@nestjs/mongoose'
import { PaymentService } from '../services/payment.service'
import { PaymentController } from '../controllers/payment.controller'
import { Payment, PaymentSchema } from '../models/payment.model'
import { PaymentRepository } from '../repositories/payment.repository'
import { OrderModule } from './order.module'
import { ConfigModule } from '@nestjs/config'

@Module({
  imports: [MongooseModule.forFeature([{ name: Payment.name, schema: PaymentSchema }]), OrderModule, ConfigModule],
  controllers: [PaymentController],
  providers: [PaymentService, PaymentRepository],
  exports: [PaymentService]
})
export class PaymentModule {}
