import { ApiProperty } from '@nestjs/swagger';
import { IsArray, IsNotEmpty, IsNumber, IsOptional, IsString, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';

class ProductListDto {
  @ApiProperty({ example: '65fbe9d5e4b0f1c3a4567890', description: 'Product ID' })
  @IsNotEmpty()
  @IsString()
  product_Id!: string;

  @ApiProperty({ example: 3, description: 'Quantity of the product' })
  @IsNotEmpty()
  @IsNumber()
  quantity!: number;
}

export class CreateOrderDetailsDto {
  @ApiProperty({ example: '65fae8a8b682d5f4b8e7a6c2', description: 'Order ID' })
  @IsNotEmpty()
  @IsString()
  order_Id!: string;

  @ApiProperty({
    example: [
      { product_Id: '65fbe9d5e4b0f1c3a4567890', quantity: 3 },
      { product_Id: '65fbe9d5e4b0f1c3a4567891', quantity: 2 }
    ],
    description: 'List of products with their quantities',
    type: [ProductListDto]
  })
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => ProductListDto)
  product_List!: ProductListDto[];
}

export class UpdateOrderDetailsDto {
  @ApiProperty({
    example: [
      { product_Id: '65fbe9d5e4b0f1c3a4567890', quantity: 5 }
    ],
    description: 'Updated list of products with their quantities',
    type: [ProductListDto],
    required: false
  })
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => ProductListDto)
  @IsOptional()
  product_List?: ProductListDto[];
}
