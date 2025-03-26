import { IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator'

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
