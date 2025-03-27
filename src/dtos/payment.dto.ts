import { IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator'
import { ApiProperty } from '@nestjs/swagger'

export class CreateOrderPaymentDto {
  @ApiProperty({
    description: 'The unique identifier of the order',
    example: '507f1f77bcf86cd799439011',
    type: String
  })
  @IsOptional()
  @IsString()
  order_Id!: string

  @ApiProperty({
    description: 'The total amount of the payment',
    example: 100000,
    type: Number
  })
  @IsOptional()
  @IsNumber()
  amount?: number

  @ApiProperty({
    description: 'The unique order code generated for the payment',
    example: 12345678,
    type: Number
  })
  @IsOptional()
  @IsNumber()
  orderCode?: number

  @ApiProperty({
    description: 'A description of the payment',
    example: 'Thanh toán đơn hàng 507f1f77bcf86cd799439011',
    type: String
  })
  @IsOptional()
  @IsString()
  description?: string

  @ApiProperty({
    description: 'URL to redirect when payment is canceled',
    example: 'http://localhost:3000/cancel',
    type: String
  })
  @IsOptional()
  @IsString()
  cancelUrl?: string

  @ApiProperty({
    description: 'URL to redirect when payment is successful',
    example: 'http://localhost:3000/payment-success?orderId=507f1f77bcf86cd799439011',
    type: String
  })
  @IsOptional()
  @IsString()
  returnUrl?: string
}

export class UpdateOrderPaymentDto {
  @ApiProperty({
    description: 'The total amount of the payment (optional)',
    example: 100000,
    required: false,
    type: Number
  })
  @IsOptional()
  @IsNumber()
  amount?: number

  @ApiProperty({
    description: 'The status of the payment (e.g., PENDING, PAID, CANCELLED)',
    example: 'PAID',
    required: false,
    type: String
  })
  @IsOptional()
  @IsString()
  status?: string

  @ApiProperty({
    description: 'The reason for cancellation (optional)',
    example: 'Customer requested cancellation',
    required: false,
    type: String
  })
  @IsOptional()
  @IsString()
  cancellationReason?: string
}
export class CancelOrderPaymentDto {
  @ApiProperty({
    description: 'The unique identifier of the order to cancel',
    example: '507f1f77bcf86cd799439011',
    type: String
  })
  @IsOptional()
  @IsString()
  order_Id!: string

  @ApiProperty({
    description: 'The reason for canceling the payment (optional)',
    example: 'Customer requested cancellation',
    required: false,
    type: String
  })
  @IsOptional()
  @IsString()
  cancellationReason?: string
}
