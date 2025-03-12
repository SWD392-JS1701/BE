import { ApiProperty, PartialType } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class BlogDTO {
  @ApiProperty({ example: '60c72b2f9b1d4c3a2c8f9e2a' })
  @IsString()
  @IsNotEmpty()
  doctor_id!: string;

  @ApiProperty({ example: 'The Best Skincare Tips' })
  @IsString()
  @IsNotEmpty()
  title!: string;

  @ApiProperty({ example: 'Here are the best skincare tips for healthy skin...' })
  @IsString()
  @IsNotEmpty()
  content!: string;
}

export class UpdateBlogDTO extends PartialType(BlogDTO) {
  @ApiProperty({ example: 'Updated Blog Title', required: false })
  @IsString()
  title?: string;

  @ApiProperty({ example: 'Updated blog content', required: false })
  @IsString()
  content?: string;
}
