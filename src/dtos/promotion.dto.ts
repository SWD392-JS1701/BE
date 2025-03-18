import { ApiProperty, PartialType } from '@nestjs/swagger'
import { Type } from 'class-transformer'
import { IsString, IsOptional, IsNumber, IsDate, IsNotEmpty } from 'class-validator'

export class CreatePromotionDto {
  @ApiProperty({ example: 'Spring Skincare Sale - 20% Off!' })
  @IsString()
  @IsNotEmpty()
  title!: string

  @ApiProperty({
    example: 'Get glowing skin this spring! Enjoy 20% off on our best-selling skincare products.',
    required: false
  })
  @IsString()
  @IsOptional()
  description?: string

  @ApiProperty({ example: '20' })
  @IsNumber()
  @IsNotEmpty()
  discount_percentage!: number

  @ApiProperty({ example: '2025-10-30T23:59:59.999Z' })
  @Type(() => Date)
  @IsDate()
  @IsNotEmpty()
  start_date!: Date

  @ApiProperty({ example: '2025-12-31T23:59:59.999Z' })
  @Type(() => Date)
  @IsDate()
  @IsNotEmpty()
  end_date!: Date
}

export class UpdatePromotionDto extends PartialType(CreatePromotionDto) {}
