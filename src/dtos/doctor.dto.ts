import { IsNotEmpty, IsNumber, IsOptional, IsString, MaxLength } from 'class-validator';

export class CreateDoctorDto {
  @IsNumber()
  @IsNotEmpty()
  user_Id!: number;

  @IsString()
  @IsNotEmpty()
  @MaxLength(100)
  certification!: string;

  @IsString()
  @IsOptional()
  schedule?: string;

  @IsString()
  @IsOptional()
  description?: string;
}

export class UpdateDoctorDto {
    @IsNumber()
    @IsOptional()
    doctor_Id?: number;
  
    @IsNumber()
    @IsOptional()
    user_Id?: number;
  
    @IsString()
    @IsOptional()
    @MaxLength(100)
    certification?: string;
  
    @IsString()
    @IsOptional()
    schedule?: string;
  
    @IsString()
    @IsOptional()
    description?: string;
  }
