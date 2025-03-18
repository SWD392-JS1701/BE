import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { QuizController } from '../controllers/quiz.controller';
import { QuizService } from '../services/quiz.service';
import { QuizRepository } from '../repositories/quiz.repository';
import { Quiz, QuizSchema } from '../models/quiz.model';

@Module({
  imports: [MongooseModule.forFeature([{ name: Quiz.name, schema: QuizSchema }])],
  controllers: [QuizController],
  providers: [QuizService, QuizRepository],
  exports: [QuizService]
})
export class QuizModule {}
