import { IsArray, IsNotEmpty, IsNumber, IsString, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';

class ProductListDto {
  @IsNotEmpty()
  @IsString()
  product_Id!: string;

  @IsNotEmpty()
  @IsNumber()
  quantity!: number;
}

export class CreateOrderDetailsDto {
  @IsNotEmpty()
  @IsString()
  order_Id!: string;

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => ProductListDto)
  product_List!: ProductListDto[];
}

export class UpdateOrderDetailsDto {
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => ProductListDto)
  product_List?: ProductListDto[];
}
