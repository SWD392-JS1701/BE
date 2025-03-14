import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Quiz, QuizDocument } from '../models/quiz.model';

@Injectable()
export class QuizRepository {
  constructor(@InjectModel(Quiz.name) private readonly quizModel: Model<QuizDocument>) {}

  async create(data: Partial<Quiz>): Promise<Quiz> {
    return new this.quizModel(data).save();
  }

  async findAll(): Promise<Quiz[]> {
    return this.quizModel.find().exec();
  }

  async findById(id: string): Promise<Quiz | null> {
    return this.quizModel.findById(id).exec();
  }

  async update(id: string, updateData: Partial<Quiz>): Promise<Quiz | null> {
    return this.quizModel.findByIdAndUpdate(id, updateData, { new: true }).exec();
  }

  async delete(id: string): Promise<void> {
    await this.quizModel.findByIdAndDelete(id);
  }
}
