import { Injectable, BadRequestException, NotFoundException } from '@nestjs/common';
import { FaqRepository } from '../repositories/faq.repository';
import { FaqDTO, UpdateFaqDTO } from '../dtos/faq.dto';
import { Faq } from '../models/faq.model';
import { Types } from 'mongoose';

@Injectable()
export class FaqService {
  constructor(private readonly faqRepository: FaqRepository) {}

  async findAll(): Promise<Faq[]> {
    return this.faqRepository.findAll();
  }

  async findOne(id: string): Promise<Faq> {
    const faq = await this.faqRepository.findById(id);
    if (!faq) throw new NotFoundException(`FAQ with ID ${id} not found`);
    return faq;
  }

  async create(createFaqDto: FaqDTO): Promise<Faq> {
    if (!Types.ObjectId.isValid(createFaqDto.user_id)) {
      throw new BadRequestException('Invalid user_id format');
    }

    return this.faqRepository.create({
      ...createFaqDto,
      user_id: new Types.ObjectId(createFaqDto.user_id),
    });
  }

  async update(id: string, updateFaqDto: UpdateFaqDTO): Promise<Faq> {
    const filteredUpdate = Object.fromEntries(
      Object.entries(updateFaqDto).filter(([, value]) => value !== null && value !== undefined && value !== '')
    );

    if (Object.keys(filteredUpdate).length === 0) {
      throw new BadRequestException('No valid fields provided for update');
    }

    const updatedFaq = await this.faqRepository.update(id, filteredUpdate);
    if (!updatedFaq) {
      throw new NotFoundException(`FAQ with ID ${id} not found`);
    }
    return updatedFaq;
  }

  async remove(id: string): Promise<Faq> {
    const deletedFaq = await this.faqRepository.delete(id);
    if (!deletedFaq) {
      throw new NotFoundException(`FAQ with ID ${id} not found`);
    }
    return deletedFaq;
  }
}
