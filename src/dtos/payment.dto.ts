import { IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator'

export class CreatePaymentDto {
  @IsNotEmpty()
  @IsString()
  order_id!: string

  @IsNotEmpty()
  @IsNumber()
  status!: number
}

export class UpdatePaymentDto {
  @IsNotEmpty()
  @IsString()
  order_id!: string

  @IsNotEmpty()
  @IsNumber()
  status?: number
}
