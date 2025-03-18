import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { QuestionController } from '../controllers/question.controller';
import { QuestionService } from '../services/question.service';
import { QuestionRepository } from '../repositories/question.repository';
import { Question, QuestionSchema } from '../models/question.model';

@Module({
  imports: [MongooseModule.forFeature([{ name: Question.name, schema: QuestionSchema }])],
  controllers: [QuestionController],
  providers: [QuestionService, QuestionRepository],
  exports: [QuestionService]
})
export class QuestionModule {}
