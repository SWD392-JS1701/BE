import { ApiProperty, PartialType } from '@nestjs/swagger'
import { IsNotEmpty, IsNumber, IsString, IsOptional, IsPositive, IsDate, ValidateIf } from 'class-validator'
import { Type } from 'class-transformer'

export class ProductDTO {
  @ApiProperty({ example: 'Sample Product' })
  @IsString()
  @IsNotEmpty()
  name!: string

  @ApiProperty({ example: 4.5, required: false })
  @IsNumber()
  @IsPositive()
  @IsOptional()
  @Type(() => Number)
  product_rating?: number = 0

  @ApiProperty({ example: 'This is a product description.', required: false })
  @IsString()
  @IsOptional()
  description?: string

  @ApiProperty({ example: 100.0 })
  @IsNumber()
  @IsPositive()
  @Type(() => Number)
  price!: number

  @ApiProperty({ example: 50 })
  @IsNumber()
  @IsPositive()
  @Type(() => Number)
  stock!: number

  @ApiProperty({ example: 1 })
  @IsNumber()
  @IsPositive()
  @Type(() => Number)
  product_type_id!: number

  @ApiProperty({ example: 'https://example.com/image.jpg', required: false })
  @IsString()
  @IsOptional()
  image_url?: string

  @ApiProperty({ example: 'Supplier Name', required: false })
  @IsString()
  @IsOptional()
  supplier_name?: string

  @ApiProperty({ example: '2025-12-31T23:59:59.999Z', required: false })
  @IsDate()
  @IsOptional()
  @Type(() => Date)
  expired_date?: Date

  @ApiProperty({ example: 1.5 })
  @IsNumber()
  @IsPositive()
  @Type(() => Number)
  volume!: number
}

export class UpdateProductDTO extends PartialType(ProductDTO) {
  @ApiProperty({ example: 'Updated Product Name', required: false })
  @IsString()
  @IsOptional()
  @ValidateIf((value) => value !== null) // Prevents null
  name?: string

  @ApiProperty({ example: 'Updated description here.', required: false })
  @IsString()
  @IsOptional()
  @ValidateIf((value) => value !== null)
  description?: string
}
