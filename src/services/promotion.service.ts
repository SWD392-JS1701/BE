import { Injectable, NotFoundException } from '@nestjs/common'
import { PromotionRepository } from '../repositories/promotion.repository'
import { CreatePromotionDto, UpdatePromotionDto } from '~/dtos/promotion.dto'
import { Promotion } from '../models/promotion.model'

@Injectable()
export class PromotionService {
  constructor(private readonly promotionRepository: PromotionRepository) {}

  async create(createPromotionDto: CreatePromotionDto): Promise<Promotion> {
    return this.promotionRepository.create(createPromotionDto)
  }

  async findAll(): Promise<Promotion[]> {
    return this.promotionRepository.findAll()
  }

  async findOne(id: string): Promise<Promotion> {
    const promotion = await this.promotionRepository.findById(id)
    if (!promotion) {
      throw new NotFoundException(`Promotion with id ${id} not found`)
    }
    return promotion
  }

  async update(id: string, updatePromotionDto: UpdatePromotionDto): Promise<Promotion> {
    const updatedPromotion = await this.promotionRepository.update(id, updatePromotionDto)
    if (!updatedPromotion) {
      throw new NotFoundException(`Promotion with id ${id} not found`)
    }
    return updatedPromotion
  }

  async remove(id: string): Promise<Promotion> {
    const removedPromotion = await this.promotionRepository.delete(id)
    if (!removedPromotion) {
      throw new NotFoundException(`Promotion with id ${id} not found`)
    }
    return removedPromotion
  }
}
