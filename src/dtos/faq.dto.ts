import { ApiProperty, PartialType } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class FaqDTO {
  @ApiProperty({ example: '60c72b2f9b1d4c3a2c8f9e2a' })
  @IsString()
  @IsNotEmpty()
  user_id!: string;

  @ApiProperty({ example: 'What is the best skincare routine?' })
  @IsString()
  @IsNotEmpty()
  question!: string;

  @ApiProperty({ example: 'The best skincare routine depends on your skin type.' })
  @IsString()
  @IsNotEmpty()
  answer!: string;
}

export class UpdateFaqDTO extends PartialType(FaqDTO) {
  @ApiProperty({ example: 'Updated FAQ question', required: false })
  @IsString()
  question?: string;

  @ApiProperty({ example: 'Updated FAQ answer', required: false })
  @IsString()
  answer?: string;
}
