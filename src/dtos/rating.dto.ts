import { IsString, IsInt, Min, Max, IsOptional } from 'class-validator'
import { ApiProperty } from '@nestjs/swagger'

export class RatingDto {
  @ApiProperty({ example: 'user123', description: 'ID of the user who gives the rating' })
  @IsString()
  user_id!: string

  @ApiProperty({ example: 'product456', description: 'ID of the rated product' })
  @IsString()
  product_id!: string

  @ApiProperty({ example: 5, description: 'Rating value from 1 to 5', minimum: 1, maximum: 5 })
  @IsInt()
  @Min(1)
  @Max(5)
  rating!: number

  @ApiProperty({ example: 'Great product!', description: 'Optional comment for the rating', required: false })
  @IsOptional()
  @IsString()
  comment?: string
}
