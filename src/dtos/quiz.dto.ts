import { IsNotEmpty, IsString, MaxLength } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateQuizDto {
  @ApiProperty({ example: 'quiz123', description: 'Unique quiz ID' })
  @IsString()
  @IsNotEmpty()
  quiz_ID!: string;

  @ApiProperty({ example: 'Math Quiz', description: 'Name of the quiz' })
  @IsString()
  @IsNotEmpty()
  @MaxLength(200)
  quiz_Name!: string;
}

export class UpdateQuizDto {
  @ApiProperty({ example: 'Math Quiz Updated', description: 'Updated name of the quiz' })
  @IsString()
  @MaxLength(200)
  quiz_Name?: string;
}
