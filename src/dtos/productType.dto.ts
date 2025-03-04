import { ApiProperty, PartialType } from '@nestjs/swagger'
import { IsString, IsOptional, IsNotEmpty } from 'class-validator'

export class ProductTypeDTO {
  @ApiProperty({ example: 'Example Type' })
  @IsString()
  @IsNotEmpty()
  name!: string

  @ApiProperty({ example: 'This is an example description.' })
  @IsString()
  @IsOptional()
  description?: string
}

export class UpdateProductTypeDTO extends PartialType(ProductTypeDTO) {}
