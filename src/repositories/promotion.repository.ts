import { Injectable } from '@nestjs/common'
import { InjectModel } from '@nestjs/mongoose'
import { Model } from 'mongoose'
import { Promotion, PromotionDocument } from '../models/promotion.model'
import { CreatePromotionDto, UpdatePromotionDto } from '~/dtos/promotion.dto'

@Injectable()
export class PromotionRepository {
  constructor(@InjectModel(Promotion.name) private promotionModel: Model<PromotionDocument>) {}

  async create(promotionData: CreatePromotionDto): Promise<Promotion> {
    const createdPromotion = new this.promotionModel(promotionData)
    return createdPromotion.save()
  }

  async findAll(): Promise<Promotion[]> {
    return this.promotionModel.find().exec()
  }

  async findById(id: string): Promise<Promotion | null> {
    return this.promotionModel.findById(id).exec()
  }

  async update(id: string, updateData: UpdatePromotionDto): Promise<Promotion | null> {
    return this.promotionModel.findByIdAndUpdate(id, updateData, { new: true }).exec()
  }

  async delete(id: string): Promise<Promotion | null> {
    return this.promotionModel.findByIdAndDelete(id).exec()
  }
}
