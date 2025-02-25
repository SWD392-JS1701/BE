import { IsNotEmpty, IsNumber, IsOptional, IsString, MaxLength } from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class CreateDoctorDto {
    @ApiProperty({ example: 101, description: 'Associated user ID' })
    @IsString()
    @IsNotEmpty()
    user_Id!: string;
  
    @ApiProperty({ example: 'MBBS, MD', description: 'Doctor certification' })
    @IsString()
    @IsNotEmpty()
    @MaxLength(100)
    certification!: string;
  
    @ApiProperty({ example: 'Mon-Fri 9 AM - 5 PM', description: 'Doctor availability schedule', required: false })
    @IsString()
    @IsOptional()
    schedule?: string;
  
    @ApiProperty({ example: 'Cardiologist with 10 years of experience', description: 'Doctor description', required: false })
    @IsString()
    @IsOptional()
    description?: string;
  }

  export class UpdateDoctorDto {
     @ApiPropertyOptional({ example: 101, description: 'Associated user ID' })
    @IsString()
    @IsOptional()
    user_Id?: string;
  
    @ApiPropertyOptional({ example: 'MBBS, MD', description: 'Doctor certification' })
    @IsString()
    @IsOptional()
    @MaxLength(100)
    certification?: string;
  
    @ApiPropertyOptional({ example: 'Mon-Sat 9 AM - 6 PM', description: 'Doctor availability schedule' })
    @IsString()
    @IsOptional()
    schedule?: string;
  
    @ApiPropertyOptional({ example: 'Cardiologist with 15 years of experience', description: 'Doctor description' })
    @IsString()
    @IsOptional()
    description?: string;
  }
