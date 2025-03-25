import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { QuestionRepository } from '../repositories/question.repository';
import { CreateQuestionDto, UpdateQuestionDto } from '../dtos/question.dto';
import { Question } from '../models/question.model';
import { Types } from 'mongoose';

@Injectable()
export class QuestionService {
  constructor(private readonly questionRepository: QuestionRepository) {}

  async createQuestion(createQuestionDto: CreateQuestionDto): Promise<Question> {
    if (!Types.ObjectId.isValid(createQuestionDto.quiz_ID)) {
      throw new BadRequestException(`Invalid Quiz ID format: ${createQuestionDto.quiz_ID}`);
    }

    const questionData = {
      ...createQuestionDto,
      quiz_ID: new Types.ObjectId(createQuestionDto.quiz_ID),
    };
  
    return this.questionRepository.create(questionData);
  }
  

  async getAllQuestions(): Promise<Question[]> {
    return this.questionRepository.findAll();
  }

  async getQuestionById(id: string): Promise<Question> {
    const question = await this.questionRepository.findById(id);
    if (!question) throw new NotFoundException(`Question with ID ${id} not found`);
    return question;
  }

  async updateQuestion(id: string, updateQuestionDto: UpdateQuestionDto): Promise<Question> {
    const updatedQuestion = await this.questionRepository.update(id, updateQuestionDto);
    if (!updatedQuestion) throw new NotFoundException(`Question with ID ${id} not found`);
    return updatedQuestion;
  }

  async deleteQuestion(id: string): Promise<void> {
    return this.questionRepository.delete(id);
  }
}
