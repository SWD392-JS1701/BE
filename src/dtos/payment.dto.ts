import { IsNotEmpty, IsNumber, IsNumberString, IsOptional, IsString } from 'class-validator'

export class CreatePaymentDto {
  @IsNotEmpty()
  @IsString()
  order_Id!: string

  @IsNotEmpty()
  @IsNumber()
  status!: number
}

export class UpdatePaymentDto {
  @IsOptional()
  @IsNumber()
  amount?: number

  @IsOptional()
  @IsNumber()
  status?: number
}

export class CancelPaymentDto {
  @IsOptional()
  @IsString()
  order_Id!: string
  cancellationReason?: string
}
