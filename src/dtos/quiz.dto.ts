import { IsNotEmpty, IsString, IsNumber, Min } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateQuizDto {
  @ApiProperty({ example: 'Skin Test 1 Quiz', description: 'Quiz name' })
  @IsString()
  @IsNotEmpty()
  quiz_Name!: string;

  @ApiProperty({ example: 10, description: 'Quiz point value' })
  @IsNumber()
  @Min(0)
  point!: number;
}

export class UpdateQuizDto {
  @ApiProperty({ example: 'Skin Test 2 Quiz', description: 'Updated quiz name', required: false })
  @IsString()
  @IsNotEmpty()
  quiz_Name?: string;

  @ApiProperty({ example: 15, description: 'Updated quiz point value', required: false })
  @IsNumber()
  @Min(0)
  point?: number;
}
