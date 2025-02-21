import { IsString, IsOptional, IsNumber, IsDate, IsNotEmpty } from 'class-validator'

export class CreatePromotionDto {
  @IsString()
  @IsNotEmpty()
  title!: string

  @IsString()
  @IsOptional()
  description?: string

  @IsNumber()
  @IsNotEmpty()
  discount_percentage!: number

  @IsDate()
  @IsNotEmpty()
  start_date!: Date

  @IsDate()
  @IsNotEmpty()
  end_date!: Date
}
