import { IsNotEmpty, IsNumber } from 'class-validator'

export class CreatePromotedProductDto {
  @IsNumber()
  @IsNotEmpty()
  promotion_id!: number

  @IsNumber()
  @IsNotEmpty()
  product_id!: number
}
