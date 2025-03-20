import { IsNotEmpty, IsString, IsNumber, Min } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateQuizDto {
  @ApiProperty({ example: 'quiz123', description: 'Unique quiz ID' })
  @IsString()
  @IsNotEmpty()
  quiz_ID!: string;

  @ApiProperty({ example: 'Math Quiz', description: 'Quiz name' })
  @IsString()
  @IsNotEmpty()
  quiz_Name!: string;

  @ApiProperty({ example: 10, description: 'Quiz point value' })
  @IsNumber()
  @Min(0)
  point!: number;
}

export class UpdateQuizDto {
  @ApiProperty({ example: 'Science Quiz', description: 'Updated quiz name' })
  @IsString()
  @IsNotEmpty()
  quiz_Name?: string;

  @ApiProperty({ example: 15, description: 'Updated quiz point value' })
  @IsNumber()
  @Min(0)
  point?: number;
}
