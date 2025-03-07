import { IsString, IsNumber } from 'class-validator';

export class CreateComboDto {
  @IsString()
  name!: string;

  @IsString()
  type!: string;

  @IsNumber()
  price!: number;

  @IsString()
  description!: string;
}

export class UpdateComboDto {
  @IsString()
  name?: string;

  @IsString()
  type?: string;

  @IsNumber()
  price?: number;

  @IsString()
  description?: string;
}
