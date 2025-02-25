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

export class UpdatePromotionDto {
  @IsString()
  @IsOptional()
  title?: string

  @IsString()
  @IsOptional()
  description?: string

  @IsNumber()
  @IsOptional()
  discount_percentage?: number

  @IsDate()
  @IsOptional()
  start_date?: Date

  @IsDate()
  @IsOptional()
  end_date?: Date
}
