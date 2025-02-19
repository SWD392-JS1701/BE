import { IsString, IsOptional, IsNumber, Min, Max, IsInt } from 'class-validator';

export class CreateMembershipDto {
  @IsString()
  name!: string;

  @IsOptional()
  @IsString()
  description?: string;

  @IsNumber()
  @Min(0)
  @Max(100)
  discount_percentage!: number;

  @IsInt()
  @Min(0)
  point_value!: number;
}

export class UpdateMembershipDto {
    @IsOptional()
    @IsString()
    name?: string;
  
    @IsOptional()
    @IsString()
    description?: string;
  
    @IsOptional()
    @IsNumber()
    @Min(0)
    @Max(100)
    discount_percentage?: number;
  
    @IsOptional()
    @IsInt()
    @Min(0)
    point_value?: number;
  }