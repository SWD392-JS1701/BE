import { IsNotEmpty, IsString, MaxLength } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateQuestionDto {
  @ApiProperty({ example: 'q123', description: 'Unique question ID' })
  @IsString()
  @IsNotEmpty()
  question_ID!: string;

  @ApiProperty({ example: 'quiz123', description: 'Associated quiz ID' })
  @IsString()
  @IsNotEmpty()
  quiz_ID!: string;

  @ApiProperty({ example: 'What is 2+2?', description: 'Question content' })
  @IsString()
  @IsNotEmpty()
  @MaxLength(200)
  content!: string;

  @ApiProperty({ example: '4', description: 'Answer to the question' })
  @IsString()
  @IsNotEmpty()
  @MaxLength(150)
  answer!: string; 
}

export class UpdateQuestionDto {
  @ApiProperty({ example: 'What is 2+3?', description: 'Updated question content' })
  @IsString()
  @MaxLength(200)
  content?: string;

  @ApiProperty({ example: '5', description: 'Updated answer' })
  @IsString()
  @MaxLength(150)
  answer?: string;
}
