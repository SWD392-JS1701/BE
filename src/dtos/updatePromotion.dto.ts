import { IsString, IsOptional, IsNumber, IsDate } from 'class-validator'

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
