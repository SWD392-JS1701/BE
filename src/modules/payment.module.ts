import { Module } from '@nestjs/common'
import { MongooseModule } from '@nestjs/mongoose'
import { PaymentService } from '../services/payment.service'
import { PaymentController } from '../controllers/payment.controller'
import { Payment, PaymentSchema } from '../models/payment.model'

@Module({
  imports: [MongooseModule.forFeature([{ name: Payment.name, schema: PaymentSchema }])],
  controllers: [PaymentController],
  providers: [PaymentService]
})
export class PaymentModule {}
