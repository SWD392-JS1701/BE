import { Injectable, NotFoundException } from '@nestjs/common';
import { QuizRepository } from '../repositories/quiz.repository';
import { CreateQuizDto, UpdateQuizDto } from '../dtos/quiz.dto';
import { Quiz } from '../models/quiz.model';

@Injectable()
export class QuizService {
  constructor(private readonly quizRepository: QuizRepository) {}

  async createQuiz(createQuizDto: CreateQuizDto): Promise<Quiz> {
    return this.quizRepository.create(createQuizDto);
  }

  async getAllQuizzes(): Promise<Quiz[]> {
    return this.quizRepository.findAll();
  }

  async getQuizById(id: string): Promise<Quiz> {
    const quiz = await this.quizRepository.findById(id);
    if (!quiz) throw new NotFoundException('Quiz not found');
    return quiz;
  }

  async updateQuiz(id: string, updateQuizDto: UpdateQuizDto): Promise<Quiz> {
    const updatedQuiz = await this.quizRepository.update(id, updateQuizDto);
    if (!updatedQuiz) throw new NotFoundException('Quiz not found');
    return updatedQuiz;
  }

  async deleteQuiz(id: string): Promise<void> {
    await this.quizRepository.delete(id);
  }
}
