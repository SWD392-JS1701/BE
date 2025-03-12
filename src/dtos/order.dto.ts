import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';

export class CreateOrderDto {
  @ApiProperty({ example: '64fae8a8b682d5f4b8e7a6c2', description: 'User ID who places the order' })
  @IsNotEmpty()
  @IsString()
  user_Id!: string;

  @ApiProperty({ example: 150.75, description: 'Total amount of the order', required: false })
  @IsOptional()
  @IsNumber()
  amount?: number;
}

export class UpdateOrderDto {
  @ApiProperty({ example: 200.50, description: 'Updated order amount', required: false })
  @IsOptional()
  @IsNumber()
  amount?: number;

  @ApiProperty({ example: 2, description: 'Order status (e.g., 1 = Pending, 2 = Completed, 3 = Cancelled)', required: false })
  @IsOptional()
  @IsNumber()
  status?: number;
}
