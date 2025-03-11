import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { Faq, FaqDocument } from '../models/faq.model';

@Injectable()
export class FaqRepository {
  constructor(@InjectModel(Faq.name) private readonly faqModel: Model<FaqDocument>) {}

  async findAll(): Promise<Faq[]> {
    return this.faqModel.find().populate('user_id').exec();
  }

  async findById(id: string): Promise<Faq | null> {
    const objectId = new Types.ObjectId(id);
    return this.faqModel.findById(objectId).populate('user_id').exec();
  }

  async create(faqData: Partial<Faq>): Promise<Faq> {
    const newFaq = new this.faqModel(faqData);
    return newFaq.save();
  }

  async update(id: string, updateData: Partial<Faq>): Promise<Faq | null> {
    return this.faqModel.findByIdAndUpdate(id, { $set: updateData, updated_at: new Date() }, { new: true }).exec();
  }

  async delete(id: string): Promise<Faq | null> {
    return this.faqModel.findByIdAndDelete(id).exec();
  }
}
