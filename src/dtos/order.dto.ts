import { IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';

export class CreateOrderDto {
  @IsNotEmpty()
  @IsString()
  user_Id?: string;

  @IsOptional()
  @IsNumber()
  amount?: number;
}

export class UpdateOrderDto {
  @IsOptional()
  @IsNumber()
  amount?: number;

  @IsOptional()
  @IsNumber()
  status?: number;
}
