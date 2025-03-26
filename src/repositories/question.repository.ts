import { Injectable, BadRequestException, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { Question, QuestionDocument } from '../models/question.model';

@Injectable()
export class QuestionRepository {
  constructor(@InjectModel(Question.name) private readonly questionModel: Model<QuestionDocument>) {}

  async create(data: Partial<Question>): Promise<Question> {
    return new this.questionModel(data).save();
  }

  async findAll(): Promise<Question[]> {
    return this.questionModel.find().exec();
  }

  async findById(id: string): Promise<Question | null> {
    if (!Types.ObjectId.isValid(id)) {
      throw new BadRequestException(`Invalid Question ID format: ${id}`);
    }
    return this.questionModel.findById(id).exec();
  }

  async update(id: string, updateData: Partial<Question>): Promise<Question | null> {
    if (!Types.ObjectId.isValid(id)) {
      throw new BadRequestException(`Invalid Question ID format: ${id}`);
    }
    return this.questionModel.findByIdAndUpdate(id, updateData, { new: true }).exec();
  }

  async delete(id: string): Promise<void> {
    if (!Types.ObjectId.isValid(id)) {
      throw new BadRequestException(`Invalid Question ID format: ${id}`);
    }
    const deletedQuestion = await this.questionModel.findByIdAndDelete(id).exec();
    if (!deletedQuestion) {
      throw new NotFoundException(`Question with ID ${id} not found`);
    }
  }
}
