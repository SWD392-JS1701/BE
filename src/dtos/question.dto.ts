import { IsNotEmpty, IsString, MaxLength, IsMongoId } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateQuestionDto {
  @ApiProperty({ example: '660d6b9f8f1b2c3d9a5e4bdf', description: 'Associated quiz ID' })
  @IsMongoId()
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
  @ApiProperty({ example: 'What is 2+3?', description: 'Updated question content', required: false })
  @IsString()
  @MaxLength(200)
  content?: string;

  @ApiProperty({ example: '5', description: 'Updated answer', required: false })
  @IsString()
  @MaxLength(150)
  answer?: string;
}
