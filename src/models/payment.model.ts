import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose'
import { HydratedDocument } from 'mongoose'

export type PaymentDocument = HydratedDocument<Payment>

// Định nghĩa TransactionType như một sub-schema
@Schema()
export class Transaction {
  @Prop({ required: true })
  reference!: string

  @Prop({ required: true })
  amount!: number

  @Prop({ required: true })
  accountNumber!: string

  @Prop({ required: true })
  description!: string

  @Prop({ required: true })
  transactionDateTime!: string

  @Prop({ type: String, default: null })
  virtualAccountName?: string

  @Prop({ type: String, default: null })
  virtualAccountNumber?: string

  @Prop({ type: String, default: null })
  counterAccountBankId?: string

  @Prop({ type: String, default: null })
  counterAccountBankName?: string

  @Prop({ type: String, default: null })
  counterAccountName?: string

  @Prop({ type: String, default: null })
  counterAccountNumber?: string
}

@Schema()
export class Payment {
  @Prop({ required: true })
  order_Id!: string

  @Prop({ required: true })
  orderCode!: number

  @Prop({ required: true })
  amount!: number

  @Prop({ required: true })
  amountPaid!: number

  @Prop({ required: true })
  amountRemaining!: number

  @Prop({ required: true })
  status!: string

  @Prop({ required: true })
  createdAt!: string

  @Prop({ type: [Transaction], default: [] })
  transactions!: Transaction[]

  @Prop({ type: String, default: null })
  cancellationReason?: string

  @Prop({ type: String, default: null })
  canceledAt?: string
}

export const PaymentSchema = SchemaFactory.createForClass(Payment)
