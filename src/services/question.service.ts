import { Injectable, NotFoundException } from '@nestjs/common';
import { QuestionRepository } from '../repositories/question.repository';
import { CreateQuestionDto, UpdateQuestionDto } from '../dtos/question.dto';
import { Question } from '../models/question.model';

@Injectable()
export class QuestionService {
  constructor(private readonly questionRepository: QuestionRepository) {}

  async createQuestion(createQuestionDto: CreateQuestionDto): Promise<Question> {
    return this.questionRepository.create(createQuestionDto);
  }

  async getAllQuestions(): Promise<Question[]> {
    return this.questionRepository.findAll();
  }

  async getQuestionById(id: string): Promise<Question> {
    const question = await this.questionRepository.findById(id);
    if (!question) throw new NotFoundException('Question not found');
    return question;
  }

  async updateQuestion(id: string, updateQuestionDto: UpdateQuestionDto): Promise<Question> {
    const updatedQuestion = await this.questionRepository.update(id, updateQuestionDto);
    if (!updatedQuestion) throw new NotFoundException('Question not found');
    return updatedQuestion;
  }

  async deleteQuestion(id: string): Promise<void> {
    await this.questionRepository.delete(id);
  }
}
