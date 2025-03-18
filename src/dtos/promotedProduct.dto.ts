import { ApiProperty } from '@nestjs/swagger'
import { IsNotEmpty, IsString } from 'class-validator'

export class CreatePromotedProductDto {
  @ApiProperty({ example: '67ca5cb7d1a1bdbe8a78f712' })
  @IsString()
  @IsNotEmpty()
  promotion_id!: string

  @ApiProperty({ example: '67ca5cb7d1a1bdbe8a78f712' })
  @IsString()
  @IsNotEmpty()
  product_id!: string
}
