import { IsString, IsOptional, IsNumber, IsDate, Min, Max } from 'class-validator'

export class ProductDTO {
  @IsString()
  name!: string

  @IsOptional()
  @IsNumber()
  @Min(0)
  @Max(5)
  product_rating?: number

  @IsOptional()
  @IsString()
  description?: string

  @IsNumber()
  @Min(0)
  price!: number

  @IsNumber()
  @Min(0)
  stock!: number

  @IsNumber()
  product_type_id!: number

  @IsOptional()
  @IsString()
  image_url?: string

  @IsOptional()
  @IsString()
  Supplier?: string

  @IsOptional()
  @IsDate()
  expired_date?: Date

  @IsOptional()
  @IsNumber()
  @Min(0)
  volume?: number
}
