import { IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator'
import { ApiProperty } from '@nestjs/swagger'

export class CreateOrderPaymentDto {
  @ApiProperty({
    description: 'The unique identifier of the order',
    example: '507f1f77bcf86cd799439011',
    type: String
  })
  @IsNotEmpty()
  @IsString()
  order_Id!: string

  @ApiProperty({
    description: 'The status of the payment (e.g., 0 for pending, 1 for completed)',
    example: 0,
    type: Number
  })
  @IsNotEmpty()
  @IsNumber()
  status!: number

  @ApiProperty({
    description: 'The unique order code generated for the payment',
    example: 12345678,
    type: Number
  })
  orderCode?: number
}

export class UpdateOrderPaymentDto {
  @ApiProperty({
    description: 'The amount of the payment (optional)',
    example: 100000,
    required: false,
    type: Number
  })
  @IsOptional()
  @IsNumber()
  amount?: number

  @ApiProperty({
    description: 'The updated status of the payment (optional)',
    example: 1,
    required: false,
    type: Number
  })
  @IsOptional()
  @IsNumber()
  status?: number
}

export class CancelOrderPaymentDto {
  @ApiProperty({
    description: 'The unique identifier of the order to cancel',
    example: '507f1f77bcf86cd799439011',
    type: String
  })
  @IsNotEmpty()
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
