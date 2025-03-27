import { IsArray, IsString } from 'class-validator';

export class QuestionRequestDto {
  @IsArray()
  @IsString({ each: true })
  selections?: string[];
}
